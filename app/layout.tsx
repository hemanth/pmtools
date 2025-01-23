import "./globals.css"
import { Inter, Outfit } from 'next/font/google'
import { cn } from "@/lib/utils"
import type { Metadata } from 'next'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: "Product Manager AI Assistant",
  description: "Generate PRDs, Epics, and User Stories using AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        inter.variable, 
        outfit.variable,
        "font-sans"
      )}>
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto py-4">
              <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
                PM Tools
              </h1>
            </div>
          </header>
          <main className="flex-1 py-8">{children}</main>
          <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto py-6">
              <p className="text-center">
                Built with ❤️ h3manth.com
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

