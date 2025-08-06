import React from "react"
import { useNavigate } from "react-router-dom"
import { motion,easeOut } from "framer-motion"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Play, Star, Users, Clock, Trophy } from "lucide-react"
import Header from "./Header"
import Footer from "../components/Footer"

interface Game {
  id: number
  title: string
  description: string
  longDescription: string
  color: string
  difficulty: "Easy" | "Medium" | "Hard" | string
  players: string
  avgTime: string
  rating: number
  category:
    | "Trending"
    | "Finance"
    | "General"
    | "Quiz"
    | "Competitive"
    | "Education"
    | string
}

const allGames: Game[] = [
  {
    id: 1,
    title: "#Trend",
    description:
      "Spot three news stories that match the trending topic and stay ahead of the curve",
    longDescription:
      "Challenge yourself to identify trending news stories from various categories. This game helps you stay updated with current events while testing your news awareness.",
    color: "from-purple-900 via-purple-800 to-indigo-900",
    difficulty: "Medium",
    players: "2.5K",
    avgTime: "5 min",
    rating: 4.8,
    category: "Trending",
  },
  {
    id: 2,
    title: "Price Wheel",
    description:
      "Spin the wheel and guess the right price point for trending stocks and commodities",
    longDescription:
      "Test your market knowledge by predicting price movements. Spin the wheel and see if you can guess where the market will land.",
    color: "from-emerald-600 via-teal-600 to-cyan-600",
    difficulty: "Hard",
    players: "1.8K",
    avgTime: "7 min",
    rating: 4.6,
    category: "Finance",
  },
  {
    id: 3,
    title: "True or False",
    description:
      "Quick-fire true or false questions about current events and breaking news",
    longDescription:
      "Fast-paced game testing your knowledge of current events. Answer as many questions correctly as possible within the time limit.",
    color: "from-rose-500 via-pink-500 to-purple-500",
    difficulty: "Easy",
    players: "3.2K",
    avgTime: "3 min",
    rating: 4.9,
    category: "General",
  },
  {
    id: 4,
    title: "Quiz Master",
    description:
      "Comprehensive quizzes covering politics, sports, entertainment, and more",
    longDescription:
      "Become the ultimate quiz master by answering questions across multiple categories. Perfect for testing your general knowledge.",
    color: "from-orange-500 via-red-500 to-pink-500",
    difficulty: "Hard",
    players: "1.5K",
    avgTime: "10 min",
    rating: 4.7,
    category: "Quiz",
  },
  {
    id: 5,
    title: "Fruit Ninja",
    description:
      "Slice fruits mid-air with precision and speed to become the ultimate ninja!",
    longDescription:
      "Fruit Ninja is a fast-paced action game where you use your blade to slice as many flying fruits as possible. Avoid bombs, master combos, and challenge your reflexes in this addictive arcade classic. Whether you're aiming for a high score or just want juicy satisfaction, every slice counts!",
    color: "from-green-400 via-yellow-500 to-red-500",
    difficulty: "Easy to Master, Hard to Perfect",
    players: "1.2M",
    avgTime: "3-5 min per session",
    rating: 4.7,
    category: "FruitNinja",
  },
  
]

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

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "Easy":
      return "text-green-500 bg-green-100"
    case "Medium":
      return "text-yellow-500 bg-yellow-100"
    case "Hard":
      return "text-red-500 bg-red-100"
    default:
      return "text-gray-500 bg-gray-100"
  }
}

  const GamesPage = () => {
  const navigate = useNavigate();
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
              All Games
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Explore our complete collection of news-based games. From quick quizzes to competitive challenges,
              there's something for every type of news enthusiast.
            </motion.p>
          </div>
        </motion.section>

        {/* Games Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group"
                >
                  <Card
                    className={`h-full bg-gradient-to-br ${game.color} text-white relative overflow-hidden cursor-pointer`}
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-10">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          animate={{
                            x: [0, Math.random() * 50 - 25],
                            y: [0, Math.random() * 50 - 25],
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

                    <div className="relative z-10 p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                              game.difficulty,
                            )}`}
                          >
                            {game.difficulty}
                          </span>
                        </div>
                        <motion.div
                          className="text-2xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                        >
                          {game.category === "Trending" && "📈"}
                          {game.category === "Finance" && "💰"}
                          {game.category === "General" && "❓"}
                          {game.category === "Quiz" && "🧠"}
                          {game.category === "Competitive" && "🏃‍♂️"}
                          {game.category === "Education" && "🎓"}
                        </motion.div>
                      </div>

                      {/* Description */}
                      <p className="text-sm opacity-90 mb-4 flex-grow">{game.description}</p>

                      {/* Stats */}
                      <div className="flex justify-between items-center mb-6 text-xs opacity-80">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{game.players}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{game.avgTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{game.rating}</span>
                        </div>
                      </div>

                      {/* Play Button */}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                          onClick={() => {
                            if (game.category === "Quiz") {
                              navigate("/Games/Quiz");
                            } else if (game.category === "FruitNinja") {
                              navigate("/Games/FruitNinja");
                            }
                          }}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Play Now
                        </Button>
                      </motion.div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.section
          className="px-4 sm:px-6 lg:px-8 py-16 mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Trophy className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-3xl font-bold mb-4">Ready to Become a News Game Champion?</h2>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of players who are already having fun while staying informed. Start your journey today!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  Start Playing
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
export default GamesPage;