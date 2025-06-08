"use client"

import { useEffect, useRef } from "react"

export default function GardenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Create paper texture
    const createPaperTexture = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      // Base color: light beige (#F8F5F0)
      const baseR = 248
      const baseG = 245
      const baseB = 240

      for (let i = 0; i < data.length; i += 4) {
        // Add slight noise to create texture
        const noise = Math.random() * 10 - 5

        data[i] = Math.min(255, Math.max(0, baseR + noise)) // R
        data[i + 1] = Math.min(255, Math.max(0, baseG + noise)) // G
        data[i + 2] = Math.min(255, Math.max(0, baseB + noise)) // B
        data[i + 3] = 255 // A

        // Occasionally add small specks for texture
        if (Math.random() < 0.01) {
          data[i] = Math.min(255, baseR - 15)
          data[i + 1] = Math.min(255, baseG - 15)
          data[i + 2] = Math.min(255, baseB - 15)
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Draw subtle leaf patterns
    const drawLeafPatterns = () => {
      // Set a semi-transparent fill for the patterns
      ctx.globalAlpha = 0.03

      // Draw scattered leaf shapes
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 100 + 50
        const rotation = Math.random() * Math.PI * 2

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        // Draw a simple leaf shape
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(size / 3, -size / 3, size / 2, -size / 2, size, 0)
        ctx.bezierCurveTo(size / 2, size / 2, size / 3, size / 3, 0, 0)

        // Alternate between green and pink for the patterns
        if (Math.random() < 0.7) {
          ctx.fillStyle = "#7A9E7E" // Green
        } else {
          ctx.fillStyle = "#9D6A89" // Pink
        }

        ctx.fill()
        ctx.restore()
      }

      // Reset global alpha
      ctx.globalAlpha = 1
    }

    // Create the background
    createPaperTexture()
    drawLeafPatterns()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#F8F5F0" }}
    />
  )
}
