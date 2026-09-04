import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://body-and-soul-pilates.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Body & Soul Pilates | Reformer Pilates Studio',
  description: 'Body & Soul je svijetao reformer pilates studio posvećen preciznom pokretu, pravilnoj formi i osjećaju ravnoteže.',
  openGraph: {
    title: 'Snaga u tijelu. Mir u umu.',
    description: 'Body & Soul Pilates — prostor za svjestan pokret i dosljednu praksu.',
    locale: 'bs_BA', type: 'website',
    images: [{ url: '/bhs/og-body-soul.jpg', width: 1200, height: 630, alt: 'Body & Soul Pilates studio' }],
  },
  twitter: {
    card: 'summary_large_image', title: 'Body & Soul Pilates',
    description: 'Snaga u tijelu. Mir u umu.', images: ['/bhs/og-body-soul.jpg'],
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="bs"><body>{children}</body></html>;
}
