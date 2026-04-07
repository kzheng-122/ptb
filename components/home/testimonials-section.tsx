import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "Pawtobooth made our wedding absolutely magical! Our dog Max was the star of the photo booth, and guests are still talking about those photos months later.",
    author: "Sarah & James",
    role: "Wedding Couple",
    rating: 5,
  },
  {
    id: 2,
    content:
      "The team was incredibly patient with all our cats. The photos turned out amazing and the instant prints were a hit with everyone at the party!",
    author: "Emily Chen",
    role: "Pet Birthday Party",
    rating: 5,
  },
  {
    id: 3,
    content:
      "We hired Pawtobooth for our company's pet-friendly day, and it was the highlight of the event. Professional, fun, and the quality was outstanding.",
    author: "Michael Torres",
    role: "Corporate Event Organizer",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stories From Pet Families
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Honest words from the homes and events we've been welcomed into
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl bg-card p-8 shadow-sm"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/10" />
              
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              
              <p className="mt-6 text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              <div className="mt-6 border-t border-border pt-6">
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
