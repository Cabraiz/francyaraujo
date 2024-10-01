import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const MarcaImage = ({ title, src, slug }: Props) => {
  return (
    <div style={{ maxWidth: '150px', width: '100%', height: 'auto' }}> {/* Ajusta dinamicamente a largura */}
      <Image
        src={src}
        alt={`Marca Image for ${title}`}
        layout="responsive" // Garante que a imagem seja responsiva
        objectFit="contain" // Faz a imagem se ajustar ao contêiner sem cortar
        width={833} // Tamanho base da imagem
        height={495} // Tamanho base da imagem
      />
    </div>
  );
};

export default MarcaImage;
