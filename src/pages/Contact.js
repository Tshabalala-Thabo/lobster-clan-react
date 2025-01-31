'use client'

import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'

export function Contact() {
  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-protest text-stone-900 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        
        <motion.p
          className="text-stone-600 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Have a question or want to make a reservation? We'd love to hear from you. Contact us using the form below or visit us at our location.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-stone-900 mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <Button variant="destructive" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Location */}
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Location</h2>
              <p className="text-stone-600 mb-2">123 Seafood Street</p>
              <p className="text-stone-600 mb-2">Waterfront District</p>
              <p className="text-stone-600">Cape Town, South Africa</p>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-600">Monday - Thursday</span>
                  <span className="text-stone-900">11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Friday - Saturday</span>
                  <span className="text-stone-900">11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Sunday</span>
                  <span className="text-stone-900">12:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="text-stone-600">Phone: +27 21 555 0123</p>
                <p className="text-stone-600">Email: info@lobsterclan.co.za</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 