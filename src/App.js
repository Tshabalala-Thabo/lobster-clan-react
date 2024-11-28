import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'

function App() {
  const sectionRef = React.useRef(null);
  
  // Check when approaching top of viewport
  const isInViewTop = useInView(sectionRef, { 
    margin: "-200px 0px 0px 0px",
    once: false 
  });

  // Check when approaching bottom of viewport
  const isInViewBottom = useInView(sectionRef, { 
    margin: "0px 0px -200px 0px",
    once: false 
  });

  // Section is considered "in view" only when both conditions are true
  const isFullyInView = isInViewTop && isInViewBottom;

  return (
    <div className="relative min-h-screen w-full font-sans">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Lobster and ingredients background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Brand Section */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mx-auto h-20 w-auto">
              <img
                src="/images/logo.svg"
                alt="Lobster and ingredients background"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-protest text-6xl text-white md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Lobster Clan
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-2 text-lg text-white/90 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fresh catches, bold flavour
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="font-marck mt-8 text-3xl text-lime-400 italic md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            where seafood meets sophistication
          </motion.p>

          {/* Description */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Dive into the freshest catch and savor the ocean's finest flavors. At
            Lobster Clan, every bite is a celebration of coastal culinary excellence.
          </motion.p>
        </motion.div>
      </div>

      {/* Welcome Section */}
      <section className="mx-auto grid md:grid-cols-12 gap-8">
        {/* Image Column - 4 columns wide */}
        <div className="md:col-span-4 relative aspect-[3/4]">
          <img
            src="/images/elegant-healthy-food-composition-with-fish.jpg"
            alt="Elegant food composition with fish and ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content Column - 8 columns wide */}
        <div className="flex w-full md:col-span-8 p-16 gap-8">
          <div className="w-8/12 space-y-6">
            <h1 className="text-4xl font-serif">Welcome to the clan</h1>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-[#99FF33]">Our philosophy</h2>
              <p className="text-gray-300">
                At Lobster Clan, we're passionate about delivering the perfect seafood experience. From ocean-fresh catches to exceptional service and a welcoming ambiance, every visit is a celebration of flavor and quality. We believe in crafting memorable dining moments, each dish prepared to perfection, just for you.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif text-[#99FF33]">Our location</h2>
              <p className="text-gray-300">
                Our restaurant offers a cozy, coastal-inspired setting with both indoor comfort and outdoor charm. Whether you're dining under the stars or enjoying the warmth of our inviting interiors, Lobster Clan features the perfect ambiance for your dining pleasure.
              </p>
            </div>
          </div>

          <div className="w-4/12 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-[#99FF33]">071 234 5678</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Location</h3>
              <p className="text-[#99FF33]">123 street</p>
              <p className="text-[#99FF33]">City name, 0134</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Hours</h3>
              <p className="text-[#99FF33]">M-F 11am-2am</p>
              <p className="text-[#99FF33]">Sa 10am-3am</p>
              <p className="text-[#99FF33]">Su 10am-9pm</p>
            </div>
          </div>
        </div>
      </section>
      {/* Menu Preview Section */}
      <section className="grid grid-cols-2 md:grid-cols-3">
        <MenuCard
          imageSrc="/images/side-view-seafood-plate-with-sauces.png"
          title="Seafood platters"
          className="col-span-1"
        />
        <MenuCard
          imageSrc="/images/view-cooked-prepared-crawfish.jpg"
          title="Lobster delights"
          className="col-span-1"
        />
        <MenuCard
          imageSrc="/images/side-view-fried-fish-with-knife-fork.png"
          title="Grilled catch of the day"
          className="col-span-2 md:col-span-1"
        />
      </section>

      {/* Menu Button Section */}
      <section ref={sectionRef} className="bg-[#99FF33] py-8 overflow-hidden relative">
        <div className="container mx-auto px-4 flex justify-center items-center">
          {/* Left lobster */}
          <motion.div 
            className="absolute left-1/4 bottom-0"
            animate={{ 
              y: isFullyInView ? "50%" : "100%" 
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <img
              src="/images/lobster.svg"
              alt="Lobster icon"
              width={50}
              height={50}
              className="h-56 w-auto"
            />
          </motion.div>
          
          <button variant="secondary" className="text-white bg-black px-8 py-4" size="lg">
            Full menu
          </button>
          
          {/* Right lobster */}
          <motion.div 
            className="absolute right-1/4 bottom-0"
            animate={{ 
              y: isFullyInView ? "50%" : "100%" 
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <img
              src="/images/lobster.svg"
              alt="Lobster icon"
              width={50}
              height={50}
              className="h-56 w-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="grid md:grid-cols-2 gap-8 py-16 container mx-auto px-4">
        <div className="relative aspect-video md:aspect-square">
          <img
            src="/placeholder.svg"
            alt="Chef preparing food"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-2xl font-serif italic text-[#99FF33]">Chef in house explains</h2>
          <h3 className="text-3xl font-serif">Crafting Perfection, One Dish at a Time</h3>
          <p className="text-gray-300">
            Meet our Executive Chef, the mastermind behind Lobster Clan's exquisite flavors. With years of culinary expertise and deep passion for fresh seafood, our chef ensures that every dish tells a story of excellence. From selecting the finest ingredients to mastering the art of preparation, the Lobster Clan experience is in the hands of a true seafood artisan.
          </p>
          <Button variant="destructive" className="w-fit">
            Meet the chef
          </Button>
        </div>
      </section>

      {/* Interior Section */}
      <section className="grid md:grid-cols-2 gap-8 py-16 container mx-auto px-4 bg-zinc-900">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-2xl font-serif italic text-[#99FF33]">Feel yourself as a valued guest</h2>
          <h3 className="text-3xl font-serif">Cozy Atmosphere, Unforgettable Moments</h3>
          <p className="text-gray-300">
            At Lobster Clan, we take pride in offering more than just a meal - we create experiences. From the inviting decor to the carefully curated by our culinary taste buds. In a warm and welcoming setting. Whether dining indoors or at our open-air venue, soak in the coastal charm and unwind with the perfect view of the sunset. Your comfort and satisfaction are always our top priority.
          </p>
          <Button variant="destructive" className="w-fit">
            See interior photos
          </Button>
        </div>
        <div className="relative aspect-video md:aspect-square">
          <img
            src="/placeholder.svg"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-zinc-800">
        <div className="container mx-auto px-4 text-center space-y-4">
          <blockquote className="text-3xl md:text-4xl font-serif italic">
            "The sea, once it casts its spell, holds one in its net of wonder forever"
          </blockquote>
          <cite className="text-[#99FF33] text-xl italic">— Jacques Cousteau</cite>
        </div>
      </section>

      {/* Replace existing footer with new footer */}
      <footer className="bg-black py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[#99FF33] text-xl font-serif italic mb-4">Quick links</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white">Menu</a>
              <a href="#" className="block text-gray-300 hover:text-white">Location</a>
              <a href="#" className="block text-gray-300 hover:text-white">Hours</a>
              <a href="#" className="block text-gray-300 hover:text-white">Contacts</a>
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

// Helper component for menu cards
function MenuCard({ imageSrc, title, className }) {
  return (
    <Card className={`bg-black border-none ${className}`}>
      <CardContent className="p-0 relative h-[150px] md:h-auto md:aspect-video">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <h3 className="text-2xl text-white">{title}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

export default App
