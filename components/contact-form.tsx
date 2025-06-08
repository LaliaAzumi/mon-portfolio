"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import InkEffect from "@/components/ink-effect"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" }) // Reset form
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.error || "Une erreur est survenue")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="dark:bg-[#2A2522] bg-[#F5F1E8] dark:border-[#8B5A2B]/20 border-[#C17E3C]/20 overflow-hidden shadow-md relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>
      <CardContent className="p-6 relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif"
            >
              Votre nom *
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md dark:border-[#8B5A2B]/30 border-[#C17E3C]/30 dark:bg-[#2A2522] bg-[#F5F1E8] px-3 py-2 text-sm dark:text-[#E8D0A9] text-[#6A4423] dark:placeholder:text-[#E8D0A9]/50 placeholder:text-[#6A4423]/50 focus:outline-none dark:focus:ring-[#8B5A2B]/50 focus:ring-[#C17E3C]/50 focus:ring-2 font-serif disabled:opacity-50"
                placeholder="Votre nom complet"
                disabled={isSubmitting}
              />
              <InkEffect />
            </div>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif"
            >
              Votre email *
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md dark:border-[#8B5A2B]/30 border-[#C17E3C]/30 dark:bg-[#2A2522] bg-[#F5F1E8] px-3 py-2 text-sm dark:text-[#E8D0A9] text-[#6A4423] dark:placeholder:text-[#E8D0A9]/50 placeholder:text-[#6A4423]/50 focus:outline-none dark:focus:ring-[#8B5A2B]/50 focus:ring-[#C17E3C]/50 focus:ring-2 font-serif disabled:opacity-50"
                placeholder="votre.email@exemple.com"
                disabled={isSubmitting}
              />
              <InkEffect />
            </div>
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif"
            >
              Votre message *
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="flex min-h-[120px] w-full rounded-md dark:border-[#8B5A2B]/30 border-[#C17E3C]/30 dark:bg-[#2A2522] bg-[#F5F1E8] px-3 py-2 text-sm dark:text-[#E8D0A9] text-[#6A4423] dark:placeholder:text-[#E8D0A9]/50 placeholder:text-[#6A4423]/50 focus:outline-none dark:focus:ring-[#8B5A2B]/50 focus:ring-[#C17E3C]/50 focus:ring-2 font-serif disabled:opacity-50 resize-none"
                placeholder="Décrivez votre projet, vos besoins ou posez-moi une question..."
                disabled={isSubmitting}
              />
              <InkEffect />
            </div>
          </div>

          {/* Messages de statut */}
          {submitStatus === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-700 dark:text-green-300 font-serif">
                Message envoyé avec succès ! Je vous répondrai bientôt.
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-700 dark:text-red-300 font-serif">{errorMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8B5A2B] hover:bg-[#6A4423] text-[#E8D0A9] border-none font-serif relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Sceller le message
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
