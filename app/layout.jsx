import './globals.css'

export const metadata = {
  metadataBase: new URL('https://krishanmohan.dev'),
  title: { default: 'Portfolio', template: '%s' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export const viewport = {
  themeColor: '#04050a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
