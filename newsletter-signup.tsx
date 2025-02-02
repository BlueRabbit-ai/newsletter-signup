"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"

// Email validation schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
})

type FormData = z.infer<typeof schema>

export default function NewsletterSignup() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to subscribe")
      }

      setIsSubscribed(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" })
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, provider: "facebook" },
    { name: "Twitter", icon: Twitter, provider: "twitter" },
    { name: "LinkedIn", icon: Linkedin, provider: "linkedin" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isSubscribed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <div className="text-center mb-6">
                <Image src="/your-logo.png" alt="Zenith Logo" width={120} height={40} className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h1>
                <p className="text-gray-600">Stay updated with our latest news and offers</p>
              </div>

              <div className="flex justify-center space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    aria-label={`Sign up with ${social.name}`}
                    onClick={() => handleSocialSignIn(social.provider)}
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`w-full ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </form>

              {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}

              <div className="mt-4 text-center text-sm text-gray-500">
                <a href="#" className="hover:underline">
                  Terms
                </a>{" "}
                ·{" "}
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>{" "}
                ·{" "}
                <a href="#" className="hover:underline">
                  Help
                </a>
              </div>

              <div className="mt-6 text-center text-xs text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-5xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Subscribing!</h2>
              <p className="text-gray-600 mb-4">
                We're excited to have you on board. Check your inbox for a welcome email coming soon.
              </p>
              <Button onClick={() => setIsSubscribed(false)} className="bg-purple-600 hover:bg-purple-700 text-white">
                Back to Form
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

