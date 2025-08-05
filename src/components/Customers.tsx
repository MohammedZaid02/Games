import { motion,easeOut } from "framer-motion"
import { Card } from "../components/ui/card"
import { Star, Quote, Users, TrendingUp, Award, Globe } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FC } from "react"

type Testimonial = {
  name: string
  role: string
  company: string
  image: string
  rating: number
  text: string
  color: string
}

type Stat = {
  icon: FC<{ className?: string }>
  number: string
  label: string
  description: string
}

type Company = {
  name: string
  logo: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "News Enthusiast",
    company: "CNN",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Pink Paper Play has completely transformed how I consume news. The games make staying informed fun and engaging. I've learned more about current events in the past month than I did all year!",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Michael Chen",
    role: "Educator",
    company: "Stanford University",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "As an educator, I'm always looking for innovative ways to engage students with current events. Pink Paper Play is a game-changer for news literacy education.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Tech Startup",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Our team uses Pink Paper Play for team building and staying updated on industry trends. It's amazing how competitive we get over news trivia!",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "David Thompson",
    role: "Journalist",
    company: "The Washington Post",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4,
    text: "The fact-checking games have sharpened my ability to identify reliable sources. It's like training for journalists, but fun!",
    color: "from-green-500 to-teal-500",
  },
  {
    name: "Lisa Park",
    role: "Student",
    company: "Harvard University",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I used to avoid reading news because it felt overwhelming. Pink Paper Play made it accessible and enjoyable. Now I'm the most informed person in my dorm!",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Robert Kim",
    role: "Business Analyst",
    company: "Goldman Sachs",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The financial news games help me stay on top of market trends while having fun. It's become part of my daily routine.",
    color: "from-indigo-500 to-purple-500",
  },
]

const stats: Stat[] = [
  {
    icon: Users,
    number: "50,000+",
    label: "Active Users",
    description: "Growing community of news enthusiasts",
  },
  {
    icon: TrendingUp,
    number: "95%",
    label: "User Satisfaction",
    description: "Based on user feedback surveys",
  },
  {
    icon: Award,
    number: "4.9/5",
    label: "App Store Rating",
    description: "Consistently high ratings across platforms",
  },
  {
    icon: Globe,
    number: "120+",
    label: "Countries",
    description: "Global reach and impact",
  },
]

const companies: Company[] = [
  { name: "CNN", logo: "/placeholder.svg?height=60&width=120&text=CNN" },
  { name: "BBC", logo: "/placeholder.svg?height=60&width=120&text=BBC" },
  { name: "Reuters", logo: "/placeholder.svg?height=60&width=120&text=Reuters" },
  { name: "Associated Press", logo: "/placeholder.svg?height=60&width=120&text=AP" },
  { name: "The Guardian", logo: "/placeholder.svg?height=60&width=120&text=Guardian" },
  { name: "Wall Street Journal", logo: "/placeholder.svg?height=60&width=120&text=WSJ" },
]
function Customers() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.section
          className="px-4 sm:px-6 lg:px-8 py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-black mb-6"
              animate={{
                background: [
                  "linear-gradient(45deg, #ec4899, #8b5cf6)",
                  "linear-gradient(45deg, #8b5cf6, #06b6d4)",
                  "linear-gradient(45deg, #06b6d4, #ec4899)",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Our Customers
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Join thousands of satisfied users who have transformed their news consumption experience. From students to
              professionals, everyone loves Pink Paper Play.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <motion.h3
                      className="text-3xl font-bold text-gray-800 mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</h4>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600">Real stories from real users who love Pink Paper Play</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group"
                >
                  <Card className="h-full p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.color}`} />

                    {/* Quote Icon */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-10"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    >
                      <Quote className="h-12 w-12 text-gray-400" />
                    </motion.div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                    {/* User Info */}
                    <div className="flex items-center">
                      <motion.img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Trusted by Leading News Organizations</h2>
              <p className="text-lg text-gray-600">
                Major news outlets and educational institutions trust Pink Paper Play
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {companies.map((company, index) => (
                <motion.div
                  key={company.name}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="px-4 sm:px-6 lg:px-8 py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-12 text-white relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                    style={{
                      left: Math.random() * 100 + "%",
                      top: Math.random() * 100 + "%",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl mb-6"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Amazing Community?</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied users who have already transformed their news experience. Start your
                  journey with Pink Paper Play today!
                </p>
                <motion.button
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}

export default  Customers;