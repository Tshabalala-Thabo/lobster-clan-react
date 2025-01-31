'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: 'Fresh & Sustainable',
    description: 'We source our seafood daily from local fishermen who practice sustainable fishing methods.',
    image: '/images/fisherman-s-hand-holding-recently-caught-fish.jpg'
  },
  {
    title: 'Culinary Excellence',
    description: 'Our team of expert chefs combines traditional techniques with innovative approaches.',
    image: '/images/cooking-sph.jpg'
  },
  {
    title: 'Warm Hospitality',
    description: 'We believe in creating memorable experiences through exceptional service.',
    image: '/images/hotel-guest-making-contactless-payment.jpg'
  }
]

const gallery = [
  {
    image: '/images/about/interior-1.jpg',
    alt: 'Restaurant main dining area'
  },
  {
    image: '/images/about/interior-2.jpg',
    alt: 'Private dining room'
  },
  {
    image: '/images/about/bar.jpg',
    alt: 'Bar area'
  },
  {
    image: '/images/about/terrace.jpg',
    alt: 'Outdoor terrace'
  }
]

export function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-min pt-40 overflow-hidden">
        <div className="text-black" />
       
        <div className="inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-protest text-stone-900 text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            className="text-black/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Since 2015, Lobster Clan has been serving the finest seafood in Cape Town, creating unforgettable dining experiences.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-protest text-stone-900 mb-6">A Passion for Seafood</h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Founded by seafood enthusiasts with a vision to bring the ocean's finest offerings to your table, Lobster Clan has grown from a small family restaurant to one of Cape Town's most beloved dining destinations.
              </p>
              <p>
                Our commitment to quality, sustainability, and exceptional dining experiences has earned us recognition among locals and visitors alike. Each dish tells a story of tradition, innovation, and respect for the sea.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[400px]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/flat-lay-mussels-white-sauce-tablecloth-with-copyspace.jpg" 
              alt="Chef preparing seafood" 
              className="w-full h-full object-cover shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-stone-100 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-protest text-stone-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-48 relative">
                  <img 
                    src={value.image} 
                    alt={value.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">{value.title}</h3>
                  <p className="text-stone-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {/* <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-3xl font-protest text-stone-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Space
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={item.alt}
              className="relative aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={item.image} 
                alt={item.alt}
                className="w-full h-full object-cover shadow-md"
              />
            </motion.div>
          ))}
        </div>
      </div> */}
    </div>
  )
} 