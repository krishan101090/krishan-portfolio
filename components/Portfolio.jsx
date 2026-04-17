import Nav from './Nav'
import Hero from './Hero'
import Chapter from './Chapter'
import Timeline from './Timeline'
import Services from './Services'
import Contact from './Contact'
import Footer from './Footer'
import NeuralBg from './NeuralBg'
import ScrollRail from './ScrollRail'
import RevealObserver from './RevealObserver'
import JsonLd from './JsonLd'

export default function Portfolio({ profile }) {
  const {
    person,
    seo,
    boot,
    chapters,
    specWorkflow,
    aiStack,
    timeline,
    services,
    contact,
  } = profile

  const railItems = [
    { id: 'boot', num: '00', label: 'BOOT' },
    ...chapters.map((c) => ({ id: `chapter-${c.num}`, num: c.num, label: c.label })),
    { id: 'timeline', num: 'T', label: 'TIMELINE' },
    { id: 'services', num: 'S', label: 'SERVICES' },
    { id: 'console', num: 'X', label: 'CONSOLE' },
  ]

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: seo.siteUrl,
    email: person.email,
    telephone: person.phone,
    jobTitle: person.jobTitle,
    worksFor: { '@type': 'Organization', name: person.currentCompany },
    address: {
      '@type': 'PostalAddress',
      addressLocality: person.locality,
      addressCountry: person.country,
    },
    sameAs: [person.linkedin].filter(Boolean),
    knowsAbout: aiStack.map((a) => a.name),
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${person.name} — ${person.jobTitle}`,
    url: seo.siteUrl,
    description: seo.description,
    provider: { '@type': 'Person', name: person.name },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.desc },
      })),
    },
  }

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={serviceSchema} />
      <a href="#main-content" className="sr-only">Skip to main content</a>
      <NeuralBg />
      <Nav person={person} />
      <ScrollRail items={railItems} />
      <main id="main-content">
        <Hero person={person} boot={boot} />
        {chapters.map((chapter) => (
          <Chapter
            key={chapter.num}
            chapter={chapter}
            specWorkflow={specWorkflow}
            aiStack={aiStack}
          />
        ))}
        <Timeline timeline={timeline} />
        <Services services={services} email={person.email} />
        <Contact person={person} contact={contact} />
      </main>
      <Footer person={person} />
      <RevealObserver />
    </>
  )
}
