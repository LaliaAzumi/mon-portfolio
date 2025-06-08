"use client"

import { useEffect, useRef, useState } from "react"

export default function InkEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match parent input
    const updateCanvasSize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Ink particles
    let particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      alpha: number
      color: string
    }[] = []

    // Animation variables
    let animationFrameId: number

    // Create ink particles
    const createInkEffect = () => {
      // Clear existing particles
      particles = []

      // Create new particles
      const particleCount = 20
      const colors = ["#C17E3C", "#8B5A2B", "#A3C9A8"]

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = canvas.height - 5
        const size = Math.random() * 3 + 1
        const speedX = (Math.random() - 0.5) * 2
        const speedY = -Math.random() * 2 - 1
        const alpha = Math.random() * 0.7 + 0.3
        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push({ x, y, size, speedX, speedY, alpha, color })
      }
    }

    // Animate ink particles
    const animateInk = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Fade out
        p.alpha -= 0.01

        // Draw particle
        if (p.alpha > 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.fill()
        }
      }

      // Remove faded particles
      particles = particles.filter((p) => p.alpha > 0)

      // Continue animation if particles exist
      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animateInk)
      }
    }

    // Handle focus events on parent input
    const handleFocus = () => {
      setIsFocused(true)
      createInkEffect()
      animateInk()
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    // Add event listeners to parent input
    const parent = canvas.parentElement
    if (parent) {
      const input = parent.querySelector("input, textarea")
      if (input) {
        input.addEventListener("focus", handleFocus)
        input.addEventListener("blur", handleBlur)
      }
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)

      const parent = canvas.parentElement
      if (parent) {
        const input = parent.querySelector("input, textarea")
        if (input) {
          input.removeEventListener("focus", handleFocus)
          input.removeEventListener("blur", handleBlur)
        }
      }

      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ opacity: isFocused ? 1 : 0, transition: "opacity 0.3s" }}
    />
  )
}
