import { Heart, Printer, Palette, PartyPopper } from "lucide-react"

const highlights = [
  {
    icon: Heart,
    title: "Pet-First Comfort",
    description:
      "A gentle, safe space where pets can be themselves. We follow their pace, celebrate their quirks, and earn their trust.",
  },
  {
    icon: Printer,
    title: "Prints You Can Hold",
    description:
      "High-quality prints that feel like keepsakes—made to be shared, framed, and cherished at home.",
  },
  {
    icon: Palette,
    title: "Backdrops That Feel Like Home",
    description:
      "Thoughtful setups that match your story and space. Familiar, welcoming, and tailored to your event.",
  },
  {
    icon: PartyPopper,
    title: "For Every Gathering",
    description:
      "From living-room birthdays to wedding receptions, we meet you where you are and make it special.",
  },
]

export function HighlightsSection() {
  return (
    <section className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Families Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Honest, warm, and crafted around your pet's personality
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="group rounded-2xl bg-card p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <highlight.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">
                {highlight.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
