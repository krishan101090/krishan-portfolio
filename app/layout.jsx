import './globals.css'
import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  getProfile(DEFAULT_PROFILE_SLUG)?.seo?.siteUrl ||
  'https://krishanmohan.dev'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Krishan Mohan Portfolio',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Krishan Mohan',
  publisher: 'Krishan Mohan',
  category: 'technology',
  classification: 'Portfolio',
  formatDetection: { telephone: false, email: false, address: false },
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION,
    },
  },
  appleWebApp: {
    capable: true,
    title: 'Krishan Mohan',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'apple-mobile-web-app-title': 'Krishan Mohan',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#04050a' },
    { media: '(prefers-color-scheme: dark)', color: '#04050a' },
  ],
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
