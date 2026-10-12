import './arquitectura.css'

export const metadata = {
  title: 'Conceptos para estudios de arquitectura — The Refresh Agency',
  description:
    'Micrositios que diseñamos como concepto para estudios de arquitectura: Jasper Architects, Neutelings Riedijk, SQ1 SquareOne y Harari Landscape Architecture.',
}

const CONCEPTS = [
  {
    slug: 'palmanova',
    url: 'https://palmanova.netlify.app',
    studio: 'Jasper Architects',
    project: 'Palmanova Center',
    place: 'Asunción, Paraguay',
    line: 'Un valle urbano para Asunción: cuatro torres esculturales sobre una plaza pública.',
  },
  {
    slug: 'gare-maritime',
    url: 'https://gare-maritime.netlify.app',
    studio: 'Neutelings Riedijk Architects',
    project: 'Gare Maritime',
    place: 'Bruselas, Bélgica',
    line: 'Una ciudad dentro de la estación de carga más grande de Europa.',
  },
  {
    slug: 'sq1-dolphin',
    url: 'https://sq1-dolphin.netlify.app',
    studio: 'SQ1 SquareOne',
    project: 'Dolphin',
    place: 'Kavala, Grecia',
    line: 'Dos naves industriales convertidas en vivienda, contadas paso a paso.',
  },
  {
    slug: 'hla-bbva',
    url: 'https://hla-bbva-stadium.netlify.app',
    studio: 'Harari Landscape Architecture',
    project: 'Estadio BBVA',
    place: 'Monterrey, México',
    line: 'De relleno sanitario al primer estadio LEED Platinum de Latinoamérica.',
  },
]

export default function ArquitecturaPage() {
  return (
    <main className="arq">
      <header className="arq-top">
        <a href="/" className="arq-brand">The Refresh Agency</a>
        <a href="mailto:hello@getarefreshagency.com" className="arq-contact">Contacto</a>
      </header>

      <section className="arq-hero">
        <span className="arq-eyebrow">Exploraciones · Arquitectura</span>
        <h1>Conceptos para estudios de arquitectura</h1>
        <p>
          Micrositios que diseñamos como concepto para estudios reales. No son sitios terminados: son
          exploraciones que muestran el nivel de detalle, narrativa y movimiento que ponemos en cada proyecto.
        </p>
      </section>

      <section className="arq-grid">
        {CONCEPTS.map((c, i) => (
          <a key={c.slug} href={c.url} target="_blank" rel="noopener noreferrer" className="arq-card">
            <div className="arq-shot">
              <div className="arq-bar"><i /><i /><i /></div>
              <img src={`/arquitectura/${c.slug}.webp`} alt={`${c.project}, ${c.studio}`} loading={i < 2 ? 'eager' : 'lazy'} />
            </div>
            <div className="arq-meta">
              <span className="arq-studio">{c.studio}</span>
              <span className="arq-place">{c.place}</span>
            </div>
            <h2>{c.project}</h2>
            <p>{c.line}</p>
            <span className="arq-cta">Ver concepto →</span>
          </a>
        ))}
      </section>

      <footer className="arq-foot">
        <p>¿Tienen un estudio? Diseñamos el suyo con el mismo cuidado.</p>
        <a href="mailto:hello@getarefreshagency.com" className="arq-btn">Hablemos →</a>
      </footer>
    </main>
  )
}
