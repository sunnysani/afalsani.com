import { useEffect } from 'react'
import { Nav } from '@components/Nav'
import { Hero } from '@components/Hero'
import { About } from '@components/About'
import { Experience } from '@components/Experience'
import { Projects } from '@components/Projects'
import { Contact, Footer } from '@components/Contact'

export default function App() {
  // Deep links like /#work land before React renders the sections, so the
  // browser's own fragment scroll finds nothing. Re-run it after mount.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
