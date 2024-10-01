import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full object-cover", {
        "transition-shadow duration-200": slug,
      })}
      width={1300}
      height={700} // Ajuste as dimensões conforme necessário
      layout="responsive" // Mantém a responsividade
    />
  );
  return (
    <div className="sm:mx-0 w-full overflow-hidden" style={{ height: '70vh' }}> {/* Garantindo w-full */}
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
