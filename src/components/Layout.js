import React from 'react'

export function Layout({ children }) {
  return (
    <div className="relative min-h-screen w-full font-sans">
      {children}

      <footer className="bg-black py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[#99FF33] text-xl font-serif italic mb-4">Quick links</h4>
            <nav className="space-y-2">
              <a href="/menu" className="block text-gray-300 hover:text-white">Menu</a>
              <a href="/" className="block text-gray-300 hover:text-white">Hours</a>
              <a href="/" className="block text-gray-300 hover:text-white">Contacts</a>
            </nav>
          </div>
          <div>
            <h4 className="text-[#99FF33] text-xl font-serif italic mb-4">A few more words</h4>
            <p className="text-gray-300">
              We invite you to enjoy our restaurant's tremendously delicious recipes made from scratch every day. Come visit us and enjoy a delicious breakfast, lunch or dinner at our delightful place.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 