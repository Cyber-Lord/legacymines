import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { About } from '@/sections/About'
import { Approach } from '@/sections/Approach'
import { Business } from '@/sections/Business'
import { Contact } from '@/sections/Contact'
import { Gallery } from '@/sections/Gallery'
import { Hero } from '@/sections/Hero'
import { Leadership } from '@/sections/Leadership'
import { Outlook } from '@/sections/Outlook'

/** Page order. To add a section: create it in src/sections, add its content, and list it here. */
export default function App() {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Business />
        <Gallery />
        <Leadership />
        <Approach />
        <Outlook />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
