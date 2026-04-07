"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface PortfolioFolder {
  name: string
  path: string
}

export default function PortfolioPage() {
  const [folders, setFolders] = useState<PortfolioFolder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFolder, setActiveFolder] = useState<string | null>(null)
  const [images, setImages] = useState<Record<string, any[]>>({})

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
        if (data.length > 0) {
          const first = data[0].path
          setActiveFolder(first)
        }
      } catch (err) {
        console.error("Error fetching folders:", err)
        setError("Failed to load portfolio. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFolders()
  }, [])

  useEffect(() => {
    async function fetchImages() {
      if (!activeFolder) return
      try {
        const response = await fetch(`/api/portfolio-images?folder=${activeFolder}`)
        if (!response.ok) {
          throw new Error("Failed to fetch images")
        }
        const data = await response.json()
        setImages(prev => ({ ...prev, [activeFolder]: data || [] }))
      } catch (err) {
        console.error("Error fetching images:", err)
      }
    }
    fetchImages()
  }, [activeFolder])

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

            <div className="mt-16">
              {loading ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <Skeleton className="aspect-square w-full" />
                        <div className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Tabs value={activeFolder || undefined} onValueChange={setActiveFolder}>
                  <TabsList>
                    {folders.map((folder) => {
                      const folderName = folder.path.split('/').pop() || folder.name
                      return (
                        <TabsTrigger key={folder.path} value={folder.path}>
                          {folderName.replace(/-/g, ' ')}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>
                  {folders.map((folder) => {
                    const folderImages = images[folder.path] || []
                    return (
                      <TabsContent key={folder.path} value={folder.path} className="mt-6">
                        {folderImages.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-24">
                            <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                            <p className="mt-4 text-muted-foreground">No images found in this album</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {folderImages.map((image, index) => (
                              <div
                                key={`${folder.path}-${index}`}
                                className="group relative aspect-square overflow-hidden rounded-2xl bg-muted"
                              >
                                <Image
                                  src={image.secure_url}
                                  alt={`Photo ${index + 1}`}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    )
                  })}
                </Tabs>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
