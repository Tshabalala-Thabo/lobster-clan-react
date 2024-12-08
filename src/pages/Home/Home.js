import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Navbar } from '../../components/Navbar/Navbar'

// Helper component for menu cards
function MenuCard({ imageSrc, title, className }) {
  return (
    <Card className={`bg-black rounded-none border-none overflow-hidden group ${className}`}>
      <CardContent className="p-0 relative h-[150px] md:h-auto md:aspect-video">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover origin-center transition-transform duration-500 ease-out group-hover:scale-125"
          />
        </div>
        <div
          className="absolute inset-0 bg-black/40 flex items-end p-6 transition-colors duration-300 group-hover:bg-black/50"
        >
          <h3 className="text-2xl text-white transform transition-transform duration-500 ease-out group-hover:translate-x-6">
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}

export function Home() {
  const sectionRef = React.useRef(null)
  const heroRef = React.useRef(null)
  
  const isHeroInView = useInView(heroRef, {
    margin: "-100px 0px 0px 0px"
  })
  
  const isInViewTop = useInView(sectionRef, {
    margin: "-200px 0px 0px 0px",
    once: false
  })

  const isInViewBottom = useInView(sectionRef, {
    margin: "0px 0px -200px 0px",
    once: false
  })

  const isFullyInView = isInViewTop && isInViewBottom

  return (
    <>
      <Navbar show={!isHeroInView} />

      <div ref={heroRef} className="relative min-h-screen">
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
      <section className="mx-auto flex flex-col md:flex-row min-h-[500px]">
        {/* Image Column */}
        <div className="hidden md:block md:w-1/3 relative">
          <img
            src="/images/elegant-healthy-food-composition-with-fish.jpg"
            alt="Elegant food composition with fish and ingredients"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content Column */}
        <div className="flex w-full md:w-2/3 p-4 md:p-16 flex-col md:flex-row gap-8">
          <div className="w-full md:w-8/12 space-y-6">
            <h1 className="text-3xl md:text-4xl font-serif">Welcome to the clan</h1>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-serif text-[#E53D10]">Our philosophy</h2>
              <p className="opacity-70">
                At Lobster Clan, we're passionate about delivering the perfect seafood experience. From ocean-fresh catches to exceptional service and a welcoming ambiance, every visit is a celebration of flavor and quality. We believe in crafting memorable dining moments, each dish prepared to perfection, just for you.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-serif text-[#E53D10]">Our location</h2>
              <p className="opacity-70">
                Our restaurant offers a cozy, coastal-inspired setting with both indoor comfort and outdoor charm. Whether you're dining under the stars or enjoying the warmth of our inviting interiors, Lobster Clan features the perfect ambiance for your dining pleasure.
              </p>
            </div>
          </div>

          <div className="w-full md:w-4/12 space-y-4 bg-gray-50 p-4 md:p-0">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-[#539C00]">071 234 5678</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Location</h3>
              <p className="text-[#539C00]">123 street</p>
              <p className="text-[#539C00]">City name, 0134</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Hours</h3>
              <p className="text-[#539C00]">M-F 11am-2am</p>
              <p className="text-[#539C00]">Sa 10am-3am</p>
              <p className="text-[#539C00]">Su 10am-9pm</p>
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
            className="absolute hidden sm:block sm:left-[60px] md:left-[15vw] lg:left-1/4 bottom-0"
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
            className="absolute hidden sm:block sm:right-[60px] md:right-[15vw] lg:right-1/4 bottom-0"
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
      <section className="flex flex-col md:flex-row mx-auto bg-[#111] min-h-[500px]">
        <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto md:min-h-[500px]">
          <img
            src="/images/chef-cooking-kitchen-while-wearing-professional-attire.jpg"
            alt="Chef preparing food"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6 flex flex-col p-8 md:p-16 justify-center min-h-[500px]">
          <h2 className="text-2xl font-marck italic text-[#99FF33]">Chef in house explains</h2>
          <h3 className="text-3xl text-white">Crafting Perfection, One Dish at a Time</h3>
          <p className="opacity-70 text-white">
            Meet our Executive Chef, the mastermind behind Lobster Clan's exquisite flavors. With years of culinary expertise and deep passion for fresh seafood, our chef ensures that every dish tells a story of excellence. From selecting the finest ingredients to mastering the art of preparation, the Lobster Clan experience is in the hands of a true seafood artisan.
          </p>
          <Button variant="destructive" className="px-8 rounded-none py-4 w-fit" size="lg">
            Meet the chef
          </Button>
        </div>
      </section>

      {/* Interior Section */}
      <section className="flex flex-col-reverse md:flex-row  mx-auto bg-[#111] min-h-[500px]">
        <div className="w-full md:w-1/2 space-y-6 flex flex-col p-8 md:p-16 justify-center min-h-[500px]">
          <h2 className="text-2xl font-marck italic text-[#99FF33]">Feel yourself as a valued guest</h2>
          <h3 className="text-3xl text-white">Cozy Atmosphere, Unforgettable Moments</h3>
          <p className="opacity-70 text-white">
            At Lobster Clan, we take pride in offering more than just a meal - we create experiences. From the inviting decor to the carefully curated by our culinary taste buds. In a warm and welcoming setting. Whether dining indoors or at our open-air venue, soak in the coastal charm and unwind with the perfect view of the sunset. Your comfort and satisfaction are always our top priority.
          </p>
          <Button variant="destructive" className="px-8 rounded-none py-4 w-fit" size="lg">
            See interior photos
          </Button>
        </div>
        <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto md:min-h-[500px]">
          <img
            src="/images/cutlery-setting-restaurant.png"
            alt="Restaurant interior"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* Quote Content */}
        <div className="relative container mx-auto px-4 text-center space-y-4">
          <blockquote className="text-3xl md:text-4xl font-protest text-white">
            "The sea, once it casts its spell, holds one in its net of wonder forever"
          </blockquote>
          <cite className="text-[#99FF33] text-4xl font-marck block">— Jacques Cousteau</cite>
        </div>
      </section>
    </>
  )
} 