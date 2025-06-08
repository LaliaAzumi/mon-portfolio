"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, X } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { useState, useEffect } from "react"

interface NavbarProps {
  activeSection: string
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 
        ${
          scrolled
            ? "border-b py-2 backdrop-blur-lg dark:border-[#8B5A2B]/30 border-[#C17E3C]/30 dark:bg-[#2A2522]/90 bg-[#F5F1E8]/90"
            : "py-4 dark:bg-transparent bg-transparent"
        }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="font-serif text-xl dark:text-[#E8D0A9] text-[#6A4423] flex items-center relative z-10">
          <div className="relative">
            <BookOpen className="h-5 w-5 mr-2 dark:text-[#C17E3C] text-[#8B5A2B]" />
            {/* Decorative gear behind icon */}
            <div className="absolute -inset-1 dark:text-[#C17E3C]/20 text-[#8B5A2B]/20 animate-spin-slow pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-2 bg-current"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${i * 45}deg) translate(-50%, -50%)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <span className="font-bold tracking-wide relative">
            Iavo Lalia
            <span className="absolute -bottom-1 left-0 w-full h-0.5 dark:bg-[#C17E3C]/40 bg-[#8B5A2B]/40 rounded"></span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#home"
            className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] relative ${
              activeSection === "home"
                ? "dark:text-[#C17E3C] text-[#8B5A2B] font-serif"
                : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
            }`}
          >
            Couverture
            {activeSection === "home" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 dark:bg-[#C17E3C] bg-[#8B5A2B] rounded"></span>
            )}
          </Link>
          <Link
            href="#experience"
            className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] relative ${
              activeSection === "experience"
                ? "dark:text-[#C17E3C] text-[#8B5A2B] font-serif"
                : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
            }`}
          >
            Expériences
            {activeSection === "experience" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 dark:bg-[#C17E3C] bg-[#8B5A2B] rounded"></span>
            )}
          </Link>
          <Link
            href="#projects"
            className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] relative ${
              activeSection === "projects"
                ? "dark:text-[#C17E3C] text-[#8B5A2B] font-serif"
                : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
            }`}
          >
            Créations
            {activeSection === "projects" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 dark:bg-[#C17E3C] bg-[#8B5A2B] rounded"></span>
            )}
          </Link>
          <Link
            href="#skills"
            className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] relative ${
              activeSection === "skills"
                ? "dark:text-[#C17E3C] text-[#8B5A2B] font-serif"
                : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
            }`}
          >
            Compétences
            {activeSection === "skills" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 dark:bg-[#C17E3C] bg-[#8B5A2B] rounded"></span>
            )}
          </Link>
          <Link
            href="#education"
            className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] relative ${
              activeSection === "education"
                ? "dark:text-[#C17E3C] text-[#8B5A2B] font-serif"
                : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
            }`}
          >
            Chroniques
            {activeSection === "education" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 dark:bg-[#C17E3C] bg-[#8B5A2B] rounded"></span>
            )}
          </Link>
          <Link
            href="#contact"
            className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] relative ${
              activeSection === "contact"
                ? "dark:text-[#C17E3C] text-[#8B5A2B] font-serif"
                : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
            }`}
          >
            Contact
            {activeSection === "contact" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 dark:bg-[#C17E3C] bg-[#8B5A2B] rounded"></span>
            )}
          </Link>
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            asChild
            size="sm"
            className="hidden md:flex dark:bg-[#8B5A2B] dark:hover:bg-[#6A4423] bg-[#C17E3C] hover:bg-[#8B5A2B] dark:text-[#E8D0A9] text-[#F5F1E8] border-none font-serif relative overflow-hidden group"
          >
            <Link href="#contact">
              Contacter
              <span className="absolute inset-0 dark:bg-[url('/placeholder.svg?height=100&width=100')] bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-[#C17E3C]/50 hover:border-[#C17E3C] bg-transparent dark:text-[#E8D0A9] text-[#6A4423] hover:bg-[#C17E3C]/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full dark:bg-[#2A2522]/95 bg-[#F5F1E8]/95 backdrop-blur-md border-b dark:border-[#8B5A2B]/30 border-[#C17E3C]/30 py-4 z-50">
          <nav className="container flex flex-col space-y-4">
            <Link
              href="#home"
              className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] px-4 py-2 rounded-md ${
                activeSection === "home"
                  ? "dark:text-[#C17E3C] text-[#8B5A2B] dark:bg-[#8B5A2B]/10 bg-[#C17E3C]/10 font-serif"
                  : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Couverture
            </Link>
            <Link
              href="#experience"
              className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] px-4 py-2 rounded-md ${
                activeSection === "experience"
                  ? "dark:text-[#C17E3C] text-[#8B5A2B] dark:bg-[#8B5A2B]/10 bg-[#C17E3C]/10 font-serif"
                  : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Expériences
            </Link>
            <Link
              href="#projects"
              className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] px-4 py-2 rounded-md ${
                activeSection === "projects"
                  ? "dark:text-[#C17E3C] text-[#8B5A2B] dark:bg-[#8B5A2B]/10 bg-[#C17E3C]/10 font-serif"
                  : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Créations
            </Link>
            <Link
              href="#skills"
              className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] px-4 py-2 rounded-md ${
                activeSection === "skills"
                  ? "dark:text-[#C17E3C] text-[#8B5A2B] dark:bg-[#8B5A2B]/10 bg-[#C17E3C]/10 font-serif"
                  : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Compétences
            </Link>
            <Link
              href="#education"
              className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] px-4 py-2 rounded-md ${
                activeSection === "education"
                  ? "dark:text-[#C17E3C] text-[#8B5A2B] dark:bg-[#8B5A2B]/10 bg-[#C17E3C]/10 font-serif"
                  : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Chroniques
            </Link>
            <Link
              href="#contact"
              className={`text-sm font-medium transition-colors hover:dark:text-[#C17E3C] hover:text-[#8B5A2B] px-4 py-2 rounded-md ${
                activeSection === "contact"
                  ? "dark:text-[#C17E3C] text-[#8B5A2B] dark:bg-[#8B5A2B]/10 bg-[#C17E3C]/10 font-serif"
                  : "dark:text-[#E8D0A9]/70 text-[#6A4423]/70 font-serif"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              asChild
              className="dark:bg-[#8B5A2B] dark:hover:bg-[#6A4423] bg-[#C17E3C] hover:bg-[#8B5A2B] dark:text-[#E8D0A9] text-[#F5F1E8] border-none font-serif mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="#contact">Contacter</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
