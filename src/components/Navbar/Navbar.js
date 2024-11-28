import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'

export function Navbar({ show = true }) {
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
          <div className="container mx-auto px-4 pb-4 flex items-center justify-between">
            <div className="flex flex-col items-center">
              <img
                src="/images/logo.svg"
                alt="Lobster Clan"
                className="h-6 w-auto"
              />
              <span className="font-protest text-2xl text-white">Lobster Clan</span>
              <p className="text-white/80 text-[8px]">Fresh catches, bold flavour</p>
            </div>

            <div className="hidden md:flex h-full relative items-center gap-8">
              <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
              <a href="/menu" className="text-white/80 hover:text-white transition-colors">Menu</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="#location" className="text-white/80 hover:text-white transition-colors">Location</a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
} 