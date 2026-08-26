from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from urllib.request import urlretrieve

if sys.platform == "win32" and sys.version_info >= (3, 14):
    raise RuntimeError(
        "Use Python 3.12 or 3.13 on Windows; NumPy's Python 3.14 wheel is experimental."
    )

import cv2
import numpy as np
import pillow_avif  # noqa: F401 - registers AVIF support in Pillow
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MODEL_URL = (
    "https://github.com/opencv/opencv_zoo/raw/main/models/"
    "face_detection_yunet/face_detection_yunet_2023mar.onnx"
)
PHOTO_PATH = (
    ROOT
    / "public"
    / "assets"
    / "blog"
    / "dynamic-routing"
    / "instagram-francy-synthetic-{number}.avif"
)
LANDMARK_NAMES = (
    "rightEye",
    "leftEye",
    "noseTip",
    "rightMouthCorner",
    "leftMouthCorner",
)


def rounded(value: float) -> float:
    return round(float(value), 6)


def ensure_model(model_path: Path) -> None:
    if model_path.exists():
        return

    model_path.parent.mkdir(parents=True, exist_ok=True)
    urlretrieve(MODEL_URL, model_path)


def detect_face(
    detector_model: Path,
    photo_path: Path,
    score_threshold: float,
) -> dict[str, object]:
    rgb = np.asarray(Image.open(photo_path).convert("RGB"))
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    source_height, source_width = bgr.shape[:2]
    detector = cv2.FaceDetectorYN.create(
        str(detector_model),
        "",
        (source_width, source_height),
        score_threshold,
        0.3,
        5000,
    )
    _, detections = detector.detect(bgr)

    if detections is None or len(detections) == 0:
        raise RuntimeError(f"No face detected in {photo_path.name}")

    detection = max(detections, key=lambda candidate: float(candidate[-1]))
    x, y, width, height = (float(value) for value in detection[:4])
    center_x = x + width / 2
    center_y = y + height / 2
    landmark_values = detection[4:14].reshape(5, 2)
    landmarks = {
        name: {
            "x": rounded(point[0] / source_width),
            "y": rounded(point[1] / source_height),
        }
        for name, point in zip(LANDMARK_NAMES, landmark_values, strict=True)
    }

    return {
        "source": {"width": source_width, "height": source_height},
        "box": {
            "x": rounded(x / source_width),
            "y": rounded(y / source_height),
            "width": rounded(width / source_width),
            "height": rounded(height / source_height),
        },
        "center": {
            "x": rounded(center_x / source_width),
            "y": rounded(center_y / source_height),
        },
        "landmarks": landmarks,
        "confidence": rounded(detection[-1]),
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Detect portfolio faces and persist normalized card framing metadata."
    )
    parser.add_argument(
        "--model",
        type=Path,
        default=ROOT / "tmp" / "face-detection-yunet.onnx",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT / "src" / "app" / "_data" / "instagram-face-layout.json",
    )
    parser.add_argument("--score-threshold", type=float, default=0.7)
    parser.add_argument("--target-x", type=float, default=0.4)
    parser.add_argument("--target-y", type=float, default=0.2)
    parser.add_argument("--target-face-height", type=float, default=0.36)
    args = parser.parse_args()

    model_path = args.model if args.model.is_absolute() else ROOT / args.model
    output_path = args.output if args.output.is_absolute() else ROOT / args.output
    ensure_model(model_path)

    photos: dict[str, object] = {}
    for index in range(1, 6):
        number = f"{index:02d}"
        photo_path = Path(str(PHOTO_PATH).format(number=number))
        face = detect_face(model_path, photo_path, args.score_threshold)
        face_box = face["box"]
        face_center = face["center"]
        assert isinstance(face_box, dict)
        assert isinstance(face_center, dict)
        face_height = float(face_box["height"])
        image_height_percent = args.target_face_height / face_height * 100

        photos[number] = {
            "src": f"/assets/blog/dynamic-routing/{photo_path.name}",
            "face": face,
            "layout": {
                "imageHeightPercent": rounded(image_height_percent),
                "translateXPercent": rounded(-float(face_center["x"]) * 100),
                "translateYPercent": rounded(-float(face_center["y"]) * 100),
            },
        }

    payload = {
        "detector": {
            "name": "OpenCV YuNet",
            "model": model_path.name,
            "modelSource": MODEL_URL,
            "scoreThreshold": args.score_threshold,
        },
        "target": {
            "centerX": args.target_x,
            "centerY": args.target_y,
            "faceHeight": args.target_face_height,
        },
        "photos": photos,
    }
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(
        (json.dumps(payload, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    )
    print(f"Saved face layout metadata to {output_path}")


if __name__ == "__main__":
    main()
