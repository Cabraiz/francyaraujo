from __future__ import annotations

import argparse
import json
from pathlib import Path

import cv2
import numpy as np
import pillow_avif  # noqa: F401 - registers AVIF support in Pillow
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


def rounded(value: float) -> float:
    return round(float(value), 6)


def parse_source(value: str) -> tuple[str, Path]:
    number, separator, path_value = value.partition("=")
    if not separator or not number.isdigit():
        raise argparse.ArgumentTypeError("Use NUMBER=PATH, for example 05=tmp/source.png")

    source_path = Path(path_value)
    if not source_path.is_absolute():
        source_path = ROOT / source_path
    if not source_path.is_file():
        raise argparse.ArgumentTypeError(f"Source image does not exist: {source_path}")

    return number.zfill(2), source_path


def detect_face(
    model_path: Path,
    source_path: Path,
    score_threshold: float,
) -> tuple[Image.Image, dict[str, float]]:
    image = Image.open(source_path).convert("RGB")
    rgb = np.asarray(image)
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    source_height, source_width = bgr.shape[:2]
    detector = cv2.FaceDetectorYN.create(
        str(model_path),
        "",
        (source_width, source_height),
        score_threshold,
        0.3,
        5000,
    )
    _, detections = detector.detect(bgr)
    if detections is None or len(detections) == 0:
        raise RuntimeError(f"No face detected in {source_path.name}")

    detection = max(detections, key=lambda candidate: float(candidate[-1]))
    x, y, width, height = (float(value) for value in detection[:4])
    return image, {
        "x": x,
        "y": y,
        "width": width,
        "height": height,
        "centerX": x + width / 2,
        "centerY": y + height / 2,
        "confidence": float(detection[-1]),
    }


def exact_target_crop(
    source_width: int,
    source_height: int,
    face: dict[str, float],
    target_x: float,
    target_y: float,
    target_face_height: float,
) -> tuple[int, int, int, int]:
    aspect_width = 4.0
    aspect_height = 5.0
    width_per_height = aspect_width / aspect_height
    center_x = face["centerX"]
    center_y = face["centerY"]

    desired_height = face["height"] / target_face_height
    max_exact_height = min(
        float(source_height),
        source_width / width_per_height,
        center_y / target_y,
        (source_height - center_y) / (1.0 - target_y),
        center_x / (target_x * width_per_height),
        (source_width - center_x) / ((1.0 - target_x) * width_per_height),
    )
    crop_height = max(1, int(round(min(desired_height, max_exact_height))))
    crop_width = max(1, int(round(crop_height * width_per_height)))

    left = int(round(center_x - target_x * crop_width))
    top = int(round(center_y - target_y * crop_height))
    left = min(max(left, 0), source_width - crop_width)
    top = min(max(top, 0), source_height - crop_height)
    return left, top, crop_width, crop_height


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Build 4:5 HD portfolio crops using YuNet face detection instead of manual offsets."
        )
    )
    parser.add_argument("--source", action="append", required=True, type=parse_source)
    parser.add_argument(
        "--model",
        type=Path,
        default=ROOT / "tmp" / "face-detection-yunet.onnx",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=ROOT / "public" / "assets" / "blog" / "dynamic-routing",
    )
    parser.add_argument(
        "--metadata",
        type=Path,
        default=ROOT / "tmp" / "portfolio-hq-face-crops.json",
    )
    parser.add_argument("--score-threshold", type=float, default=0.55)
    parser.add_argument("--target-x", type=float, default=0.4)
    parser.add_argument("--target-y", type=float, default=0.2)
    parser.add_argument("--target-face-height", type=float, default=0.36)
    parser.add_argument("--output-width", type=int, default=1024)
    parser.add_argument("--output-height", type=int, default=1280)
    parser.add_argument("--quality", type=int, default=82)
    args = parser.parse_args()

    model_path = args.model if args.model.is_absolute() else ROOT / args.model
    output_dir = args.output_dir if args.output_dir.is_absolute() else ROOT / args.output_dir
    metadata_path = args.metadata if args.metadata.is_absolute() else ROOT / args.metadata
    if not model_path.is_file():
        raise FileNotFoundError(f"YuNet model not found: {model_path}")

    output_dir.mkdir(parents=True, exist_ok=True)
    metadata_path.parent.mkdir(parents=True, exist_ok=True)
    results: dict[str, object] = {}

    for number, source_path in args.source:
        image, face = detect_face(model_path, source_path, args.score_threshold)
        left, top, crop_width, crop_height = exact_target_crop(
            image.width,
            image.height,
            face,
            args.target_x,
            args.target_y,
            args.target_face_height,
        )
        crop = image.crop((left, top, left + crop_width, top + crop_height))
        crop = crop.resize((args.output_width, args.output_height), Image.Resampling.LANCZOS)
        output_path = output_dir / f"instagram-francy-{number}-desktop-flat-hq.avif"
        crop.save(
            output_path,
            format="AVIF",
            quality=args.quality,
            speed=6,
            subsampling="4:4:4",
        )

        actual_center_x = (face["centerX"] - left) / crop_width
        actual_center_y = (face["centerY"] - top) / crop_height
        actual_face_height = face["height"] / crop_height
        results[number] = {
            "source": str(source_path),
            "output": str(output_path),
            "detector": "OpenCV YuNet",
            "confidence": rounded(face["confidence"]),
            "sourceSize": {"width": image.width, "height": image.height},
            "faceBoxPixels": {
                "x": rounded(face["x"]),
                "y": rounded(face["y"]),
                "width": rounded(face["width"]),
                "height": rounded(face["height"]),
            },
            "cropPixels": {
                "left": left,
                "top": top,
                "width": crop_width,
                "height": crop_height,
            },
            "target": {
                "centerX": args.target_x,
                "centerY": args.target_y,
                "faceHeight": args.target_face_height,
            },
            "actual": {
                "centerX": rounded(actual_center_x),
                "centerY": rounded(actual_center_y),
                "faceHeight": rounded(actual_face_height),
            },
        }

    metadata_path.write_text(
        json.dumps({"photos": results}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Built {len(results)} HD face-aware crops; metadata: {metadata_path}")


if __name__ == "__main__":
    main()
