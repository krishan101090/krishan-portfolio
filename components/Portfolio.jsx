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
import FAQ from './FAQ'
import { buildSchemas } from '@/lib/schema'

export default function Portfolio({ profile, path = '/' }) {
  const {
    person,
    boot,
    chapters,
    specWorkflow,
    aiStack,
    timeline,
    services,
    contact,
    faqs,
  } = profile

  const railItems = [
    { id: 'boot', num: '00', label: 'BOOT' },
    ...chapters.map((c) => ({ id: `chapter-${c.num}`, num: c.num, label: c.label })),
    { id: 'timeline', num: 'T', label: 'TIMELINE' },
    { id: 'services', num: 'S', label: 'SERVICES' },
    { id: 'faq', num: 'Q', label: 'FAQ' },
    { id: 'console', num: 'X', label: 'CONSOLE' },
  ]

  const schemas = buildSchemas(profile, { path })

  return (
    <>
      <JsonLd data={schemas} id="ld-graph" />
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
        {faqs?.length ? <FAQ faqs={faqs} /> : null}
        <Contact person={person} contact={contact} />
      </main>
      <Footer person={person} />
      <RevealObserver />
    </>
  )
}
