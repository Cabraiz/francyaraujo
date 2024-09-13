export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        FrancyAraujo.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Entre em contato com{" "}
        <a
          href="https://wa.me/seu-numero-whatsapp"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Francy Araujo
        </a>{" "}
        especialista em cabelos ruivos, para agendar sua transformação via WhatsApp.
      </h4>
    </section>
  );
}
