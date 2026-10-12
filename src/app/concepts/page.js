import './concepts.css'

export const metadata = {
  title: 'Architecture concepts — The Refresh Agency',
  description:
    'Concept microsites we designed for architecture studios: Jasper Architects, Neutelings Riedijk, SQ1 SquareOne and Harari Landscape Architecture.',
}

const CONCEPTS = [
  {
    slug: 'palmanova',
    url: 'https://palmanova.netlify.app',
    studio: 'Jasper Architects',
    project: 'Palmanova Center',
    place: 'Asunción, Paraguay',
    line: 'An urban valley for Asunción: four sculptural towers on a public plinth.',
  },
  {
    slug: 'gare-maritime',
    url: 'https://gare-maritime.netlify.app',
    studio: 'Neutelings Riedijk Architects',
    project: 'Gare Maritime',
    place: 'Brussels, Belgium',
    line: "A city built inside Europe's largest goods station.",
  },
  {
    slug: 'sq1-dolphin',
    url: 'https://sq1-dolphin.netlify.app',
    studio: 'SQ1 SquareOne',
    project: 'Dolphin',
    place: 'Kavala, Greece',
    line: 'Two industrial shells turned into housing, told step by step.',
  },
  {
    slug: 'hla-bbva',
    url: 'https://hla-bbva-stadium.netlify.app',
    studio: 'Harari Landscape Architecture',
    project: 'Estadio BBVA',
    place: 'Monterrey, Mexico',
    line: 'From landfill to the first LEED Platinum stadium in Latin America.',
  },
]

export default function ConceptsPage() {
  return (
    <main className="cx">
      <a href="/" className="cx-logo" aria-label="The Refresh Agency">
        <img src="/favicon.svg" alt="" />
      </a>

      <section className="cx-hero">
        <h1>Architecture concepts</h1>
        <p>
          Microsites we designed as concepts for real studios. They are explorations, not finished sites, made to
          show the level of detail, story and motion we put into every project.
        </p>
      </section>

      <section className="cx-grid">
        {CONCEPTS.map((c, i) => (
          <a key={c.slug} href={c.url} target="_blank" rel="noopener noreferrer" className="cx-card">
            <div className="cx-shot">
              <div className="cx-bar"><i /><i /><i /></div>
              <img src={`/concepts-thumbs/${c.slug}.webp`} alt={`${c.project}, ${c.studio}`} loading={i < 2 ? 'eager' : 'lazy'} />
            </div>
            <div className="cx-meta">
              <span className="cx-studio">{c.studio}</span>
              <span className="cx-place">{c.place}</span>
            </div>
            <h2>{c.project}</h2>
            <p>{c.line}</p>
            <span className="cx-cta">View concept →</span>
          </a>
        ))}
      </section>
    </main>
  )
}
