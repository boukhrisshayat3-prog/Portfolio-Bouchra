import Navbar from '@/layout/Navbar'
import HeroInfo from '@/sections/Hero'
import { About } from '@/sections/About'
import Projects from '@/sections/Projects'
import Experience from '@/sections/Experience'
import Testimonials from '@/sections/Testimonials'
import { Contact } from '@/sections/Contact'
import { useHero } from '@/hooks/useHero'
import { useEffect, useState } from 'react'
import { Dashboard } from './components/Registre'



function App() {
  const { hero, loading, error } = useHero()
  const [usuarioActivo, setUsuarioActivo] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("username")
    if (user) {
      setUsuarioActivo(user)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("username")
    setUsuarioActivo(null)
  }

  if (!usuarioActivo) {
    return <Dashboard onLogin={setUsuarioActivo} />
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-slate-950 text-slate-100'>
        <Navbar onLogout={handleLogout} />
        <main className='mx-auto max-w-6xl px-6 py-16'>Loading...</main>
      </div>
    )
  }

  if (error || !hero) {
    return (
      <div className='min-h-screen bg-slate-950 text-slate-100'>
        <Navbar onLogout={handleLogout} />
        <main className='mx-auto max-w-6xl px-6 py-16'>
          Could not load the hero content.
        </main>
      </div>
    )
  }


  return (
    <div className='min-h-screen overflow-hidden'>
      <Navbar onLogout={handleLogout} />
      <HeroInfo hero={hero} />
      <About />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
     
    </div>
  )
}

export default App
