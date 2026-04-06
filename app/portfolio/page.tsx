"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, ImageIcon } from "lucide-react"

interface PortfolioFolder {
  name: string
  path: string
}

interface CoverImage {
  secure_url: string
  width: number
  height: number
}

export default function PortfolioPage() {
  const [folders, setFolders] = useState<PortfolioFolder[]>([])
  const [coverImages, setCoverImages] = useState<Record<string, CoverImage>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFolders() {
      try {
        setLoading(true)
        const response = await fetch("/api/portfolio-folders")

        if (!response.ok) {
          throw new Error("Failed to fetch folders")
        }

        const data = await response.json()
        setFolders(data)

        // Fetch cover images for each folder
        const coverPromises = data.map(async (folder: PortfolioFolder) => {
          try {
            const coverResponse = await fetch(`/api/portfolio-images?folder=${folder.path}`)
            if (coverResponse.ok) {
              const images = await coverResponse.json()
              if (images.length > 0) {
                return { path: folder.path, image: images[0] }
              }
            }
          } catch (err) {
            console.error(`Error fetching cover for ${folder.path}:`, err)
          }
          return null
        })

        const covers = await Promise.all(coverPromises)
        const coverMap: Record<string, CoverImage> = {}
        covers.forEach(cover => {
          if (cover) {
            coverMap[cover.path] = cover.image
          }
        })
        setCoverImages(coverMap)
      } catch (err) {
        console.error("Error fetching folders:", err)
        setError("Failed to load portfolio. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFolders()
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
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Our Portfolio
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Explore our collection of memorable moments captured at weddings, parties, and pet events.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : folders.map((folder) => {
                    const coverImage = coverImages[folder.path]
                    const folderName = folder.path.split('/').pop() || folder.name

                    return (
                      <Card key={folder.path} className="group overflow-hidden transition-all hover:shadow-lg">
                        <CardContent className="p-0">
                          <Link href={`/portfolio/${encodeURIComponent(folderName)}`}>
                            <div className="aspect-square overflow-hidden bg-muted">
                              {coverImage ? (
                                <Image
                                  src={coverImage.secure_url}
                                  alt={folderName}
                                  width={coverImage.width}
                                  height={coverImage.height}
                                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center bg-muted">
                                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-lg capitalize">
                                {folderName.replace(/-/g, ' ')}
                              </h3>
                              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                                View Gallery
                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
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
