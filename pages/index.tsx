import Head from 'next/head';
import { prefix } from '../utils/prefix';  // Import the prefix utility

const Home = () => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href={`${prefix}/favicon.ico`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="F R A N C Y A R A Ú J O. ✂️ Hair stylist - Visagismo. 🔸 Especialista em Ruivo - Pioneira em Fortaleza. 📍 Rua Ana Bilhar 1167 Meireles."
        />
        <link rel="apple-touch-icon" href={`${prefix}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${prefix}/manifest.json`} />
        <title>Francy Araujo - Cenário Da Beleza</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>

        {/* Start Single Page Apps for GitHub Pages */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function (l) {
                if (l.search[1] === "/") {
                  var decoded = l.search
                    .slice(1)
                    .split("&")
                    .map(function (s) {
                      return s.replace(/~and~/g, "&");
                    })
                    .join("?");
                  window.history.replaceState(
                    null,
                    null,
                    l.pathname.slice(0, -1) + decoded + l.hash
                  );
                }
              })(window.location);
            `,
          }}
        />
        {/* End Single Page Apps for GitHub Pages */}
      </Head>

      <header className="bg-dark text-white py-3">
        <div className="container">
          <h1 className="display-4">francyaraujo</h1>
          <nav className="d-flex justify-content-end">
            <a href="#" className="text-white mx-2">Home</a>
            <a href="#" className="text-white mx-2">Sobre Nós</a>
            <a href="#" className="text-white mx-2">Serviços</a>
            <a href="#" className="text-white mx-2">Depoimentos</a>
            <a href="#" className="text-white mx-2">Contato</a>
          </nav>
        </div>
      </header>

      <section className="hero bg-light text-center py-5">
        <div className="container">
          <h2 className="text-danger">Especialistas em Cabelos Vermelhos</h2>
          <p className="lead">Transformando Cabelos em Obras de Arte</p>
          <img src={`${prefix}/images/woman.webp`} alt="Cabelo vermelho" className="img-fluid rounded shadow" />
        </div>
      </section>

      <section className="services py-5">
        <div className="container">
          <h3 className="text-center mb-5">Nossos Serviços</h3>
          <div className="row">
            <div className="col-md-4">
              <h4 className="text-danger">Coloração</h4>
              <p>Transforme seu cabelo com as melhores técnicas de coloração para cabelos vermelhos.</p>
            </div>
            <div className="col-md-4">
              <h4 className="text-danger">Tratamentos</h4>
              <p>Oferecemos tratamentos especializados para manter a saúde e o brilho do seu cabelo vermelho.</p>
            </div>
            <div className="col-md-4">
              <h4 className="text-danger">Cortes</h4>
              <p>Cortes modernos e clássicos que destacam a beleza dos cabelos vermelhos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials bg-dark text-white py-5">
        <div className="container">
          <h3 className="text-center mb-5">O que Nossos Clientes Dizem</h3>
          <div className="row">
            <div className="col-md-4">
              <blockquote>
                <p>Adorei a transformação! Nunca me senti tão confiante.</p>
                <footer>— Cliente Satisfeita</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote>
                <p>O melhor salão para quem ama cabelos vermelhos!</p>
                <footer>— Cliente Fiel</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote>
                <p>Atendimento impecável e resultado incrível.</p>
                <footer>— Cliente Encantada</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-3">
        <div className="container text-center">
          <p>&copy; 2024 francyaraujo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
