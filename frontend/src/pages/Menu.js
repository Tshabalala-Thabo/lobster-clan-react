import React, { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'

const menuCategories = [
  {
    title: 'Starters',
    image: '/images/starters.jpg',
    items: [
      { name: "Lobster Bisque", description: "Creamy lobster soup infused with sherry and herbs", price: 95 },
      { name: "Garlic Butter Mussels", description: "Fresh mussels in a rich garlic butter sauce", price: 120 },
      { name: "Prawn Cocktail", description: "Juicy prawns with a zesty cocktail sauce", price: 110 },
      { name: "Crispy Calamari Rings", description: "Lightly battered and fried to golden perfection", price: 85 },
      { name: "Oysters on Ice", description: "Half dozen fresh oysters served with lemon and mignonette", price: 160 },
    ]
  },
  {
    title: 'Lobster Specialties',
    image: '/images/lobster_specials.jpg',
    items: [
      { name: "Grilled Whole Lobster", description: "Served with garlic butter, lemon, and a side of your choice", price: 450 },
      { name: "Lobster Thermidor", description: "Lobster baked with a creamy sauce and cheese crust", price: 480 },
      { name: "Lobster Roll", description: "Succulent lobster chunks in a buttery roll, served with fries", price: 240 },
    ]
  },
  {
    title: 'Signature Dishes',
    image: '/images/side-view-seafood-plate-with-sauces.png',
    items: [
      { name: "Seafood Platter for Two", description: "A mix of prawns, mussels, calamari, grilled fish, and lobster", price: 850 },
      { name: "Grilled Catch of the Day", description: "Seasonal fresh fish, grilled and served with roasted vegetables", price: 220 },
      { name: "Prawn Linguine", description: "Pasta tossed with prawns, garlic, and a creamy tomato sauce", price: 185 },
      { name: "Crab Curry", description: "Blue crab in a fragrant coconut curry, served with jasmine rice", price: 280 },
    ]
  },
  {
    title: 'Sides',
    image: '/images/sides.jpg',
    items: [
      { name: "Steamed Rice", description: "Fragrant jasmine rice", price: 35 },
      { name: "Garlic Bread", description: "Crusty bread with garlic butter", price: 45 },
      { name: "Seasonal Vegetables", description: "Grilled fresh seasonal selection", price: 50 },
      { name: "Hand-Cut Fries", description: "Crispy golden fries", price: 40 },
      { name: "House Salad", description: "Fresh mixed greens with house dressing", price: 60 },
    ]
  },
  {
    title: 'Desserts',
    image: '/images/desserts.jpg',
    items: [
      { name: "Lemon Tart", description: "Zesty lemon curd on a buttery crust", price: 75 },
      { name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center, served with vanilla ice cream", price: 90 },
      { name: "Coconut Panna Cotta", description: "Silky coconut panna cotta with a mango coulis", price: 80 },
    ]
  },
  {
    title: 'Beverages',
    image: '/images/beverages.jpg',
    items: [
      { name: "Freshly Squeezed Juices", description: "Orange, Pineapple, or Mixed Fruit", price: 45 },
      { name: "Soft Drinks", description: "Coke, Sprite, Fanta, etc.", price: 30 },
      { name: "Iced Tea", description: "Lemon or Peach", price: 40 },
      { name: "Coffee & Tea", description: "Espresso, Cappuccino, or Rooibos", price: 30 },
      { name: "House Wine", description: "White or Red (per glass)", price: 70 },
      { name: "Craft Beer", description: "Local selection", price: 55 },
      { name: "Signature Cocktails", description: "Try our Lobster Punch or Coastal Breeze", price: 85 },
    ]
  }
]

function TabButton({ title, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-lg transition-colors relative whitespace-nowrap
        ${isActive ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
    >
      {title}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900"
          initial={false}
        />
      )}
    </button>
  );
}

function MenuItem({ name, price, description }) {
  return (
    <motion.div 
      className="border-b border-stone-200 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-baseline">
        <h3 className="text-xl font-semibold text-stone-900">{name}</h3>
        <span className="text-stone-600 font-semibold ml-4">R{price}</span>
      </div>
      <p className="text-stone-500 mt-1 text-sm">{description}</p>
    </motion.div>
  );
}

function MenuSection({ title, items, image }) {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <h2 className="text-4xl text-white absolute bottom-4 left-4 drop-shadow-lg">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {items.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </div>
    </motion.section>
  );
}

export function Menu() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-stone-50 pt-40">
      <div className="relative overflow-hidden">
        <div className="text-black" />
        <div className="flex flex-col items-center justify-center mb-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-protest text-stone-900 text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Menu
          </motion.h1>
          <motion.p
            className="text-black/90 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our selection of fresh seafood dishes, prepared with passion and expertise by our talented chefs.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto">
        {isMobile ? (
          // Vertical layout for mobile
          <div className="space-y-12 px-4">
            {menuCategories.map((category, index) => (
              <div key={category.title}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover"
                  />
                  <h2 className="text-4xl text-white absolute bottom-4 left-4 drop-shadow-lg">
                    {category.title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-x-8 mt-8">
                  {category.items.map((item) => (
                    <MenuItem key={item.name} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Tabbed layout for larger screens
          <>
            <div className="border-b mb-4">
              <div className="flex justify-center space-x-4">
                {menuCategories.map((category, index) => (
                  <TabButton
                    key={category.title}
                    title={category.title}
                    isActive={activeCategory === index}
                    onClick={() => setActiveCategory(index)}
                  />
                ))}
              </div>
            </div>

            <div className="px-4">
              <AnimatePresence mode="wait">
                <MenuSection 
                  key={menuCategories[activeCategory].title}
                  title={menuCategories[activeCategory].title}
                  items={menuCategories[activeCategory].items}
                  image={menuCategories[activeCategory].image}
                />
              </AnimatePresence>
            </div>
          </>
        )}

        <div className="text-black p-6 text-center">
          <p className="opacity-70">• All seafood is sourced sustainably</p>
        </div>
      </div>
    </div>
  );
}