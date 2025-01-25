import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './ui/button'

export function Navbar({ show }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 flex items-center justify-end">
            <Button className="rounded-none px-2 text-md font-regular py-1" variant="destructive" size="sm">
              Book a table
            </Button>
          </div>
          <div className="container mx-auto px-4 pb-4 flex items-center justify-between relative">
            <div className="flex flex-col items-center">
              <img
                src="/images/logo.svg"
                alt="Lobster Clan"
                className="h-6 w-auto"
              />
              <span className="font-protest text-2xl text-white">Lobster Clan</span>
              <p className="text-white/80 text-[8px]">Fresh catches, bold flavour</p>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex h-full relative items-center gap-8">
              <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
              <a href="/menu" className="text-white/80 hover:text-white transition-colors">Menu</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute top-full left-0 right-0 bg-black/95 md:hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center py-4 space-y-4">
                    <a 
                      href="/" 
                      className="text-white/80 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </a>
                    <a 
                      href="/menu" 
                      className="text-white/80 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Menu
                    </a>
                    <a 
                      href="#about" 
                      className="text-white/80 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </a>
                    <a 
                      href="#location" 
                      className="text-white/80 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Location
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}