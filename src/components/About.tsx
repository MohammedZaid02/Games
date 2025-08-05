import { motion,easeOut } from "framer-motion"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Target, Users, Lightbulb, Award, Heart, Zap, Brain, Gamepad2, Rocket } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import React, { FC } from "react"

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  color: string
}

interface Service {
  icon: FC<{ className?: string }>
  title: string
  description: string
  features: string[]
  color: string
}

interface Value {
  icon: FC<{ className?: string }>
  title: string
  description: string
  color: string
}

const team: TeamMember[] = [
  {
    name: "Ayaan Ahamed",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Visionary leader with a passion for empowering businesses through AI-powered solutions and creating opportunities for fresh talent in India.",
    color: "from-pink-500 to-rose-500",
  },
]

const services: Service[] = [
  {
    icon: Brain,
    title: "AI Software Solutions",
    description: "Complete AI-powered application development across all platforms",
    features: [
      "AI Application Development",
      "AI Web Application Development",
      "AI Android Development",
      "AI iOS Development",
      "AI Custom Software Development",
      "AI Design (UI/UX)",
      "AI SaaS Development",
      "AI MVP Development",
    ],
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Gamepad2,
    title: "Gamification Services",
    description: "Transform static content into interactive, game-like experiences",
    features: [
      "Content Gamification for brands",
      "Interactive app experiences",
      "Platform gamification",
      "EdTech gamification",
      "FinTech engagement solutions",
    ],
    color: "from-pink-500 to-purple-600",
  },
  {
    icon: Rocket,
    title: "Additional Offerings",
    description: "Comprehensive development and automation services",
    features: [
      "MVP Development for startups",
      "Business workflow automation",
      "Custom CRM and Admin Panels",
      "Data Analytics & Dashboards",
      "Internal tools development",
    ],
    color: "from-green-500 to-teal-600",
  },
]

const values: Value[] = [
  {
    icon: Target,
    title: "Innovation First",
    description:
      "We leverage cutting-edge AI technology to build next-generation solutions that drive real business impact.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Talent Empowerment",
    description:
      "We create opportunities for fresh talent in India while delivering world-class solutions to global clients.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Lightbulb,
    title: "Creative Problem Solving",
    description: "We combine deep technical expertise with creative thinking to solve complex business challenges.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "We maintain the highest standards in development, ensuring reliable and scalable solutions for every client.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Heart,
    title: "Human-First Mindset",
    description: "We blend technical expertise with empathy, building lasting partnerships with our clients and team.",
    color: "from-pink-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description:
      "We deliver fast, reliable solutions that help businesses scale rapidly in today's competitive market.",
    color: "from-green-500 to-teal-500",
  },
]

export default function AboutPage(): React.ReactNode {
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
              About Opslify
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Opslify is a next-gen AI software solutions company helping businesses build powerful, scalable, and
              intelligent digital products. Founded in 2024, we specialize in turning bold ideas into real, working tech
              through AI-powered development and innovative gamification services.
            </motion.p>
          </div>
        </motion.section>

        {/* Company Overview */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Who We Are
              </h2>
              <motion.div className="max-w-6xl mx-auto" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Card className="p-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className="text-4xl mb-6"
                  >
                    🚀
                  </motion.div>
                  <p className="text-lg leading-relaxed mb-6">
                    Opslify is a fast-growing software solutions company specializing in next-gen AI-powered software,
                    web, and mobile development. We help startups and businesses build scalable tech products from idea
                    to execution with speed, innovation, and quality.
                  </p>
                  <p className="text-lg leading-relaxed">
                    With a fully remote and flexible team, Opslify blends deep technical expertise with a human-first
                    mindset to deliver fast, reliable, and engaging solutions. Whether you're a startup looking to
                    launch or a growing business ready to automate, we work as your extended tech partner — building
                    smarter, faster, and more creatively.
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-5xl mb-6"
                  >
                    🌟
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    To be a global leader in building impactful, AI-driven digital solutions that empower businesses,
                    transform industries, and create lasting value.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-yellow-300">•</span>
                      <span>Every business can scale rapidly with affordable, intelligent technology</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-yellow-300">•</span>
                      <span>Fresh talent from India becomes the backbone of global innovation</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-yellow-300">•</span>
                      <span>Drive digital transformation across healthcare, education, retail, and finance</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-8 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-5xl mb-6"
                  >
                    🎯
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    To simplify and accelerate software development through intelligent automation, creativity, and a
                    results-driven approach helping founders, startups, and enterprises unlock growth.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-yellow-300">•</span>
                      <span>Help startups build MVPs faster, smarter, and leaner</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-yellow-300">•</span>
                      <span>Support companies in modernizing tech stack with AI automation</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-yellow-300">•</span>
                      <span>Provide top-tier tech talent from India affordably and efficiently</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Services */}
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
                Our Core Services
              </h2>
              <p className="text-xl text-gray-600">Comprehensive AI-powered solutions for modern businesses</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group"
                >
                  <Card className="h-full p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Our Values
              </h2>
              <p className="text-xl text-gray-600">The principles that drive our innovation and success</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group"
                >
                  <Card className="h-full p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Founder Message */}
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
                Message from the Founder
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 lg:p-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-1">
                      <img
                        src="/placeholder.svg?height=128&width=128"
                        alt="Ayaan Ahamed"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <div className="flex-1">
                    <blockquote className="text-lg leading-relaxed mb-6 italic">
                      "As the Founder and CEO of Opslify Software Solutions, my vision has always extended far beyond
                      building just another tech company. Opslify was born out of a deep desire to create meaningful
                      change—both in the global business landscape and within the lives of young, passionate talent
                      across India.
                      <br />
                      <br />
                      This startup is more than a business—it's a movement. A movement toward building a trusted
                      ecosystem where execution meets empathy, where high-quality work doesn't demand overpriced
                      budgets, and where reliability becomes the foundation of every client relationship.
                      <br />
                      <br />
                      No matter the circumstances or challenges, I've made a promise to myself and to every team member
                      who joins us: this company will not stop. We will keep building. We will keep delivering. And most
                      importantly, we will keep empowering. Because that's what true impact looks like—not just profits,
                      but people."
                    </blockquote>

                    <div className="text-right">
                      <p className="text-xl font-bold text-pink-400">— Ayaan Ahamed</p>
                      <p className="text-gray-300">Founder & CEO, Opslify Software Solutions</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
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
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl mb-6"
                >
                  🤝
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Let's turn your bold ideas into real, working tech. Partner with Opslify and experience the power of
                  AI-driven development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                      Start Your Project
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold bg-transparent"
                    >
                      Contact Us
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
