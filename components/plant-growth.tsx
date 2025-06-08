"use client"

import { useEffect, useRef } from "react"

export default function PlantGrowth() {
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
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10

    // Define vine points (relative to canvas size)
    const vines = [
      {
        points: [
          { x: centerX, y: centerY - radius * 0.2 },
          { x: centerX + radius * 0.3, y: centerY - radius * 0.5 },
          { x: centerX + radius * 0.7, y: centerY - radius * 0.6 },
          { x: centerX + radius * 0.9, y: centerY - radius * 0.3 },
        ],
        color: "#7A9E7E",
        leaves: [
          { x: centerX + radius * 0.5, y: centerY - radius * 0.55, size: 15, rotation: Math.PI / 4 },
          { x: centerX + radius * 0.8, y: centerY - radius * 0.45, size: 12, rotation: Math.PI / 6 },
        ],
        flowers: [{ x: centerX + radius * 0.9, y: centerY - radius * 0.3, size: 10, color: "#E8D0D9" }],
      },
      {
        points: [
          { x: centerX, y: centerY + radius * 0.2 },
          { x: centerX + radius * 0.4, y: centerY + radius * 0.4 },
          { x: centerX + radius * 0.8, y: centerY + radius * 0.5 },
          { x: centerX + radius * 0.9, y: centerY + radius * 0.2 },
        ],
        color: "#7A9E7E",
        leaves: [
          { x: centerX + radius * 0.6, y: centerY + radius * 0.45, size: 18, rotation: -Math.PI / 5 },
          { x: centerX + radius * 0.85, y: centerY + radius * 0.35, size: 14, rotation: -Math.PI / 8 },
        ],
        flowers: [{ x: centerX + radius * 0.9, y: centerY + radius * 0.2, size: 12, color: "#9D6A89" }],
      },
      {
        points: [
          { x: centerX, y: centerY - radius * 0.2 },
          { x: centerX - radius * 0.3, y: centerY - radius * 0.4 },
          { x: centerX - radius * 0.7, y: centerY - radius * 0.5 },
          { x: centerX - radius * 0.9, y: centerY - radius * 0.2 },
        ],
        color: "#7A9E7E",
        leaves: [
          { x: centerX - radius * 0.5, y: centerY - radius * 0.45, size: 16, rotation: -Math.PI / 3 },
          { x: centerX - radius * 0.8, y: centerY - radius * 0.35, size: 13, rotation: -Math.PI / 4 },
        ],
        flowers: [{ x: centerX - radius * 0.9, y: centerY - radius * 0.2, size: 11, color: "#E8D0D9" }],
      },
      {
        points: [
          { x: centerX, y: centerY + radius * 0.2 },
          { x: centerX - radius * 0.4, y: centerY + radius * 0.5 },
          { x: centerX - radius * 0.7, y: centerY + radius * 0.6 },
          { x: centerX - radius * 0.9, y: centerY + radius * 0.3 },
        ],
        color: "#7A9E7E",
        leaves: [
          { x: centerX - radius * 0.55, y: centerY + radius * 0.55, size: 17, rotation: Math.PI / 3 },
          { x: centerX - radius * 0.8, y: centerY + radius * 0.45, size: 15, rotation: Math.PI / 5 },
        ],
        flowers: [{ x: centerX - radius * 0.9, y: centerY + radius * 0.3, size: 13, color: "#9D6A89" }],
      },
    ]

    // Animation variables
    let progress = 0
    let animationFrameId: number

    // Draw a leaf
    const drawLeaf = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Draw leaf shape
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(size / 2, -size, size, -size / 2, size, 0)
      ctx.bezierCurveTo(size, size / 2, size / 2, size, 0, 0)
      ctx.fillStyle = color
      ctx.fill()

      // Draw leaf vein
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(size * 0.8, 0)
      ctx.strokeStyle = `${color}80`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.restore()
    }

    // Draw a flower
    const drawFlower = (x: number, y: number, size: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)

      // Draw petals
      for (let i = 0; i < 5; i++) {
        ctx.save()
        ctx.rotate(((Math.PI * 2) / 5) * i)
        ctx.beginPath()
        ctx.ellipse(size, 0, size, size / 2, 0, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.restore()
      }

      // Draw center
      ctx.beginPath()
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
      ctx.fillStyle = "#9D6A8980"
      ctx.fill()

      ctx.restore()
    }

    const drawVines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw each vine
      vines.forEach((vine, vineIndex) => {
        // Calculate how much of the vine to draw based on progress
        const vineProgress = Math.min(1, Math.max(0, progress * 4 - vineIndex))

        if (vineProgress > 0) {
          // Draw the vine
          ctx.beginPath()
          ctx.moveTo(vine.points[0].x, vine.points[0].y)

          for (let i = 1; i < vine.points.length; i++) {
            const prevPoint = vine.points[i - 1]
            const currentPoint = vine.points[i]

            // Calculate how much of this segment to draw
            const segmentProgress = Math.min(1, Math.max(0, vineProgress * 4 - (i - 1)))
            if (segmentProgress > 0) {
              const endX = prevPoint.x + (currentPoint.x - prevPoint.x) * segmentProgress
              const endY = prevPoint.y + (currentPoint.y - prevPoint.y) * segmentProgress

              // Use quadratic curves for more natural vine look
              const controlX = (prevPoint.x + currentPoint.x) / 2
              const controlY = (prevPoint.y + currentPoint.y) / 2 + Math.sin(i) * 20

              ctx.quadraticCurveTo(controlX, controlY, endX, endY)
            }
          }

          ctx.strokeStyle = vine.color
          ctx.lineWidth = 3
          ctx.stroke()

          // Draw leaves
          vine.leaves.forEach((leaf, leafIndex) => {
            const leafProgress = Math.min(1, Math.max(0, vineProgress * 3 - leafIndex * 0.5))
            if (leafProgress > 0) {
              const size = leaf.size * leafProgress
              drawLeaf(leaf.x, leaf.y, size, leaf.rotation, vine.color)
            }
          })

          // Draw flowers
          vine.flowers.forEach((flower, flowerIndex) => {
            const flowerProgress = Math.min(1, Math.max(0, vineProgress * 2 - 0.8))
            if (flowerProgress > 0) {
              const size = flower.size * flowerProgress
              drawFlower(flower.x, flower.y, size, flower.color)
            }
          })
        }
      })

      // Update progress
      if (progress < 1) {
        progress += 0.005
      } else {
        // When animation completes, add subtle swaying effect
        vines.forEach((vine) => {
          vine.leaves.forEach((leaf) => {
            leaf.rotation += Math.sin(Date.now() * 0.001) * 0.01
          })
        })
      }

      animationFrameId = requestAnimationFrame(drawVines)
    }

    drawVines()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
