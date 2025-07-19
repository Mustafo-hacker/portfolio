"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, GitlabIcon as GitHub, Linkedin, Mail, ExternalLink, Star, User, Phone, Send } from "lucide-react"
import axios from "axios"

export default function Page() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number }[]>([])

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const chatId = "843187550"
  const tokenBot = "7836459119:AAG6YEk6YpLV1YyT2UCsm7bQPSMYp4LGxZo"

  const sendToTelegram = async () => {
    if (!name || !desc || !phone) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    const text = `
<b>🌟 New Message from Portfolio Website 🌟</b>
    
<b>👤 Name:</b> ${name}
<b>📧 Email:</b> ${desc}
<b>📱 Phone:</b> ${phone}
    
<i>Sent from Mustafo's Portfolio</i>
`

    try {
      await axios.post(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      })
      setSubmitStatus("success")
      setName("")
      setDesc("")
      setPhone("")
    } catch (error) {
      console.log(error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <main className="min-h-screen relative">
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.5, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <AnimatePresence>
          {Math.random() > 0.7 && (
            <motion.div
              className="absolute bg-white h-0.5 rounded-full"
              initial={{
                top: `${Math.random() * 50}%`,
                left: "0%",
                width: "1px",
                opacity: 1,
                rotate: 15,
              }}
              animate={{
                left: "100%",
                width: "100px",
                opacity: [0, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => { }}
            />
          )}
        </AnimatePresence>

        <motion.div style={{ opacity, scale }} className="z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mb-6 relative"
          >
            <div className="absolute inset-0 blur-xl bg-purple-500 bg-opacity-30 rounded-full transform scale-150" />
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-4 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Mustafo Hafizov
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-xl md:text-2xl text-purple-200 mb-8 font-light"
            >
              <span className="text-pink-400">Front-end Developer</span> | Creative Coder
            </motion.p>

            <div className="flex gap-4 justify-center mb-12">
              <motion.a
                href="https://github.com/Mustafo-hacker"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[black] bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-all"
              >
                <GitHub className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[black] bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:hafizov336@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[black] bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition-all"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>

            <motion.button
              onClick={() => scrollToSection(projectsRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              View Projects
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-white cursor-pointer" onClick={() => scrollToSection(aboutRef)} />
        </motion.div>
      </section>

      <section ref={aboutRef} className="py-20 px-4 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-semibold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Hello, My name is Mustafo. I`m a junior front-end developer from Kulob, Tajikistan. Born in 2008, I
              discovered my passion for web development at an early age and have been actively learning modern
              technologies ever since.
            </p>
            <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I`m motivated to grow in the IT field and enjoy building clean, user-friendly, and visually appealing
              interfaces. I`m always eager to take on new challenges and improve my skills.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Next.js",
                "Tailwind CSS",
                "Framer Motion",
                "Git",
                "Git-Hub",
                "Redux-toolkit",
                "Zustand",
                "Redux-toolkit Query",
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section ref={projectsRef} className="py-20 px-4 max-w-5xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-3xl my-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-semibold text-center mb-2">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-10"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Internet-Magazine",
                description:
                  "A modern online store with product pages, cart, and checkout built using Next.js and Redux Toolkit.",
                tags: ["React", "Zustand", "Tailwind"],
              },
              {
                title: "Todo List",
                description:
                  "A fully-featured task management app with authentication and data persistence using React and Firebase.",
                tags: ["React", "JavaScript", "CSS"],
              },
              {
                title: "Instagram Clone",
                description: "A social media platform clone with image uploads, likes, comments and user profiles.",
                tags: ["Next.js", "Redux-toolkit", "Swagger"],
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href="#"
                      className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 text-sm"
                    >
                      View Project <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                      <GitHub className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section ref={contactRef} className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-semibold mb-2">Contact</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Want to work together or have a question? Feel free to reach out to me through any of these channels.
          </p>

          <div className="grid gap-6 max-w-md mx-auto">
            <motion.a
              href="mailto:hafizov336@gmail.com"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-800 dark:text-gray-200">hafizov336@gmail.com</p>
              </div>
            </motion.a>

            <motion.a
              href="https://t.me/MustafoKhafizov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.411-.168.56-.505 1.287-.962 1.287-.673.033-1.18-.436-1.833-.853-.673-.436-1.329-.8-1.988-1.232-.842-.56-.336-1.004.168-1.527.13-.134 2.466-2.254 2.509-2.445.004-.022.004-.045.004-.067 0-.112-.056-.168-.168-.168-.112 0-.224.056-.336.112l-3.13 2.08c-.538.335-1.076.503-1.614.503-.538 0-1.076-.168-1.614-.503-.505-.335-1.01-.67-1.515-1.004-.505-.335-.842-.67-1.01-1.172.168-.335.673-.503 1.178-.67.505-.168 1.01-.336 1.515-.504 1.01-.335 2.02-.67 3.03-1.004 1.01-.335 2.02-.67 3.03-1.004.505-.168 1.01-.336 1.515-.503.505-.168 1.01-.336 1.515-.503.168-.056.336-.112.505-.112.168 0 .336.056.505.112.168.112.336.224.505.335.168.112.336.224.505.335z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">Telegram</p>
                <p className="text-gray-800 dark:text-gray-200">@MustafoKhafizov</p>
              </div>
            </motion.a>
          </div>

          <motion.div
            className="mt-16 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Send me a message</h3>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    type="email"
                    placeholder="Your Email"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    type="tel"
                    placeholder="Your Phone Number"
                  />
                </div>

                <motion.button
                  onClick={sendToTelegram}
                  disabled={isSubmitting || !name || !desc || !phone}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-medium shadow-lg transition-all ${isSubmitting || !name || !desc || !phone
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:opacity-90"
                    }`}
                  whileHover={{ scale: isSubmitting || !name || !desc || !phone ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || !name || !desc || !phone ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <p className="text-green-500 text-sm mt-2">Message sent successfully!</p>
                )}

                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm mt-2">Failed to send message. Please try again.</p>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
              &copy; {new Date().getFullYear()} Mustafo Hafizov. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
