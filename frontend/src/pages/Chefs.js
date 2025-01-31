'use client'

import { motion } from 'framer-motion'

const chefs = [
  {
    name: 'Marcus Chen',
    role: 'Executive Chef',
    specialty: 'Modern Asian Fusion',
    image: '/images/chefs/marcus-chen.png',
    bio: 'With 15 years of culinary expertise, Marcus brings innovative Asian fusion techniques to Lobster Clan.'
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Head Chef',
    specialty: 'Seafood & Mediterranean',
    image: '/images/chefs/sofia-rodriguez.jpg',
    bio: 'A master of Mediterranean seafood, Sofia ensures each dish captures the essence of coastal cuisine.'
  },
  {
    name: 'James Morrison',
    role: 'Sous Chef',
    specialty: 'Classical French Cuisine',
    image: '/images/chefs/james-morrison.jpg',
    bio: 'Trained in Paris, James adds a French touch to our signature dishes.'
  },
  {
    name: 'Aisha Patel',
    role: 'Pastry Chef',
    specialty: 'Desserts & Pastries',
    image: '/images/chefs/aisha-patel.png',
    bio: 'Creating sweet masterpieces that perfectly complement our seafood menu.'
  },
  {
    name: 'Thomas Berg',
    role: 'Grill Master',
    specialty: 'Open Fire Cooking',
    image: '/images/chefs/thomas-berg.png',
    bio: 'Expert in grilling and smoking techniques, bringing out the best in seafood.'
  },
  {
    name: 'Godwin Tau',
    role: 'Sushi Chef',
    specialty: 'Traditional & Modern Sushi',
    image: '/images/chefs/godwin-tau.png',
    bio: 'A third-generation sushi master combining tradition with innovation.'
  },
  {
    name: 'Marie Hans',
    role: 'Sauce Chef',
    specialty: 'Sauces & Emulsions',
    image: '/images/chefs/marie-hans.webp',
    bio: 'Creating the perfect accompaniments to enhance every dish.'
  },
  {
    name: 'David Kim',
    role: 'Research Chef',
    specialty: 'Culinary Innovation',
    image: '/images/chefs/david-kim.jpg',
    bio: 'Leading our culinary research and development, creating new exciting dishes.'
  }
]

export default function Chefs() {
  return (
    <div className="min-h-screen bg-stone-50 pt-40 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-protest text-stone-900 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Chefs
        </motion.h1>
        
        <motion.p
          className="text-stone-600 text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our culinary team brings together diverse expertise and passion for seafood. Each chef contributes their unique perspective to create an unforgettable dining experience at Lobster Clan.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.name}
              className="bg-white shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-stone-900">{chef.name}</h2>
                <p className="font-marck text-red-700 text-xl">{chef.role}</p>
                <p className="text-stone-800 text-sm mt-1">{chef.specialty}</p>
                <p className="text-stone-600 text-sm mt-2">{chef.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 