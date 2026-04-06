"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, ImageIcon } from "lucide-react"

interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export function GallerySection() {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        const response = await fetch("/api/home-images")

        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }

        const data = await response.json()
        setImages(data.slice(0, 9)) // Limit to 9 images
      } catch (err) {
        console.error("Error fetching gallery images:", err)
        setError("Failed to load images. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (error) {
    return (
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Moments Worth Treasuring
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A glimpse into the joy we capture at every event
            </p>
          </div>
          <div className="mt-12 flex items-center justify-center min-h-[200px]">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Moments Worth Treasuring
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A glimpse into the joy we capture at every event
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))
            : images.map((image) => (
                <div
                  key={image.public_id}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-muted"
                  onMouseEnter={() => setHoveredId(image.public_id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Image
                    src={`${image.secure_url}?f=auto&q=auto`}
                    alt="Pawtobooth moment"
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      hoveredId === image.public_id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-foreground/20 transition-opacity duration-300 ${
                      hoveredId === image.public_id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
