"use client";

type Props = {
  title: string;
  src: string;
};

const MarcaImage = ({ title, src }: Props) => {
  return (
    <div
      aria-label={`Marca Francy Araújo — ${title}`}
      className="brand-lockup"
      role="img"
    >
      <span
        aria-hidden="true"
        className="brand-emblem"
        style={{ backgroundImage: `url("${src}")` }}
      />
      <span aria-hidden="true" className="brand-lockup-divider" />
      <span aria-hidden="true" className="brand-wording">
        <span className="brand-lockup-title">Francy Araújo</span>
        <span className="brand-lockup-tagline">
          Beleza <b>•</b> Estilo <b>•</b> Confiança
        </span>
      </span>
    </div>
  );
};

export default MarcaImage;
