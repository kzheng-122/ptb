"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"

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

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const [loading, setLoading] = useState(true)
  

  // Fetch folders
  useEffect(() => {
    async function fetchFolders() {
      const res = await fetch("/api/portfolio-folders")
      const data = await res.json()

      setFolders(data)
      if (data.length > 0) setActiveFolder(data[0].path)

      setLoading(false)
    }
    fetchFolders()
  }, [])

  // Fetch subfolders
  useEffect(() => {
    if (!activeFolder) return

    async function fetchSubfolders() {
      const res = await fetch(`/api/portfolio-subfolders?folder=${activeFolder}`)
      const data = await res.json()

      setSubfolders(prev => ({
        ...prev,
        [activeFolder!]: data,
      }))

      data.forEach(async (sub: PortfolioSubfolder) => {
        if (coverImages[sub.path]) return

        const imgRes = await fetch(`/api/portfolio-images?folder=${sub.path}`)
        const imgData = await imgRes.json()

        if (imgData.length > 0) {
          const cover =
            imgData.find((img: any) =>
              (img.public_id || "").toLowerCase().includes("_cover")
            ) || imgData[0]

          setCoverImages(prev => ({
            ...prev,
            [sub.path]: cover,
          }))
        }
      })
    }

    fetchSubfolders()
  }, [activeFolder])

  // Fetch images
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
        <section className="bg-secondary/30 py-8 lg:py-10">
          <div className="mx-auto max-w-7xl px-4">

            {/* Title */}
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold">Stories We've Captured</h1>
              <p className="mt-3 text-muted-foreground">
                Honest, joyful collections shaped around each pet.
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-4">
              {loading ? (
                <Skeleton className="h-10 w-48" />
              ) : (
                <Tabs value={activeFolder || undefined} onValueChange={(val) => {
                  setActiveFolder(val)
                  setActiveSubfolder(null)
                }}>
                  <TabsList className="mx-auto flex w-fit justify-center mb-6">
                    {folders.map(folder => {
                      const name = folder.path.split("/").pop()
                      return (
                        <TabsTrigger key={folder.path} value={folder.path}>
                          {name?.replace(/[-_]/g, " ")}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>

                  {folders.map(folder => {
                    const folderSubfolders = subfolders[folder.path] || []

                    return (
                      <TabsContent key={folder.path} value={folder.path} className="mt-3">

                        {/* Subfolder view */}
                        {activeSubfolder ? (
                          <div>
                            <button
                              onClick={() => setActiveSubfolder(null)}
                              className="mb-4 text-sm text-muted-foreground hover:underline"
                            >
                              ← Back
                            </button>

                            {/* 🔥 Masonry layout */}
                            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 max-w-6xl mx-auto">
                              {(images[activeSubfolder] || []).map((img, i) => (
                                <div
                                  key={i}
                                  onClick={() => setLightboxIndex(i)}
                                  className="mb-2 break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                                >
                                  <Image
                                    src={`${img.secure_url}?f=auto&q=auto&w=800`}
                                    alt=""
                                    width={800}
                                    height={1000}
                                    className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* Subfolder covers */
                          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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

                                    {cover ? (
                                      <Image
                                        src={`${cover.secure_url}?f=auto&q=auto&w=600`}
                                        alt=""
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                      />
                                    ) : (
                                      <div className="flex items-center justify-center h-full">
                                        <ImageIcon className="opacity-40" />
                                      </div>
                                    )}

                                    {/* Hover */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                      {/*<p className="font-serif text-white text-center text-sm px-4">
                                        <span className="font-semibold capitalize">
                                          {name?.replace(/[-_]/g, " ")}
                                        </span>
                                      </p>*/}
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

        {/* 🔥 Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && activeSubfolder && (
            <Lightbox
              images={images[activeSubfolder] || []}
              index={lightboxIndex}
              setIndex={setLightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  )
}

function Lightbox({ images, index, setIndex, onClose }: any) {
  const paginate = (dir: number) => {
    setIndex((prev: number) => {
      const next = prev + dir
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") paginate(1)
      if (e.key === "ArrowLeft") paginate(-1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          key={index}
          src={`${images[index].secure_url}?f=auto&q=auto&w=1600`}
          className="w-full max-h-[85vh] object-contain rounded-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) => {
            if (offset.x > 100) paginate(-1)
            if (offset.x < -100) paginate(1)
          }}
        />

        <button onClick={() => paginate(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 text-black text-3xl">‹</button>
        <button onClick={() => paginate(1)} className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-3xl">›</button>
        <button onClick={onClose} className="absolute top-4 right-4 text-black text-2xl">✕</button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-black text-sm opacity-70">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  )
}