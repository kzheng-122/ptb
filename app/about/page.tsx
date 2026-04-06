"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Camera, Users, Award } from "lucide-react"

interface CloudinaryImage {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

const values = [
  {
    icon: Heart,
    title: "Pets Are Family",
    description:
      "We believe that pets are beloved family members who deserve to be part of every celebration and memory.",
  },
  {
    icon: Camera,
    title: "Candid Moments",
    description:
      "The best photos happen naturally. We create an environment where authentic joy shines through.",
  },
  {
    icon: Users,
    title: "Connection",
    description:
      "Our booth brings people together, creating shared experiences and lasting memories.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "From our equipment to our prints, we never compromise on delivering the best for our clients.",
  },
]

export default function AboutPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/about-images")
        if (response.ok) {
          const data = await response.json()
          setImages(data)
        }
      } catch (err) {
        console.error("Error fetching about images:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  const displayImage = images.length > 0 ? images[0] : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                About Pawtobooth
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Where passion for pets meets the art of photography
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : displayImage ? (
                  <Image
                    src={`${displayImage.secure_url}?f=auto&q=auto`}
                    alt="Pawtobooth team"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No image available</p>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Our Story
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Pawtobooth was born from a simple observation at a friend&apos;s wedding: 
                    while everyone was having fun at the photo booth, the family dog was 
                    left out of all the photos.
                  </p>
                  <p>
                    That moment sparked an idea. What if we could create a photo booth 
                    experience designed specifically for pets and their humans? A place 
                    where wagging tails and genuine smiles could be captured together.
                  </p>
                  <p>
                    Today, Pawtobooth has become a beloved part of hundreds of weddings, 
                    birthday parties, corporate events, and celebrations. Our team of 
                    passionate pet lovers and photographers work together to create 
                    magical moments that families treasure forever.
                  </p>
                  <p>
                    Every event is unique, and we bring the same enthusiasm and care 
                    whether we&apos;re photographing a Great Dane or a hamster. Because 
                    at the end of the day, it&apos;s all about celebrating the love 
                    between pets and their people.
                  </p>
                </div>
                <Button asChild className="mt-8 rounded-full" size="lg">
                  <Link href="/enquiry">Work With Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Philosophy
              </h2>
              <p className="mt-4 text-muted-foreground">
                The values that guide everything we do
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
