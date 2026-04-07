import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/30 px-4 py-2 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            Real, Heartfelt Pet Stories
          </div>
          
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Every Pet Has a Story.</span>{" "}
            <span className="text-primary">We Capture It Honestly.</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            A warm, genuine photo experience made for pets and their people. No stiff poses—just real moments, true personalities, and memories that feel like home.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/enquiry">
                <Heart className="mr-2 h-4 w-4" />
                Start Your Story
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/portfolio">See Honest Moments</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { stat: "500+", label: "Families Welcomed" },
            { stat: "10K+", label: "Stories Shared" },
            { stat: "98%", label: "Pet Approved" },
            { stat: "5.0", label: "Rating" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-card p-6 text-center shadow-sm"
            >
              <div className="font-serif text-3xl font-bold text-primary">
                {item.stat}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
