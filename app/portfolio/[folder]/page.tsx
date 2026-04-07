"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ArrowLeft, Loader2, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export default function PortfolioFolderPage({ params }: { params: Promise<{ folder: string }> }) {
  const { folder } = use(params)
  const decodedFolder = decodeURIComponent(folder)
  const folderPath = `Portfolio/${decodedFolder}`

  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        const response = await fetch(`/api/portfolio-images?folder=portfolio/${decodedFolder}`)

        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }

        const data = await response.json()
        setImages(data || [])
      } catch (err) {
        console.error("Error fetching images:", err)
        setError("Failed to load images. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [decodedFolder])

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious()
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "Escape") setSelectedIndex(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Button
              asChild
              variant="ghost"
              className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <Link href="/portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {decodedFolder}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {images.length > 0 && !loading && `${images.length} honest moments`}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Loading images...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24">
                <p className="text-destructive">{error}</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link href="/portfolio">Return to Portfolio</Link>
                </Button>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No images found yet—this story is still being told</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link href="/portfolio">Return to Portfolio</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {images.map((image, index) => (
                  <button
                    key={image.public_id}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <Image
                      src={image.secure_url}
                      alt={`Photo ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
          <DialogContent 
            className="max-w-5xl border-none bg-transparent p-0 shadow-none"
            onKeyDown={handleKeyDown}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-0 z-10 rounded-full bg-card p-2 text-foreground hover:bg-card/80"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            
            {selectedIndex !== null && selectedIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground hover:bg-card"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            
            {selectedIndex !== null && selectedIndex < images.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground hover:bg-card"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {selectedIndex !== null && images[selectedIndex] && (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={images[selectedIndex].secure_url}
                  alt={`Photo ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            )}
            
            {selectedIndex !== null && (
              <div className="mt-4 text-center text-sm text-white/70">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
