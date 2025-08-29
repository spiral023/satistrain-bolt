import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { AuthProvider } from '@/components/auth/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SatisTrain - KI-gestützte Kundenservice-Schulungen | Kundenzufriedenheit meistern',
    template: '%s | SatisTrain'
  },
  description: 'Revolutioniere dein Kundenservice-Training mit SatisTrain. KI-gestützte Simulationen, Gamification und personalisierte Lernpfade für bessere Kundenzufriedenheit. Über 2.500 aktive Lerner vertrauen uns.',
  keywords: [
    'Kundenservice Training',
    'KI Simulation',
    'Kundenzufriedenheit',
    'Customer Service',
    'E-Learning',
    'Gamification',
    'Kundenbetreuung',
    'Soft Skills',
    'Kommunikationstraining',
    'Mikrolernen',
    'Personalentwicklung',
    'Online Schulung'
  ],
  authors: [{ name: 'SatisTrain Team' }],
  creator: 'SatisTrain',
  publisher: 'SatisTrain',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://satistrain-bolt.netlify.app'),
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/',
      'de': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://satistrain-bolt.netlify.app',
    title: 'SatisTrain - KI-gestützte Kundenservice-Schulungen',
    description: 'Revolutioniere dein Kundenservice-Training mit KI-gestützten Simulationen, Gamification und personalisierten Lernpfaden. Über 2.500 aktive Lerner vertrauen uns.',
    siteName: 'SatisTrain',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SatisTrain - KI-gestützte Kundenservice-Schulungen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SatisTrain - KI-gestützte Kundenservice-Schulungen',
    description: 'Revolutioniere dein Kundenservice-Training mit KI-gestützten Simulationen und personalisierten Lernpfaden.',
    images: ['/twitter-image.jpg'],
    creator: '@SatisTrain',
    site: '@SatisTrain',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'education',
  classification: 'Business Training Platform',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SatisTrain',
  },
  applicationName: 'SatisTrain',
  generator: 'Next.js',
  abstract: 'KI-gestützte Lernplattform für Kundenservice-Training mit Simulationen, Gamification und personalisierten Lernpfaden.',
  archives: ['https://satistrain-bolt.netlify.app/sitemap.xml'],
  assets: ['https://satistrain-bolt.netlify.app'],
  bookmarks: ['https://satistrain-bolt.netlify.app'],
  other: {
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
    'apple-mobile-web-app-title': 'SatisTrain',
    'application-name': 'SatisTrain',
    'msapplication-tooltip': 'SatisTrain - KI-gestützte Kundenservice-Schulungen',
    'msapplication-starturl': '/',
    'msapplication-tap-highlight': 'no',
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
    'theme-color': '#2563eb',
    'color-scheme': 'dark light',
    'supported-color-schemes': 'dark light',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
