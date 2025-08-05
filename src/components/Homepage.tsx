import React from "react";
import { motion,easeOut,easeInOut   } from "framer-motion";
import Header from "./Header";

const heroVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOut,
      staggerChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: easeInOut,
    },
  },
};

export default function HomePage(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="pt-20 pb-16 px-4 sm:px-6 lg:px-8"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={floatingVariants} animate="animate">
              <motion.h1 variants={textVariants} className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Why just follow
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  the news?
                </span>
                <br />
                <motion.span
                  className="text-gray-900"
                  animate={{
                    scale: [1, 1.05, 1],
                    textShadow: [
                      "0px 0px 0px rgba(0,0,0,0)",
                      "0px 0px 20px rgba(236,72,153,0.3)",
                      "0px 0px 0px rgba(0,0,0,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Play it!
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={textVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your daily news consumption into an engaging, interactive experience. Play, learn, and stay informed like never before.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "50K+", label: "Active Players", icon: "👥" },
                { number: "1M+", label: "Games Played", icon: "🎮" },
                { number: "95%", label: "User Satisfaction", icon: "⭐" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold text-gray-800 mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-50"
          initial="hidden"
          whileInView="visible"
          variants={heroVariants}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              variants={textVariants}
              className="text-4xl font-extrabold text-indigo-600 mb-12"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "1. Read the Headlines",
                  desc: "We summarize the latest breaking news into digestible, engaging briefs.",
                  emoji: "📰",
                },
                {
                  title: "2. Play Interactive Quizzes",
                  desc: "Test your understanding with fun, gamified quizzes based on current events.",
                  emoji: "🧠",
                },
                {
                  title: "3. Climb the Leaderboard",
                  desc: "Earn points, unlock achievements, and compete with others around the world.",
                  emoji: "🏆",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  variants={textVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-4xl mb-4">{step.emoji}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
