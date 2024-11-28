import React from 'react'
import { motion } from 'framer-motion'
import { Layout } from '../../components/Layout/Layout'

const menuCategories = [
  {
    title: 'Starters',
    items: [
      { name: 'Lobster Bisque', price: '18', description: 'Creamy lobster soup with brandy and fresh herbs' },
      { name: 'Seafood Chowder', price: '16', description: 'Rich and creamy with mixed seafood' },
      { name: 'Crab Cakes', price: '22', description: 'Maryland style with remoulade sauce' }
    ]
  },
  {
    title: 'Main Courses',
    items: [
      { name: 'Whole Steamed Lobster', price: '45', description: 'With drawn butter and lemon' },
      { name: 'Grilled Catch of the Day', price: 'MP', description: 'With seasonal vegetables' },
      { name: 'Seafood Pasta', price: '32', description: 'Mixed seafood in white wine sauce' }
    ]
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Key Lime Pie', price: '12', description: 'Classic Florida style' },
      { name: 'Chocolate Lava Cake', price: '14', description: 'With vanilla ice cream' }
    ]
  }
]

function MenuItem({ name, price, description }) {
  return (
    <motion.div 
      className="border-b border-white/10 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-baseline">
        <h3 className="text-xl text-white">{name}</h3>
        <span className="text-[#99FF33] ml-4">${price}</span>
      </div>
      <p className="text-white/60 mt-1">{description}</p>
    </motion.div>
  )
}

export function Menu() {
  return (
    <Layout>
      <div className="bg-black min-h-screen pt-32">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-6xl text-white font-protest text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Menu
          </motion.h1>

          <div className="max-w-3xl mx-auto space-y-16">
            {menuCategories.map((category, index) => (
              <motion.section 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-3xl text-[#99FF33] font-marck italic">{category.title}</h2>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <MenuItem key={item.name} {...item} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
} 