import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import Languages from '../components/home/Languages'
import CTA from '../components/home/CTA'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    document.title = 'CodeCritic — AI Code Review'
  }, [])
  return (
    <main className="min-h-screen bg-black pt-12">
      <Hero />
      <Features />
      <HowItWorks />
      <Languages />
      <CTA />
    </main>
  )
}