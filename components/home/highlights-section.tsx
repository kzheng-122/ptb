import { Heart, Printer, Palette, PartyPopper } from "lucide-react"

const highlights = [
  {
    icon: Heart,
    title: "Pet-Friendly Setup",
    description:
      "Our booth is designed with pets in mind. Comfortable, safe, and equipped with treats to capture their best moments.",
  },
  {
    icon: Printer,
    title: "Instant Prints",
    description:
      "Take home beautiful, high-quality prints immediately. Share the memories with your guests on the spot.",
  },
  {
    icon: Palette,
    title: "Custom Backdrops",
    description:
      "Choose from our collection or bring your own theme. We create stunning backdrops that match your event perfectly.",
  },
  {
    icon: PartyPopper,
    title: "All Events Welcome",
    description:
      "From intimate weddings to corporate gatherings, pet birthdays to family reunions, we bring the fun everywhere.",
  },
]

export function HighlightsSection() {
  return (
    <section className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Pawtobooth?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We bring the perfect blend of professionalism and playfulness
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
