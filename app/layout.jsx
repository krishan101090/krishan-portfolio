import './globals.css'
import { Syne, JetBrains_Mono, Inter } from 'next/font/google'
import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  getProfile(DEFAULT_PROFILE_SLUG)?.seo?.siteUrl ||
  'https://krishanmohan.dev'

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

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
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
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
    <html lang="en-US" dir="ltr" className={`${syne.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
