# Design tokeni — pilateswithharriet.com

Izvučeno iz `css/main.css`, `css/inline-styles.css`, `css/PilatesWithHarrietWebsite.css`.
Sajt je Tailwind build sa custom temom — vrednosti ispod su ono što je stvarno u upotrebi.

---

## Paleta

| Token | Hex | RGB | Gde se koristi |
|---|---|---|---|
| `dark` | `#29271A` | 41 39 26 | sav tekst, default boja |
| `border-dark` | `#282919` | 40 41 25 | border dugmadi (nijansu tamniji od teksta) |
| `light` | `#F6F5F4` | 246 245 244 | osnovna pozadina sajta (`body`) |
| `blue` | `#D5DFDF` | 213 223 223 | žalfija/sivo-plava sekcija + `.btn-signup` |
| `sand` | `#E6DED2` | 230 222 210 | topla peščana sekcija (Meet Harriet) |
| `white` | `#FFFFFF` | 255 255 255 | tekst na slikama |

Sporedno (nije deo sistema — burger meni, mailchimp popup):
`#C2B0A1`, `#F2EFEA`, `#E6DED2E0` (88% alpha), `#222222B9` (73% alpha), `rgba(0,0,0,0.7)`

**Ceo sajt vozi na 3 pozadinske boje** — `#F6F5F4`, `#D5DFDF`, `#E6DED2` — i jednoj boji teksta.
Nema akcentne boje, nema druge boje teksta. Kontrast sekcija je jedini ritam.

---

## Tipografija

Dve familije:

| Uloga | Font | Kako se učitava |
|---|---|---|
| Sans (primarni) | **Neue Haas Grotesk Display Pro 35 Extra Light** | self-hosted `.woff2` |
| Sans (nav) | **Neue Haas Grotesk Display Pro 55 Roman** | self-hosted `.woff2` |
| Serif (akcenat) | **Instrument Serif** | Google Fonts |

Neue Haas je licenciran (Monotype). **Instrument Serif je besplatan** (Google Fonts, ima i italic).
Najbliža besplatna zamena za Neue Haas Display Extra Light: Inter Tight Light, Archivo Light,
ili Schibsted Grotesk — nijedna nije identična, Neue Haas ima specifično uske brojeve i `R`.

### Skala

| Klasa | Font | Size | Line-height | Napomena |
|---|---|---|---|---|
| `body` | NHG 35 XLight | **17.5px** | 22px | osnovni tekst |
| `.sans-heading` | NHG 35 XLight | 1.4rem (22.4px) → **1.7rem** @lg | 32px → 39px | UPPERCASE |
| `.sans-heading-sm` | NHG 35 XLight | 1.475rem (23.6px) | 1.4 | UPPERCASE |
| `.sans-heading-lg` | NHG 35 XLight | 2rem (32px) | 39px | UPPERCASE |
| `.serif-heading` | Instrument Serif | 1.575rem (25.2px) → **1.975rem** @md | 1 | često italic |
| `.nav-items` | NHG **55 Roman** | 0.8rem (12.8px) | — | jedini Roman weight |
| `.btn` | NHG 35 XLight | 0.875rem (14px) | 1.25rem | UPPERCASE |
| `.btn-signup` | NHG 35 XLight | 10px → **16px** @lg | — | UPPERCASE |
| `ul li` | NHG 35 XLight | 1.15rem → **1.25rem** @md | 1.75rem | bullet `+` je 2.5rem → 3rem @lg |

Globalno na `body`: `word-spacing: 1px`, `-webkit-font-smoothing: antialiased`.
`letter-spacing` se **ne koristi nigde** osim `0.02rem` na mailchimp labeli.

### Ono što nije tekst

Veliki "pilates" wordmark u herou je **PNG slika** (`pilates-with-harriet-logo-tagline.png`),
ne živi tekst. Zato u CSS-u nema nijednog font-size iznad 2rem. Ako praviš nešto slično,
to je tipografija koju radiš u Figmi i izvoziš kao SVG — ne CSS.

---

