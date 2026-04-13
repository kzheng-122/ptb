"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface PortfolioFolder {
  name: string
  path: string
}

interface PortfolioSubfolder {
  name: string
  path: string
}

export default function PortfolioPage() {
  const [folders, setFolders] = useState<PortfolioFolder[]>([])
  const [subfolders, setSubfolders] = useState<Record<string, PortfolioSubfolder[]>>({})
  const [coverImages, setCoverImages] = useState<Record<string, any>>({})
  const [images, setImages] = useState<Record<string, any[]>>({})

  const [activeFolder, setActiveFolder] = useState<string | null>(null)
  const [activeSubfolder, setActiveSubfolder] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)

  // 🔹 Fetch folders
  useEffect(() => {
    async function fetchFolders() {
      const res = await fetch("/api/portfolio-folders")
      const data = await res.json()

      setFolders(data)
      if (data.length > 0) {
        setActiveFolder(data[0].path)
      }
      setLoading(false)
    }

    fetchFolders()
  }, [])

  // 🔹 Fetch subfolders
  useEffect(() => {
    if (!activeFolder) return

    async function fetchSubfolders() {
      const res = await fetch(`/api/portfolio-subfolders?folder=${activeFolder}`)
      const data = await res.json()

      setSubfolders(prev => ({
        ...prev,
        [activeFolder!]: data,
      }))

      // fetch cover image for each subfolder
      data.forEach(async (sub: PortfolioSubfolder) => {

        if (coverImages[sub.path]) return

        const imgRes = await fetch(`/api/portfolio-images?folder=${sub.path}`)
        const imgData = await imgRes.json()

        console.log(imgData.map((img: any) => img.public_id))

        if (imgData.length > 0) {
          const coverImage =
            imgData.find((img: any) => {
              const publicId = img.public_id || ""
              const fileName = publicId.split("/").pop()?.toLowerCase() || ""

              return (
                fileName.includes("_cover")          // fallback
              )
            }) || imgData[0]

          setCoverImages(prev => ({
            ...prev,
            [sub.path]: coverImage,
          }))
        }
      })
    }
    fetchSubfolders()
  }, [activeFolder])

  // 🔹 Fetch full images when subfolder clicked
  useEffect(() => {
    if (!activeSubfolder) return

    async function fetchImages() {
      const res = await fetch(`/api/portfolio-images?folder=${activeSubfolder}`)
      const data = await res.json()

      setImages(prev => ({
        ...prev,
        [activeSubfolder!]: data,
      }))
    }

    fetchImages()
  }, [activeSubfolder])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-4">

            {/* 🔹 Title */}
            <div className="text-center">
              <h1 className="text-4xl font-bold">Stories We've Captured</h1>
              <p className="mt-4 text-muted-foreground">
                Honest, joyful collections shaped around each pet.
              </p>
            </div>

            {/* 🔹 Folder Tabs */}
            <div className="mt-12">
              {loading ? (
                <Skeleton className="h-10 w-48" />
              ) : (
                <Tabs value={activeFolder || undefined} onValueChange={(val) => {
                  setActiveFolder(val)
                  setActiveSubfolder(null)
                }}>
                  <TabsList>
                    {folders.map(folder => {
                      const name = folder.path.split("/").pop()
                      return (
                        <TabsTrigger key={folder.path} value={folder.path}>
                          {name?.replace(/-/g, " ")}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>

                  {/* 🔹 Content */}
                  {folders.map(folder => {
                    const folderSubfolders = subfolders[folder.path] || []

                    return (
                      <TabsContent key={folder.path} value={folder.path} className="mt-8">

                        {/* ✅ If viewing subfolder images */}
                        {activeSubfolder ? (
                          <div>
                            <button
                              onClick={() => setActiveSubfolder(null)}
                              className="mb-6 text-sm text-muted-foreground hover:underline"
                            >
                              ← Back
                            </button>

                            <div className="flex flex-wrap justify-center gap-1 max-w-6xl mx-auto">
                              {(images[activeSubfolder] || []).map((img, i) => (
                                <div key={i} className="group relative h-64 overflow-hidden bg-muted flex-shrink-0">
                                  <Image
                                    src={`${img.secure_url}?f=auto&q=auto`}
                                    alt=""
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className={`h-full w-auto transition-transform duration-500`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* ✅ Subfolder covers */
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {folderSubfolders.map(sub => {
                              const cover = coverImages[sub.path]
                              const name = sub.path.split("/").pop()

                              return (
                              <div
                                key={sub.path}
                                onClick={() => setActiveSubfolder(sub.path)}
                                className="cursor-pointer group"
                              >
                                <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">

                                  {/* Image */}
                                  {cover ? (
                                    <Image
                                      src={cover.secure_url}
                                      alt=""
                                      fill
                                      className="object-cover transition duration-500 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full">
                                      <ImageIcon className="opacity-40" />
                                    </div>
                                  )}

                                  {/* 🔥 Hover Overlay */}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                    <p className="text-white text-center text-sm md:text-base px-4">
                                      <span className="font-semibold capitalize">
                                        {name?.replace(/-/g, " ")}
                                      </span>
                                    </p>
                                  </div>

                                </div>
                              </div>
                              )
                            })}
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