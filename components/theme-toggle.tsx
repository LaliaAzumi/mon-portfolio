"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isRotating, setIsRotating] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    setIsRotating(true)
    toggleTheme()
    setTimeout(() => setIsRotating(false), 1000)
  }

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={`relative overflow-hidden border-[#C17E3C]/50 hover:border-[#C17E3C] bg-transparent dark:text-[#E8D0A9] text-[#6A4423] hover:bg-[#C17E3C]/10 dark:hover:bg-[#C17E3C]/10 ${
        isRotating ? "animate-none" : ""
      }`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${
          isRotating ? (theme === "dark" ? "rotate-180" : "-rotate-180") : ""
        }`}
      >
        {/* Gear decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-2 border-current rounded-full opacity-20"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-3 bg-current opacity-20"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                transform: `rotate(${i * 45}deg) translate(-50%, -50%)`,
              }}
            ></div>
          ))}
        </div>

        {theme === "dark" ? (
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all" />
        ) : (
          <Moon className="h-5 w-5 rotate-0 scale-100 transition-all" />
        )}
      </div>
    </Button>
  )
}
