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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Georgia&family=Merriweather:wght@700&family=Archivo+Black&family=Work+Sans:wght@800&display=swap" rel="stylesheet" media="print" onLoad="this.media='all'" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        <link rel="preload" as="image" href="/video-screenshots/briefed/briefed_00percent.webp" />
        <link rel="preload" as="image" href="/video-screenshots/designer-knit/designer-knit_1.webp" />
        <link rel="preload" as="image" href="/video-screenshots/edecoration/edecoration_2.webp" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #fff; }
            .contact-page { min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: relative; overflow-x: hidden; }
            .contact-header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 20px 30px; display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
            .contact-logo { display: flex; align-items: center; }
            .contact-wheel { width: 40px; height: 40px; animation: spin 3s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .contact-header-title { font-size: 24px; font-weight: 800; color: white; font-family: 'Work Sans', sans-serif; }
            .contact-main { padding: 120px 30px 80px; text-align: center; max-width: 800px; margin: 0 auto; }
            .stars-pill { display: inline-flex; align-items: center; gap: 10px; background: rgba(255, 255, 255, 0.2); padding: 8px 20px; border-radius: 50px; margin-bottom: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); }
            .stars { color: #ffd700; font-size: 16px; font-weight: bold; }
            .stars-text { color: white; font-size: 14px; font-weight: 600; }
            .contact-title { font-size: 48px; font-weight: 800; color: white; margin-bottom: 20px; line-height: 1.2; font-family: 'Work Sans', sans-serif; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }
            .contact-subtitle { font-size: 18px; color: rgba(255, 255, 255, 0.9); margin-bottom: 40px; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto; }
            .contact-button { background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; border: none; padding: 16px 32px; font-size: 18px; font-weight: 700; border-radius: 50px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3); margin-bottom: 30px; position: relative; overflow: hidden; }
            .contact-button:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4); }
            .contact-pills { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
            .contact-pill { background: rgba(255, 255, 255, 0.2); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); }
            .waves-divider { width: 100%; height: 60px; background: white; position: relative; overflow: hidden; }
            .waves-divider img { width: 100%; height: 100%; object-fit: cover; }
            @media (max-width: 768px) { .contact-header { padding: 15px 20px; } .contact-main { padding: 100px 20px 60px; } .contact-title { font-size: 36px; } .contact-subtitle { font-size: 16px; } .contact-button { padding: 14px 28px; font-size: 16px; } .contact-pills { gap: 10px; } .contact-pill { font-size: 12px; padding: 6px 12px; } }
            @media (max-width: 480px) { .contact-title { font-size: 28px; } .contact-subtitle { font-size: 14px; } .contact-button { padding: 12px 24px; font-size: 14px; } }
          `
        }} />
      </head>
      <body>
        <CrtEffect />
        {children}
      </body>
    </html>
  )
}
