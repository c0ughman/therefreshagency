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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Georgia&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CrtEffect />
        {children}
      </body>
    </html>
  )
}
