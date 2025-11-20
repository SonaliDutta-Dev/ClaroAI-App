import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="glass-bg">
        <div className="glass-blob blob-1"></div>
        <div className="glass-blob blob-2"></div>
        <div className="glass-blob blob-3"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AiTools />
        <Testimonial />
        <Plan />
        <Footer />
      </div>

    </div>
  )
}

export default Home
