# Cloud 9 Reformer Pilates — tokeni i asseti

Layout je 1:1 sa pilateswithharriet.com (vidi `../TOKENS.md`), sa Cloud 9 brendom preko toga.

## Paleta

Izvučeno iz logotipa i swatcha koje si poslala:

Cela paleta je **jedna boja u četiri jačine + bela**. Nema tople grane — krem, pesak
i bronza su izbačeni jer su se tukli sa tegetom.

| Token | Hex | Šta je | Uloga |
|---|---|---|---|
| `dark` | **#2A3A4B** | tvoj teget swatch | sav tekst, linije, borderi, logo |
| `tan` | **#6E8095** | teget razblažen ~45% | `+` bulleti, serif italik akcenti |
| `blue` | **#CBD3DA** | teget razblažen ~78% | dve sekcije + footer |
| `sand` | **#EDF1F3** | teget razblažen ~92% | "Meet the studio" sekcija |
| `light` | **#FFFFFF** | bela | osnovna pozadina |

Imena tokena (`blue`, `sand`, `tan`) su ostala iz originalnog sajta da se klase ne
prepisuju — ali vrednosti više nemaju veze sa peskom ni bronzom.

Mapiranje na uloge iz originala:

```
original                 Cloud 9
#29271A (maslinasta)  →  #2A3A4B  teget
#F6F5F4 (off-white)   →  #FFFFFF  bela
#D5DFDF (žalfija)     →  #CBD3DA  teget 78%
#E6DED2 (pesak)       →  #EDF1F3  teget 92%
```

Teget je **boja teksta**, ne tamna sekcija — tako se čuva prozračni ritam originala.
Ako hoćeš dramatičniji smer, zameni `blue` sekcije punim tegetom sa belim tekstom.

### Logotip

Originalni logo ima crn tekst i **bronzani** oblak. Pošto bronza ne postoji više u
paleti, logo je prebojen u pun teget `#2A3A4B` — `assets/logo-cloud9-navy.png` i
`assets/mark-cloud9-navy.png`. Anti-alias je sačuvan jer je bio u alfa kanalu,
ne u boji.

**Original je netaknut** u `assets/logo-cloud9.png` i `assets/mark-cloud9.png`.
Za povratak na bronzani: izbaci `-navy` iz `src` atributa u `index.html`.

## Asseti

| Fajl | Šta je | Kako je nastao |
|---|---|---|
| `assets/logo-cloud9-navy.png` | pun lockup u tegetu, 760×281 | **u upotrebi** |
| `assets/mark-cloud9-navy.png` | oblak u tegetu, 144×84 | **u upotrebi**, header |
| `assets/logo-cloud9.png` | pun lockup, original boje | rezerva |
| `assets/mark-cloud9.png` | oblak, original boje | rezerva |
| `assets/favicon.png` + `favicon.ico` | oblak na beloj | tab ikonica |
| `assets/reformer-side-bend.webp` | 1018×1348, 50 KB | iz PNG screenshota |
| `assets/reformer-legs-up.webp` | 1016×1358, 45 KB | iz PNG screenshota |

Originalni fajlovi u `Pictures\Screenshots` i `Downloads` nisu dirani.

## Gde su slike raspoređene

| Mesto | Slika |
|---|---|
| Hero (pozadina) | side-bend + svetli veo preko |
| Hero, header, burger, footer | logo / cloud mark |
| Sekcija "Reformer Studio" (kvadrat) | legs-up |
| "Meet the studio" portret 3:4 | side-bend |
| "Meet the studio" pejzaž 3:2 | legs-up |
| Instagram grid, 8 pločica | obe, 8 različitih kadrova |

## Šta još fali

- **Video** — 4 mesta su i dalje `YOUR VIDEO` placeholderi (veliki blok u sredini
  četvrte sekcije + 3 u hover-tabovima). Original tu ima autoplay video.
- **Još fotografija** — 8 Instagram pločica su isecci iste dve slike. Radi kao
  privremeno rešenje, ali se vidi da je ista prostorija.
- `Screenshot 2026-09-11 095501.png` nije postojao u folderu kad sam tražio.

## Svetli veo preko heroja

Dodao sam gradijent preko hero fotografije:

```css
linear-gradient(to bottom,
  rgba(255,255,255,.64) 0%,
  rgba(255,255,255,.36) 45%,
  rgba(255,255,255,.54) 100%)
```

Bez njega se tamni logo i navigacija potpuno gube na fotografiji. Ako nađeš mirniju
hero sliku (prazan zid, subjekat sa strane), veo se može skinuti.

## Font

Neue Haas Grotesk Display 35 Extra Light (original) je licenciran, pa je u kodu
**Inter weight 200** kao stand-in. Instrument Serif je pravi. Ako Cloud 9 ima svoj
font — logotip izgleda kao geometrijski sans sa širokim letter-spacingom, verovatno
Futura/Avenir familija — zameni `font-sans` u Tailwind configu i CSS-u.
