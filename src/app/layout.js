import './globals.css'
import CrtEffect from '../components/CrtEffect'

export const metadata = {
  title: 'The Refresh Agency',
  description: 'We redesign websites in minutes, refresh the internet with us.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Georgia&family=Merriweather:wght@700&family=Archivo+Black&family=Work+Sans:wght@800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CrtEffect />
        {children}
      </body>
    </html>
  )
}
