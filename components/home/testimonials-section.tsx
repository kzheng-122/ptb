import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "We would wholeheartedly recommend Zhi Heng for your photoshoots; he is telented and gifted in his craft. As a bonus, he also has a lovely and friendly personality. Being young works in his favous - he is energetic, zealous and honest in his work. He over-delivered and his passion for photography shone through in the photos he captured for us.",
    author: "D x C",
    role: "Pet Pawty",
    rating: 5,
  },
  {
    id: 2,
    content:
      "We're here again with Zhiheng for Gi's Gotchda Day photoshoot. His engagement in the shoot was necessary and on point as he will give us tips and tell us what to do to achieve the photos that we are looking for. And without a doubt, he had delivered us with a whole set of beatifully taken photos of our baby gi. We're very thankful to have met you and see you again for Gi's 2nd Birthday!",
    author: "S",
    role: "Pet Photoshoot & Pawty",
    rating: 5,
  },
  {
    id: 3,
    content:
      "The photographer was super patient and captured my furkid's personality perfectly. 10/10!! Can't wait for the next shoot for her 1st barkday pawty!!",
    author: "G",
    role: "Pet Photoshoot & Party",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-8 lg:py-10">
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
              
              <div className="mt-6 border-t border-border pt-3">
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
