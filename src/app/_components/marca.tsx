import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const MarcaImage = ({ title, src, slug }: Props) => {
  return (
    <div className="relative w-full h-full ms-16" style={{ height: '100%' }}> {/* Garante altura completa do pai */}
      <Image
        src={src}
        alt={`Marca Image for ${title}`}
        layout="fill" // Preenche todo o contêiner pai
        objectFit="contain" // Ajusta a imagem ao tamanho do pai sem cortar
        objectPosition="left top" // Alinha a imagem ao topo esquerdo
        className="absolute inset-0"
      />
    </div>
  );
};

export default MarcaImage;
