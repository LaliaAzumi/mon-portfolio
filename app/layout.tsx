import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Porfolio - Iavo Lalia",
  description: "Le grimoire du code de Iavo Lalia",
    generator: 'lalia'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geist.className} font-sans`}>
        <ThemeProvider defaultTheme="light" storageKey="codex-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
