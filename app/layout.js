import './globals.css'
import localFont from 'next/font/local'
import ThemeScript from './components/ThemeScript'

const foundersGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/founders-grotesk-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/founders-grotesk-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-founders',
})

const foundersGroteskMono = localFont({
  src: '../public/fonts/founders-grotesk-mono-regular.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-founders-mono',
})

export const metadata = {
  title: 'Haptic Menu · Lexi Play',
  description: 'Long press radial menu with haptic feedback',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${foundersGrotesk.variable} ${foundersGroteskMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
