import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { HiOutlineMapPin } from "react-icons/hi2";

const whatsappNumber = "558881902582";
const whatsappMessage = encodeURIComponent(
  "Olá, Francy! Gostaria de saber mais sobre os horários disponíveis.",
);

export function ContactRibbon() {
  return (
    <aside
      aria-label="Informações de contato"
      className="contact-ribbon"
      id="topo"
    >
      <div className="contact-ribbon__inner">
        <a
          className="contact-ribbon__item"
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          rel="noreferrer"
          target="_blank"
        >
          <FaWhatsapp aria-hidden="true" className="contact-ribbon__icon" />
          <span className="contact-ribbon__label">WHATSAPP</span>
          <span className="contact-ribbon__value contact-ribbon__value--phone">
            +55 88 8190-2582
          </span>
        </a>

        <a
          className="contact-ribbon__item contact-ribbon__item--address"
          href="https://www.google.com/maps/search/?api=1&query=Rua+Israel+Bezerra%2C+46%2C+Dion%C3%ADsio+Torres%2C+Fortaleza"
          rel="noreferrer"
          target="_blank"
        >
          <HiOutlineMapPin
            aria-hidden="true"
            className="contact-ribbon__icon"
          />
          <span className="contact-ribbon__label">ATENDIMENTO</span>
          <span className="contact-ribbon__value">
            Rua Israel Bezerra, 46 · Dionísio Torres
          </span>
        </a>

        <a
          className="contact-ribbon__item"
          href="https://www.instagram.com/francyaraujocenario/"
          rel="noreferrer"
          target="_blank"
        >
          <FaInstagram aria-hidden="true" className="contact-ribbon__icon" />
          <span className="contact-ribbon__label">INSTAGRAM</span>
          <span className="contact-ribbon__value">@francyaraujocenario</span>
        </a>
      </div>

      <p className="contact-ribbon__note">
        Atendimento somente com hora marcada · Manicure e depilação disponíveis
        mediante aviso prévio.
      </p>
    </aside>
  );
}
