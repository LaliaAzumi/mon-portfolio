"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectDetails {
  id: string
  title: string
  description: string
  longDescription?: string
  features?: string[]
  technologies?: string[]
  images: ProjectImage[]
  tags: string[]
  codeUrl?: string
  demoUrl?: string
  variant?: "mechanical" | "alchemical"
}

interface ProjectModalProps {
  project: ProjectDetails | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project])

  if (!project) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const variantStyles = {
    mechanical: {
      badge:
        "bg-[#8B5A2B]/20 text-[#674621] border-[#8B5A2B]/50 dark:bg-[#C9B894]/30 dark:text-[#E8D0A9] dark:border-[#C9B894]/50",
      accent: "text-[#C17E3C] dark:text-[#C17E3C]",
      button: "bg-[#8B5A2B] hover:bg-[#6A4423] text-[#E8D0A9] border-none",
    },
    alchemical: {
      badge:
        "dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8]",
      accent: "text-[#7A9E7E] dark:text-[#A3C9A8]",
      button: "bg-[#7A9E7E] hover:bg-[#1D3E2F] text-[#F5F1E8] border-none",
    },
  }

  const variant = project.variant || "mechanical"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] p-0 dark:bg-[#2A2522] bg-[#F5F1E8] border-[#C17E3C]/30 dark:border-[#8B5A2B]/30 overflow-hidden">
        {/* Header avec bouton de fermeture */}
        <div className="flex items-center justify-between p-6 border-b dark:border-[#8B5A2B]/30 border-[#C17E3C]/30">
          <div className="flex-1">
            <h2 className="text-2xl font-bold dark:text-[#E8D0A9] text-[#6A4423] font-serif">{project.title}</h2>
            <p className="dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif mt-1">{project.description}</p>
          </div>
          
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)] p-6 space-y-6">
          {/* Image carousel */}
          <div className="relative aspect-video w-full rounded-md overflow-hidden border dark:border-[#8B5A2B]/30 border-[#C17E3C]/30">
            {project.images.length > 0 && (
              <>
                <Image
                  src={project.images[currentImageIndex].src || "/gift.jpg"}
                  alt={project.images[currentImageIndex].alt}
                  fill
                  className="object-cover"
                />

                {/* Navigation arrows */}
                {project.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8 p-1.5"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8 p-1.5"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {project.images.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
                            index === currentImageIndex
                              ? "bg-white scale-110"
                              : "bg-white/50 scale-100 hover:bg-white/70"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Project details */}
          <div className="space-y-6">
            {project.longDescription && (
              <div>
                <h3 className={`text-lg font-bold mb-3 font-serif ${variantStyles[variant].accent}`}>
                  Description détaillée
                </h3>
                <p className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div>
                <h3 className={`text-lg font-bold mb-3 font-serif ${variantStyles[variant].accent}`}>
                  Fonctionnalités principales
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif"
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          variant === "mechanical" ? "bg-[#C17E3C]" : "bg-[#A3C9A8]"
                        }`}
                      ></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className={`text-lg font-bold mb-3 font-serif ${variantStyles[variant].accent}`}>
                  Technologies utilisées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} className={`${variantStyles[variant].badge} font-serif`}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          
        </div>
      </DialogContent>
    </Dialog>
  )
}
