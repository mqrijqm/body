export const siteContent = {
  brand: 'BODY & SOUL PILATES',
  instagramHandle: '@bodyandsoulpilatesbl',
  instagramUrl: 'https://www.instagram.com/bodyandsoulpilatesbl',
  // TODO: zamijeniti direktnim linkom aplikacije/booking sistema kada ga klijent potvrdi.
  bookingUrl: null as string | null,
  contact: {
    address: null as string | null,
    phone: null as string | null,
    email: null as string | null,
    hours: null as string | null,
    mapUrl: null as string | null,
  },
  navigation: [
    { label: 'O studiju', href: '#studio' },
    { label: 'Treninzi', href: '#treninzi' },
    { label: 'Iskustvo', href: '#iskustvo' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  trainings: [
    {
      number: '01',
      title: 'Grupni reformer',
      description: 'Vođen trening u pažljivo organizovanoj grupi, uz jasan ritam, kontrolisan pokret i pažnju instruktora.',
      bestFor: 'Za početnike i vježbače koji žele kontinuitet i energiju grupe.',
    },
    {
      number: '02',
      title: 'Individualni trening',
      description: 'Termin posvećen tvom tempu, pravilnoj formi i preciznom izvođenju svakog pokreta.',
      bestFor: 'Za lični pristup, upoznavanje reformera ili fokusiran rad.',
    },
  ],
  bookingSteps: ['Odaberi trening', 'Pronađi slobodan termin', 'Potvrdi rezervaciju'],
  bookingRules: [
    'Paketi sadrže 6, 8 ili 12 termina.',
    'Termine možeš rasporediti fleksibilno tokom trajanja paketa.',
    'Paket vrijedi 35 dana od dana aktivacije.',
    'Neiskorišteni termini se ne prenose u naredni mjesec.',
    'Otkazivanje ili pomjeranje termina moguće je najkasnije 8 sati prije treninga.',
  ],
  faq: [
    {
      question: 'Da li je reformer pilates pogodan za početnike?',
      answer: 'Da. Grupni reformer je otvoren i za početnike, uz pažljivo vođenje i postepeno upoznavanje sa pokretima i opremom.',
    },
    {
      question: 'Kako rezervišem termin?',
      answer: 'Nakon uplate paketa dobijaš pristupne podatke putem e-maila. Termine za narednih sedam dana biraš kroz raspored grupa, a kasnije termine kroz rezervacije u aplikaciji.',
    },
    {
      question: 'Koliko dugo vrijedi paket?',
      answer: 'Paket vrijedi 35 dana od aktivacije. Neiskorišteni termini se ne prenose u naredni mjesec.',
    },
    {
      question: 'Do kada mogu otkazati termin?',
      answer: 'Termin možeš otkazati ili pomjeriti najkasnije osam sati prije početka treninga.',
    },
  ],
} as const;

export const bookingHref = siteContent.bookingUrl ?? siteContent.instagramUrl;
