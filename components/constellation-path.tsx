"use client"

import { useEffect, useRef } from "react"

export default function ConstellationPath() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Define constellation points (relative to canvas size)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10

    const points = [
      { x: centerX, y: centerY - radius }, // top
      { x: centerX + radius * 0.95, y: centerY - radius * 0.3 }, // top right
      { x: centerX + radius * 0.6, y: centerY + radius * 0.8 }, // bottom right
      { x: centerX - radius * 0.6, y: centerY + radius * 0.8 }, // bottom left
      { x: centerX - radius * 0.95, y: centerY - radius * 0.3 }, // top left
      { x: centerX, y: centerY - radius }, // back to top to complete the shape
    ]

    // Add some random points for stars
    const stars = []
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * radius * 1.2
      stars.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        pulse: Math.random() * 0.02 + 0.01,
      })
    }

    // Animation variables
    let progress = 0
    let animationFrameId: number

    const drawConstellation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        // Pulsing opacity
        const opacity = Math.sin(Date.now() * star.pulse) * 0.2 + star.opacity
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      })

      // Draw constellation lines with gradient
      for (let i = 0; i < points.length - 1; i++) {
        const start = points[i]
        const end = points[i + 1]

        // Create gradient
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y)
        gradient.addColorStop(0, i % 2 === 0 ? "rgba(168, 85, 247, 0.6)" : "rgba(34, 211, 238, 0.6)")
        gradient.addColorStop(1, i % 2 === 0 ? "rgba(34, 211, 238, 0.6)" : "rgba(168, 85, 247, 0.6)")

        ctx.beginPath()
        ctx.moveTo(start.x, start.y)

        // Calculate how much of the line to draw based on progress
        const currentProgress = Math.min(1, Math.max(0, progress * 5 - i))
        if (currentProgress > 0) {
          const endX = start.x + (end.x - start.x) * currentProgress
          const endY = start.y + (end.y - start.y) * currentProgress

          ctx.lineTo(endX, endY)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      // Draw constellation points
      points.forEach((point, index) => {
        if (index < progress * 5) {
          ctx.beginPath()
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = index % 2 === 0 ? "rgba(168, 85, 247, 0.8)" : "rgba(34, 211, 238, 0.8)"
          ctx.fill()

          // Add glow effect
          ctx.beginPath()
          ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(point.x, point.y, 3, point.x, point.y, 6)
          gradient.addColorStop(0, index % 2 === 0 ? "rgba(168, 85, 247, 0.5)" : "rgba(34, 211, 238, 0.5)")
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Update progress
      if (progress < 1) {
        progress += 0.005
      } else {
        // When animation completes, add subtle pulsing effect
        const pulseFactor = Math.sin(Date.now() * 0.001) * 0.1 + 0.9
        ctx.globalAlpha = pulseFactor
      }

      animationFrameId = requestAnimationFrame(drawConstellation)
    }

    drawConstellation()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
