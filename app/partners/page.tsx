"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/skeleton"

interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export default function PartnersPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPartners() {
      try {
        setLoading(true)
        const response = await fetch("/api/partners")

        if (!response.ok) {
          throw new Error("Failed to fetch partners")
        }

        const data = await response.json()
        setImages(data)
      } catch (err) {
        console.error("Error fetching partners:", err)
        setError("Failed to load partners. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Our Partners
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Trusted partners who help make every event special
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Skeleton className="aspect-square w-full max-w-[200px] rounded-2xl" />
                      <Skeleton className="mt-4 h-4 w-3/4" />
                    </div>
                  ))
                : images.map((image) => {
                    const filename = image.public_id.split('/').pop() || 'Partner'
                    const name = filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '')

                    return (
                      <div key={image.public_id} className="flex flex-col items-center text-center">
                        <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl bg-muted">
                          <Image
                            src={`${image.secure_url}?f=auto&q=auto`}
                            alt={name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="mt-4 font-semibold text-lg capitalize">
                          {name}
                        </h3>
                      </div>
                    )
                  })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
