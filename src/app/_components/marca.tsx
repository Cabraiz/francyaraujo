"use client";

type Props = {
  title: string;
  src: string;
};

const MarcaImage = ({ title, src }: Props) => {
  return (
    <a className="brand-lockup" href="#topo">
      <span className="visually-hidden">{title}: voltar ao topo</span>
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
    </a>
  );
};

export default MarcaImage;
