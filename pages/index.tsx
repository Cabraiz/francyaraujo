import Head from 'next/head';

const Home = () => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="F R A N C Y A R A Ú J O - Empreendedor(a). ✂️ Hair stylist - Visagismo. 🔸 Especialista em Ruivo - Pioneira em Fortaleza. 📍 Rua Ana Bilhar 1167 Meireles."
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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

      <noscript>
        F R A N C Y A R A Ú J O - Empreendedor(a). ✂️ Hair stylist - Visagismo. 
        🔸 Especialista em Ruivo - Pioneira em Fortaleza.
        📍 Rua Ana Bilhar 1167 Meireles. Entre em contato: wa.me/message/UCNDR43UGXUVH1
      </noscript>

      <div id="root"></div>
    </div>
  );
};

export default Home;
