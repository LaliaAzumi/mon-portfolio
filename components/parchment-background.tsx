"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export default function ParchmentBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create parchment texture
    const createParchmentTexture = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      // Base color based on theme
      const isDark = theme === "dark"

      // Dark theme: dark brown (#2A2522)
      // Light theme: light beige (#F5F1E8)
      const baseR = isDark ? 42 : 245
      const baseG = isDark ? 37 : 241
      const baseB = isDark ? 34 : 232

      for (let i = 0; i < data.length; i += 4) {
        // Add slight noise to create texture
        const noise = Math.random() * 10 - 5

        data[i] = Math.min(255, Math.max(0, baseR + noise)) // R
        data[i + 1] = Math.min(255, Math.max(0, baseG + noise)) // G
        data[i + 2] = Math.min(255, Math.max(0, baseB + noise)) // B
        data[i + 3] = 255 // A

        // Occasionally add small specks for texture
        if (Math.random() < 0.01) {
          if (isDark) {
            data[i] = Math.min(255, baseR + 15)
            data[i + 1] = Math.min(255, baseG + 15)
            data[i + 2] = Math.min(255, baseB + 15)
          } else {
            data[i] = Math.max(0, baseR - 15)
            data[i + 1] = Math.max(0, baseG - 15)
            data[i + 2] = Math.max(0, baseB - 15)
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Draw subtle mechanical patterns
    const drawMechanicalPatterns = () => {
      // Set a semi-transparent fill for the patterns
      ctx.globalAlpha = 0.03

      // Draw scattered gear shapes
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 100 + 50
        const rotation = Math.random() * Math.PI * 2
        const teethCount = Math.floor(Math.random() * 8) + 8

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        // Draw a gear
        ctx.beginPath()
        ctx.arc(0, 0, size / 3, 0, Math.PI * 2)

        // Draw teeth
        for (let j = 0; j < teethCount; j++) {
          const angle = (j / teethCount) * Math.PI * 2
          const innerX = Math.cos(angle) * (size / 3)
          const innerY = Math.sin(angle) * (size / 3)
          const outerX = Math.cos(angle) * (size / 2)
          const outerY = Math.sin(angle) * (size / 2)

          ctx.moveTo(innerX, innerY)
          ctx.lineTo(outerX, outerY)
        }

        // Alternate between copper and green for the patterns
        const isDark = theme === "dark"
        if (Math.random() < 0.7) {
          ctx.strokeStyle = isDark ? "#C17E3C" : "#8B5A2B" // Copper/Brown
        } else {
          ctx.strokeStyle = isDark ? "#A3C9A8" : "#7A9E7E" // Green
        }

        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
      }

      // Reset global alpha
      ctx.globalAlpha = 1
    }

    // Create the background
    createParchmentTexture()
    drawMechanicalPatterns()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-500"
      style={{ background: theme === "dark" ? "#2A2522" : "#F5F1E8" }}
    />
  )
}
