import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TemplateGallery from '../components/TemplateGallery'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Pricing />
      <TemplateGallery />
      <Footer />
    </>
  )
}
