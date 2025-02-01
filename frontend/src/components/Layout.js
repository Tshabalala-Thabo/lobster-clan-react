import React from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { BookingModal } from './BookingModal'
import { create } from 'zustand'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a store for managing the booking modal state
export const useBookingStore = create((set) => ({
  isBookingModalOpen: false,
  openBookingModal: () => set({ isBookingModalOpen: true }),
  closeBookingModal: () => set({ isBookingModalOpen: false })
}))

export function Layout({ children }) {
  const location = useLocation()
  const showNavbar = location.pathname !== '/'
  const { isBookingModalOpen, closeBookingModal } = useBookingStore()

  return (
    <div className="relative min-h-screen w-full font-sans">
      <Navbar show={showNavbar} />
      {children}

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
      />

      <footer className="bg-black py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-[#99FF33] text-xl font-serif italic mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a href="/menu" className="block text-gray-300 hover:text-white transition-colors">Menu</a>
              <a href="/about" className="block text-gray-300 hover:text-white transition-colors">About Us</a>
              <a href="/chefs" className="block text-gray-300 hover:text-white transition-colors">Our Chefs</a>
              <a href="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 className="text-[#99FF33] text-xl font-serif italic mb-4">Hours & Contact</h4>
            <div className="text-gray-300 space-y-3">
              <div className="flex justify-between">
                <span>Mon - Thu 11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sat 11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sun 12:00 PM - 9:00 PM</span>
              </div>
              <div className="mt-4">
                <p>Phone: <a href="tel:+27215550123" className="hover:text-[#99FF33] transition-colors">+27 21 555 0123</a></p>
                <p>Email: <a href="mailto:info@lobsterclan.co.za" className="hover:text-[#99FF33] transition-colors">info@lobsterclan.co.za</a></p>
              </div>
            </div>
          </div>

          {/* Location & About */}
          <div>
            <h4 className="text-[#99FF33] text-xl font-serif italic mb-4">Visit Us</h4>
            <div className="text-gray-300 space-y-3">
              <p>123 Seafood Street</p>
              <p>Waterfront District</p>
              <p>Cape Town, South Africa</p>
              <p className="mt-4 italic">
                We invite you to enjoy our restaurant's tremendously delicious recipes made from scratch every day. Come visit us and enjoy a delightful breakfast, lunch, or dinner.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="container mx-auto px-4 mt-12 border-t border-[#333] pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lobster Clan. All rights reserved.</p>
        </div>
      </footer>
      <ToastContainer/>
    </div>
  )
} 