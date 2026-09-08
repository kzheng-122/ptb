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
      "They’re comfort, companionship, and the heart of a home.",
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
      "Bringing people together, creating shared experiences and lasting memories.",
  },
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never compromise on delivering the best for our clients.",
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
        <section className="bg-secondary/30 py-8 lg:py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                Our story
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Where pets are family, and every story is told with honesty
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : displayImage ? (
                  <Image
                    src={`${displayImage.secure_url}?f=auto&q=auto`}
                    alt="Meet the team"
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
                  How We Started
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    What started as a simple idea between a freelance photographer and a supportive partner slowly grew into something much more meaningful.
                  </p>
                  <p>
                    One day, we thought "what if we didn’t just capture moments, but brought the experience to people?"
                    And so, we began offering on-site shoots, creating little pockets of joy wherever we go — from cozy homes to lively celebrations.
                  </p>
                  <p>
                    At the heart of it, we’re just two people who love documenting honest, unfiltered moments between pets and the people who love them most.
                  </p>
                  <p>                  
                    Because to us, this isn’t just photography.
                  </p>
                </div>
                <br/>
                <br/>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Our Belives
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In every owner’s eyes, their pet plays a much bigger role than the world often sees.
                  </p>
                  <p> 
                    They’re family.<br/>
                    They’re comfort after a long day.<br/>
                    They’re the little personality that fills a home with life.
                  </p>
                  <p> 
                    And that belief shapes everything we do.<br/>
                    We don’t just photograph how your pet looks — we capture how they’re seen.
                  </p>
                  <p> 
                    The tiny quirks.<br/>
                    The quiet moments.<br/>
                    The joy, the chaos, the love.
                  </p>
                  <p> 
                    The kind of memories that feel ordinary now, but mean everything later.
                  </p>
                </div>
                <Button asChild className="mt-8 rounded-full" size="lg">
                  <Link href="/enquiry">Enquire Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What We Believe
              </h2>
              <p className="mt-4 text-muted-foreground">
                We don’t just photograph how your pet looks — we capture how they’re seen.
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
