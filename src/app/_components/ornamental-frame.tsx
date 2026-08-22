export function OrnamentalFrame() {
  return (
    <div aria-hidden="true" className="hero-ornamental-frame">
      <span className="hero-ornamental-frame__top-line" />
      <span className="hero-ornamental-frame__left-line" />

      <svg
        className="hero-ornamental-frame__corner"
        focusable="false"
        viewBox="0 0 160 118"
      >
        <title>Ornamento geométrico dourado</title>
        <path d="M8 106 V9 H151" pathLength="1" />
        <path d="M16 61 V18 H84" pathLength="1" />
        <path d="M16 18 L31 33 L47 18" pathLength="1" />
        <path d="M16 45 L43 18 H72" pathLength="1" />
        <path d="M24 68 V48 L54 18 H101" pathLength="1" />
        <path d="M25 18 V28 H35" pathLength="1" />
        <path d="M43 18 L53 28" pathLength="1" />
        <rect
          height="11"
          pathLength="1"
          transform="rotate(45 31 18)"
          width="11"
          x="25.5"
          y="12.5"
        />
      </svg>

      <svg
        className="hero-ornamental-frame__flourish"
        focusable="false"
        preserveAspectRatio="xMinYMax meet"
        viewBox="0 0 260 280"
      >
        <title>Arabesco dourado</title>
        <path
          d="M8 4 C50 13 53 67 39 105 C24 146 17 198 60 229 C98 256 145 247 190 238 C222 232 246 246 256 274"
          pathLength="1"
        />
        <path
          d="M8 24 C35 44 43 74 31 111 C17 155 21 204 68 234 C109 260 159 252 206 246 C228 243 247 254 257 271"
          pathLength="1"
        />
        <path
          d="M31 181 C52 159 81 162 89 184 C96 204 77 220 57 212 C39 205 38 184 50 173 C69 154 101 173 112 202"
          pathLength="1"
        />
        <path
          d="M43 220 C70 260 118 272 166 260 C199 252 229 253 257 274"
          pathLength="1"
        />
      </svg>

      <svg
        className="hero-ornamental-frame__sparkle hero-ornamental-frame__sparkle--upper"
        focusable="false"
        viewBox="0 0 42 42"
      >
        <title>Brilho dourado</title>
        <path d="M21 3 C22 15 27 20 39 21 C27 22 22 27 21 39 C20 27 15 22 3 21 C15 20 20 15 21 3 Z" />
      </svg>

      <svg
        className="hero-ornamental-frame__sparkle hero-ornamental-frame__sparkle--lower"
        focusable="false"
        viewBox="0 0 92 54"
      >
        <title>Brilho dourado com filetes</title>
        <path d="M46 4 C47 17 53 25 68 27 C53 29 47 36 46 50 C44 36 38 29 23 27 C38 25 44 17 46 4 Z" />
        <path d="M3 27 H24 M68 27 H89" pathLength="1" />
      </svg>
    </div>
  );
}
