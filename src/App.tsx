import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Header from "./components/Header"
// import Footer from "./components/Footer"
import HomePage from "./components/Homepage"
import GamesPage from "./components/Games"
import ServicesPage from "./components/Services"
import CustomersPage from "./components/Customers"
import AboutPage from "./components/About"
import FeedbackPage from "./components/Feedback"

export default function App() {
  return (
    <Router>
      {/* <Header /> */}
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Games" element={<GamesPage />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/Customers" element={<CustomersPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Feedback" element={<FeedbackPage />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  )
}