## Spacing

Tailwind default skala (4px korak), ali u praksi koriste **uzak podskup**:

| rem | px | Učestalost |
|---|---|---|
| 0.25 | 4 | ×9 |
| 0.5 | 8 | ×9 |
| 1 | 16 | ×14 |
| 1.25 | 20 | ×6 |
| 1.5 | 24 | ×4 |
| **2** | **32** | **×36** ← najčešće |
| 2.5 | 40 | ×21 |
| **3** | **48** | **×32** ← najčešće |
| 4 | 64 | ×9 |
| **5** | **80** | ×20 |
| 6 | 96 | ×8 |
| 7 | 112 | ×8 |
| 8 | 128 | ×5 |
| 9 | 144 | ×7 |
| 10 / 11 / 12 | 160 / 176 / 192 | ×2 svaki |

Ritam je **2rem / 3rem / 5rem** za skoro sve, pa 8–12rem za velike bočne margine na xl.
Negativne margine (`-5rem`, `-8rem`) samo na `xl` — tako preklapaju slike u Meet Harriet sekciji.

---

## Grid

Nema klasičnog `container` sa max-width — sadržaj se drži horizontalnim paddingom koji raste
po breakpointu:

```
xl:px-16 (4rem) · xl:px-20 (5rem) · xl:px-32 (8rem) · xl:px-36 (9rem) · xl:px-44 (11rem)
```

Korišćeni gridovi: `grid-cols-1`, `2`, `3`, `4`, `5`, `7`, `8`, `12`.
Nesimetrični (5 / 7 / 8) su ono što pravi asimetrične layoute u Meet Harriet i hero sekciji.

---

## Border radius

| Vrednost | Gde |
|---|---|
| **50%** | sva dugmad (`.btn`, `.btn-signup`) — pilula, jer je visina mala |
| 22px | mailchimp popup |
| 0 | **sve slike i sve sekcije** |

Nijedna slika nema zaobljene ivice. To je namerno — oštra ivica + bez senke.

---

## Shadow

**Nema ih.** Jedina deklaracija u celom CSS-u je `box-shadow: none`, a Tailwind
`--tw-shadow` stoji na `0 0 #0000` (neaktivno). Nula senki, nula glow efekata.
Dubina se pravi isključivo preklapanjem slika i kontrastom pozadina.

---

## Breakpointi

Tailwind default, nepromenjeni:

| Naziv | min-width | Koliko se koristi |
|---|---|---|
| `sm` | 640px | ×1 (praktično ne koriste) |
| **`md`** | **768px** | ×11 — glavni prelom |
| **`lg`** | **1024px** | ×7 |
| `xl` | 1280px | ×3 — velike bočne margine, negativne margine |
| `2xl` | 1536px | ×1 |

Plus ručni, van Tailwinda: `max-width: 768px` i `767px` (burger meni),
`max-width: 992px` i `1366px` (mailchimp popup).

Mobile-first: default stilovi su mobilni, sve se nadograđuje `min-width` upitima.

---

## Tailwind config (spreman za kopiranje)

```js
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        dark:   '#29271A',
        light:  '#F6F5F4',
        blue:   '#D5DFDF',
        sand:   '#E6DED2',
        'border-dark': '#282919',
      },
      fontFamily: {
        sans:  ['var(--font-sans)', 'sans-serif'],   // Neue Haas Display 35 XLight
        serif: ['var(--font-serif)', 'serif'],       // Instrument Serif
      },
      fontSize: {
        body:        ['17.5px', '22px'],
        'heading-sm': ['1.475rem', '1.4'],
        heading:     ['1.4rem', '32px'],
        'heading-lg': ['2rem', '39px'],
        serif:       ['1.575rem', '1'],
        'serif-lg':  ['1.975rem', '1'],
        nav:         ['0.8rem', '1'],
      },
      borderRadius: { btn: '50%' },
      boxShadow:    { none: 'none' },
    },
  },
}
```

Breakpointe ne diraj — default Tailwind vrednosti su tačno ono što oni koriste.
