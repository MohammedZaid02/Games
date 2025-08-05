import React, { useState, FormEvent } from "react"
import { motion,easeOut } from "framer-motion"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Input } from "../components/ui/input"
import {
  Star,
  Send,
  MessageCircle,
  ThumbsUp,
  Users,
  TrendingUp,
} from "lucide-react"
import Header from "./Header"
import Footer from "../components/Footer"

interface FeedbackStat {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  number: string
  label: string
  description: string
}

interface RecentFeedback {
  name: string
  rating: number
  text: string
  date: string
  category: string
}

const feedbackStats: FeedbackStat[] = [
  {
    icon: MessageCircle,
    number: "2,500+",
    label: "Feedback Received",
    description: "User suggestions and reviews",
  },
  {
    icon: ThumbsUp,
    number: "98%",
    label: "Positive Feedback",
    description: "Users love our platform",
  },
  {
    icon: Users,
    number: "1,200+",
    label: "Feature Requests",
    description: "Community-driven improvements",
  },
  {
    icon: TrendingUp,
    number: "95%",
    label: "Implementation Rate",
    description: "Feedback turned into features",
  },
]

const recentFeedback: RecentFeedback[] = [
  {
    name: "Jessica M.",
    rating: 5,
    text: "The new quiz format is amazing! Love how it adapts to my knowledge level.",
    date: "2 days ago",
    category: "Feature Request",
  },
  {
    name: "David L.",
    rating: 4,
    text: "Great app overall. Would love to see more international news coverage.",
    date: "1 week ago",
    category: "Suggestion",
  },
  {
    name: "Maria S.",
    rating: 5,
    text: "The fact-checking game helped me become more critical of news sources. Excellent!",
    date: "2 weeks ago",
    category: "Praise",
  },
  {
    name: "Alex K.",
    rating: 4,
    text: "Mobile app works great. Maybe add offline mode for when I'm traveling?",
    date: "3 weeks ago",
    category: "Feature Request",
  },
]

interface FormData {
  name: string
  email: string
  category: string
  message: string
}

export default function FeedbackPage(): React.ReactNode {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log("Feedback submitted:", { ...formData, rating })
  }

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
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Your Feedback Matters
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Help us improveOpslify by sharing your thoughts, suggestions, and ideas. Your feedback
              directly shapes our product development and user experience.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {feedbackStats.map((stat, index) => (
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
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <motion.h3
                      className="text-3xl font-bold text-gray-800 mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
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

        {/* Feedback Form Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Share Your Thoughts
              </h2>
              <p className="text-xl text-gray-600">
                We'd love to hear from you! Your feedback helps us create better experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating Section */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      How would you rate your experience?
                    </h3>
                    <div className="flex justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          className="focus:outline-none"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setRating(star)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              star <= (hoveredRating || rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="improvement">Improvement Suggestion</option>
                      <option value="praise">Praise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full"
                      placeholder="Tell us about your experience, suggestions, or any issues you've encountered..."
                      required
                    />
                  </div>

                  <motion.div className="text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Feedback
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Recent Feedback Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Recent Feedback
              </h2>
              <p className="text-xl text-gray-600">See what our community is saying</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentFeedback.map((feedback, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                >
                  <Card className="h-full p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          feedback.category === "Feature Request"
                            ? "bg-blue-100 text-blue-800"
                            : feedback.category === "Suggestion"
                            ? "bg-green-100 text-green-800"
                            : feedback.category === "Praise"
                            ? "bg-pink-100 text-pink-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {feedback.category}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 italic">"{feedback.text}"</p>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="font-medium">{feedback.name}</span>
                      <span>{feedback.date}</span>
                    </div>
                  </Card>
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
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-6"
                >
                  💬
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Keep the Conversation Going</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Join our community discussions, follow us on social media, or reach out directly. We're always here to
                  listen and improve.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                      Join Community
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold bg-transparent"
                    >
                      Contact Support
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
