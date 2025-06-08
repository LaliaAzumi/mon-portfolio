"use client"

import { useEffect, useRef } from "react"

export default function PageTurn({ isOpen = false }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Define center point
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const size = Math.min(canvas.width, canvas.height) * 0.8

    // Animation variables
    let progress = 0
    const targetProgress = isOpen ? 1 : 0
    let animationFrameId: number

    // Draw book cover
    const drawBookCover = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw book cover
      ctx.save()

      // Apply perspective transform based on progress
      ctx.translate(centerX, centerY)
      ctx.rotate(progress * Math.PI * 0.05) // Slight rotation
      ctx.scale(1 - progress * 0.2, 1) // Squeeze horizontally
      ctx.translate(-centerX, -centerY)

      // Book cover
      ctx.beginPath()
      ctx.rect(centerX - size / 2, centerY - size / 2, size, size)

      // Create gradient for the cover
      const gradient = ctx.createLinearGradient(centerX - size / 2, centerY, centerX + size / 2, centerY)
      gradient.addColorStop(0, "#6A4423")
      gradient.addColorStop(0.5, "#8B5A2B")
      gradient.addColorStop(1, "#6A4423")

      ctx.fillStyle = gradient
      ctx.fill()

      // Book border
      ctx.strokeStyle = "#C17E3C"
      ctx.lineWidth = 10
      ctx.stroke()

      // Book title
      ctx.font = "bold 24px serif"
      ctx.fillStyle = "#E8D0A9"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("CODEX MECHANICA", centerX, centerY - 40)

      // Book decoration
      ctx.beginPath()
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2)
      ctx.strokeStyle = "#C17E3C"
      ctx.lineWidth = 3
      ctx.stroke()

      // Inner circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
      ctx.strokeStyle = "#E8D0A9"
      ctx.lineWidth = 2
      ctx.stroke()

      // Gear teeth
      const teethCount = 12
      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2
        const innerX = centerX + Math.cos(angle) * 50
        const innerY = centerY + Math.sin(angle) * 50
        const outerX = centerX + Math.cos(angle) * 65
        const outerY = centerY + Math.sin(angle) * 65

        ctx.beginPath()
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        ctx.strokeStyle = "#C17E3C"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Book author
      ctx.font = "italic 18px serif"
      ctx.fillStyle = "#E8D0A9"
      ctx.fillText("Marie Dupont", centerX, centerY + 80)

      ctx.restore()

      // Draw page turning effect
      if (progress > 0) {
        ctx.save()

        // Page curl effect
        ctx.beginPath()

        // Start from bottom left
        ctx.moveTo(centerX - size / 2, centerY + size / 2)

        // Curve to top left
        ctx.quadraticCurveTo(
          centerX - size / 2,
          centerY - size / 2 + progress * size,
          centerX + progress * size - size / 2,
          centerY - size / 2,
        )

        // Curve to bottom right
        ctx.quadraticCurveTo(
          centerX + progress * size * 2 - size / 2,
          centerY,
          centerX + progress * size - size / 2,
          centerY + size / 2,
        )

        // Close the path
        ctx.closePath()

        // Fill with gradient to simulate page
        const pageGradient = ctx.createLinearGradient(
          centerX - size / 2,
          centerY,
          centerX + progress * size - size / 2,
          centerY,
        )
        pageGradient.addColorStop(0, "#E8D0A9")
        pageGradient.addColorStop(0.8, "#D4C19C")
        pageGradient.addColorStop(1, "#C4B28F")

        ctx.fillStyle = pageGradient
        ctx.fill()

        // Add shadow to page curl
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
        ctx.shadowBlur = 20
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 5

        // Page edge
        ctx.beginPath()
        ctx.moveTo(centerX + progress * size - size / 2, centerY - size / 2)
        ctx.lineTo(centerX + progress * size - size / 2, centerY + size / 2)
        ctx.strokeStyle = "#C4B28F"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
      }

      // Update progress
      if (progress < targetProgress) {
        progress = Math.min(targetProgress, progress + 0.02)
      } else if (progress > targetProgress) {
        progress = Math.max(targetProgress, progress - 0.02)
      }

      if (progress !== targetProgress) {
        animationFrameId = requestAnimationFrame(drawBookCover)
      }
    }

    drawBookCover()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isOpen])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
