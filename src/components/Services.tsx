"use client";

import { motion, Variants, easeOut } from "framer-motion";
import {
  Target,
  Users,
  Lightbulb,
  Award,
  Heart,
  Zap,
  Brain,
  Gamepad2,
  Rocket,
} from "lucide-react";

interface Service {
icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Target className="w-8 h-8 text-blue-500" />,
    title: "Goal-Oriented",
    description:
      "Stay focused on outcomes. Our services are designed to deliver measurable results aligned with your business objectives.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "User-Centric",
    description:
      "Design that puts users first. We craft experiences that are intuitive and meaningful for your audience.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Innovative Ideas",
    description:
      "Push boundaries with us. We bring fresh perspectives and cutting-edge solutions to every project.",
  },
  {
    icon: <Award className="w-8 h-8 text-purple-500" />,
    title: "Quality Driven",
    description:
      "No compromises. We adhere to the highest standards to ensure exceptional quality in every deliverable.",
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Passionate Team",
    description:
      "Work with people who care. Our team is deeply invested in making your project a success.",
  },
  {
    icon: <Zap className="w-8 h-8 text-pink-500" />,
    title: "Fast Execution",
    description:
      "Speed without the stress. Our efficient processes keep projects on track and on time.",
  },
  {
    icon: <Brain className="w-8 h-8 text-indigo-500" />,
    title: "Smart Solutions",
    description:
      "Work smarter, not harder. We develop intelligent strategies that solve real-world problems effectively.",
  },
  {
    icon: <Gamepad2 className="w-8 h-8 text-orange-500" />,
    title: "Engaging Experiences",
    description:
      "Create moments that matter. We design digital experiences that capture attention and inspire action.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-teal-500" />,
    title: "Scalable Growth",
    description:
      "Plan for the future. Our solutions are built to scale with your growing needs and ambitions.",
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ServicesPage: React.FC = () => {
  return (
    <main className="min-h-screen py-16 px-4 md:px-20 bg-gradient-to-br from-indigo-700 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Why Choose Us?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
        >
          We combine creativity, strategy, and technology to build impactful
          digital solutions.
        </motion.p>
      </div>

      <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              {service.title}
            </h2>
            <p className="text-white/70">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default ServicesPage;
