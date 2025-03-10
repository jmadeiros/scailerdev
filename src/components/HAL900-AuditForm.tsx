"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, Loader2, User, AlertCircle, ArrowRight, TrendingUp, Users, Target, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ValidationState {
  isValid: boolean
  message: string
}

interface FormData {
  name: string
  companyName: string
  email: string
}

const messages = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    text: "Optimize your conversion funnel for a 25% increase in lead generation.",
    metrics: ["25% Increase", "Lead Gen"],
  },
  {
    icon: <Users className="w-5 h-5" />,
    text: "Implement personalized customer journeys to boost retention by 40%.",
    metrics: ["40% Retention", "Personalization"],
  },
  {
    icon: <Target className="w-5 h-5" />,
    text: "Leverage AI-driven targeting to improve ad spend efficiency by 30%.",
    metrics: ["30% Efficiency", "AI Targeting"],
  },
  {
    icon: <Zap className="w-5 h-5" />,
    text: "Automate key processes to increase team productivity by 50%.",
    metrics: ["50% Productivity", "Automation"],
  },
  {
    icon: <Globe className="w-5 h-5" />,
    text: "Expand into new markets to drive a 60% growth in customer base.",
    metrics: ["60% Growth", "Market Expansion"],
  },
]

function MessageFeed({ animationTriggered }: { animationTriggered: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="bg-scailer-light rounded-lg mt-4 overflow-hidden"
      animate={animationTriggered ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="p-3"
        >
          <motion.div
            className="flex gap-3"
            animate={
              animationTriggered
                ? {
                    x: "100%",
                    rotate: 10,
                    scale: 0.8,
                  }
                : {}
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div className="w-8 h-8 rounded-lg bg-scailer-green/20 flex items-center justify-center">
              {messages[currentIndex].icon}
            </motion.div>
            <motion.div className="flex-1">
              <p className="text-white text-xs mb-2 leading-relaxed">{messages[currentIndex].text}</p>
              <div className="flex gap-2">
                {messages[currentIndex].metrics.map((metric) => (
                  <span
                    key={metric}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-scailer-green/20 text-scailer-green font-medium"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function HAL900AuditForm() {
  const [loading, setLoading] = useState(false)
  const [animationTriggered, setAnimationTriggered] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    email: "",
  })
  const [validation, setValidation] = useState({
    name: { isValid: false, message: "" },
    companyName: { isValid: false, message: "" },
    email: { isValid: false, message: "" },
  })

  const validateName = (name: string) => {
    if (name.length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters" }
    }
    if (name.length > 50) {
      return { isValid: false, message: "Name must be less than 50 characters" }
    }
    return { isValid: true, message: "Looks good!" }
  }

  const validateCompanyName = (companyName: string) => {
    if (companyName.length < 2) {
      return { isValid: false, message: "Company name must be at least 2 characters" }
    }
    if (companyName.length > 100) {
      return { isValid: false, message: "Company name must be less than 100 characters" }
    }
    return { isValid: true, message: "Looks good!" }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return { isValid: false, message: "Email is required" }
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email" }
    }
    return { isValid: true, message: "Valid email!" }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    let validationResult: ValidationState
    switch (field) {
      case "name":
        validationResult = validateName(value)
        break
      case "companyName":
        validationResult = validateCompanyName(value)
        break
      case "email":
        validationResult = validateEmail(value)
        break
      default:
        validationResult = { isValid: false, message: "" }
    }

    setValidation((prev) => ({
      ...prev,
      [field]: validationResult,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validation.name.isValid && validation.companyName.isValid && validation.email.isValid) {
      setLoading(true)
      setAnimationTriggered(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setLoading(false)
      // Here you would typically send the form data to your backend
    }
  }

  const isFormValid = validation.name.isValid && validation.companyName.isValid && validation.email.isValid

  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-scailer-dark rounded-xl p-6 border border-scailer-light/20"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-scailer-green/10 flex items-center justify-center">
            <User className="w-4 h-4 text-scailer-green" />
          </div>
          <div>
            <h2 className="text-white font-medium">Get Your Free Growth Roadmap</h2>
            <p className="text-sm text-gray-400">Tailored strategies for rapid, sustainable growth</p>
          </div>
        </div>

        <div className="mt-6 mb-4">
          <div className="h-1.5 w-full bg-scailer-light rounded-full overflow-hidden">
            <div
              className="h-full bg-scailer-green rounded-full transition-all duration-300"
              style={{
                width: `${(Object.values(validation).filter((v) => v.isValid).length / 3) * 100}%`,
              }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your name"
                className={cn(
                  "w-full pl-3 pr-9 py-2 bg-scailer-light border-0 text-white placeholder:text-gray-500",
                  "focus:ring-1 focus:ring-scailer-green/50",
                  "rounded-lg transition-all duration-200"
                )}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {formData.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {validation.name.isValid ? (
                    <Check className="h-4 w-4 text-scailer-green" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your company name"
                className={cn(
                  "w-full pl-3 pr-9 py-2 bg-scailer-light border-0 text-white placeholder:text-gray-500",
                  "focus:ring-1 focus:ring-scailer-green/50",
                  "rounded-lg transition-all duration-200"
                )}
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
              {formData.companyName && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {validation.companyName.isValid ? (
                    <Check className="h-4 w-4 text-scailer-green" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  "w-full pl-3 pr-9 py-2 bg-scailer-light border-0 text-white placeholder:text-gray-500",
                  "focus:ring-1 focus:ring-scailer-green/50",
                  "rounded-lg transition-all duration-200"
                )}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {formData.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {validation.email.isValid ? (
                    <Check className="h-4 w-4 text-scailer-green" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className={cn(
                "w-full py-2 text-white font-medium bg-scailer-green",
                "hover:bg-[#128C7E] disabled:bg-scailer-light disabled:text-gray-500",
                "disabled:cursor-not-allowed transition-all duration-200 rounded-lg"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating your roadmap...
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Get Your Free Growth Roadmap
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </form>

        <MessageFeed animationTriggered={animationTriggered} />
      </motion.div>
    </div>
  )
} 