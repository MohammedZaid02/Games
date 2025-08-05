import { FC } from "react"
import { motion } from "framer-motion"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  LucideIcon,
} from "lucide-react"

interface SocialLink {
  icon: LucideIcon
  href: string
  color: string
}

interface FooterLink {
  name: string
  href: string
}

const Footer: FC = () => {
  const socialLinks: SocialLink[] = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
  ]

  const footerLinks: Record<string, FooterLink[]> = {
    "Quick Links": [
      { name: "Games", href: "/Games" },
      { name: "Services", href: "/Services" },
      { name: "About Us", href: "/About" },
      { name: "Feedback", href: "/Feedback" },
    ],
    Support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
    Games: [
      { name: "#Trend", href: "#" },
      { name: "Price Wheel", href: "#" },
      { name: "True or False", href: "#" },
      { name: "Quiz Master", href: "#" },
    ],
  }

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-3xl font-black mb-4"
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
              Opslify
            </motion.div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your daily news consumption into an engaging, interactive experience. Stay informed while having fun!
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div className="flex items-center space-x-3 text-gray-300" whileHover={{ x: 5, color: "#ec4899" }}>
                <Mail className="h-4 w-4" />
                <span>connect@opslify.in</span>
              </motion.div>
              <motion.div className="flex items-center space-x-3 text-gray-300" whileHover={{ x: 5, color: "#ec4899" }}>
                <Phone className="h-4 w-4" />
                <span>+91-7019848758</span>
              </motion.div>
              <motion.div className="flex items-center space-x-3 text-gray-300" whileHover={{ x: 5, color: "#ec4899" }}>
                <MapPin className="h-4 w-4" />
                <span>Bangalore, IN</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-4 text-pink-400">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <motion.li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer block"
                      whileHover={{ x: 5, color: "#ec4899" }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6">Get the latest news games and updates delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        className="border-t border-gray-700 bg-black/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm mb-4 md:mb-0"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              © 2024 Opslify. All rights reserved.
            </motion.p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  )
}

export default Footer
