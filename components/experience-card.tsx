"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

interface ExperienceCardProps {
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
  variant?: "mechanical" | "alchemical"
}

export default function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  skills,
  variant = "mechanical",
}:
 ExperienceCardProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const variantStyles = {
    mechanical: {
      border: "border-[#8B5A2B]/20",
      badge:
        "bg-[#8B5A2B]/20 text-[#674621] border-[#8B5A2B]/50 dark:bg-[#C9B894]/30 dark:text-[#E8D0A9] dark:border-[#C9B894]/50",
      icon: "text-[#C17E3C]",
      iconBg: "bg-[#8B5A2B]/10",
      decoration: (
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
          <div className="w-full h-full rounded-full border-2 border-[#C17E3C] animate-spin-slow flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#8B5A2B] animate-spin-reverse"></div>
          </div>
        </div>
      ),
    },
    alchemical: {
      border: "border-[#1D3E2F]/20",
      badge:
        "dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#674621] border-[#A3C9A8]",
      icon: "text-[#674621]",
      iconBg: "bg-[#1D3E2F]/30",
      decoration: (
        <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
          <div className="w-full h-full rounded-full border-2 border-[#A3C9A8] animate-pulse-slow"></div>
        </div>
      ),
    },
  }

  return (
    <Card
      ref={ref}
      className={`dark:bg-[#2A2522] bg-[#F5F1E8] ${
        variantStyles[variant].border
      } overflow-hidden shadow-md relative transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>
      {variantStyles[variant].decoration}

      <CardContent className="p-6 space-y-4 relative">
        <div className="space-y-2">
          <h3 className="text-xl font-bold dark:text-[#E8D0A9] text-[#6A4423] font-serif">{title}</h3>

          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${variantStyles[variant].iconBg}`}>
              <Briefcase className={`h-4 w-4 ${variantStyles[variant].icon}`} />
            </div>
            <span className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">{company}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${variantStyles[variant].iconBg}`}>
              <MapPin className={`h-4 w-4 ${variantStyles[variant].icon}`} />
            </div>
            <span className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-full ${variantStyles[variant].iconBg}`}>
              <Calendar className={`h-4 w-4 ${variantStyles[variant].icon}`} />
            </div>
            <span className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">{period}</span>
          </div>
        </div>

        <p className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">{description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, index) => (
            <Badge key={index} className={`${variantStyles[variant].badge} font-serif`}>
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
