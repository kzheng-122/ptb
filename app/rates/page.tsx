import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Check, Star, Clock, Camera, Printer, Sparkles } from "lucide-react"

const packages = [
  {
    id: 1,
    name: "Paw-ty Starter",
    duration: "2 Hours",
    price: 599,
    description: "Perfect for intimate gatherings and small events",
    features: [
      "2 hours of photo booth fun",
      "Unlimited shots",
      "Instant 4x6 prints",
      "Digital copies included",
      "Basic prop collection",
      "1 backdrop choice",
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: "Furever Classic",
    duration: "3 Hours",
    price: 849,
    description: "Our most popular package for weddings and celebrations",
    features: [
      "3 hours of photo booth fun",
      "Unlimited shots",
      "Instant 4x6 prints",
      "Digital copies included",
      "Premium prop collection",
      "2 backdrop choices",
      "Custom print design",
      "Pet treats station",
    ],
    isPopular: true,
  },
  {
    id: 3,
    name: "Ultimate Pawsome",
    duration: "4 Hours",
    price: 1199,
    description: "The complete experience for grand celebrations",
    features: [
      "4 hours of photo booth fun",
      "Unlimited shots",
      "Instant 4x6 prints",
      "Digital copies included",
      "Deluxe prop collection",
      "3 backdrop choices",
      "Custom print design",
      "Pet treats station",
      "Social media station",
      "Guest book album",
      "Dedicated pet handler",
    ],
    isPopular: false,
  },
]

const addOns = [
  {
    name: "Extra Hour",
    price: 199,
    icon: Clock,
  },
  {
    name: "Additional Backdrop",
    price: 75,
    icon: Camera,
  },
  {
    name: "Custom Print Design",
    price: 150,
    icon: Printer,
  },
  {
    name: "Premium Props Package",
    price: 100,
    icon: Sparkles,
  },
]

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Packages Made For Real Moments
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose what feels right for your family and your pet's personality
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl border-2 p-8 ${
                    pkg.isPopular
                      ? "border-primary bg-card shadow-lg"
                      : "border-border bg-card"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                        <Star className="h-4 w-4 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      {pkg.name}
                    </h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {pkg.duration}
                    </div>
                    <div className="mt-4">
                      <span className="font-serif text-4xl font-bold text-foreground">
                        ${pkg.price}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {pkg.description}
                    </p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`mt-8 w-full rounded-full ${
                      pkg.isPopular ? "" : "variant-outline"
                    }`}
                    variant={pkg.isPopular ? "default" : "outline"}
                  >
                    <Link href="/enquiry">Choose {pkg.name}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                    Thoughtful Add-Ons
              </h2>
              <p className="mt-4 text-muted-foreground">
                    Personal touches to make your story uniquely yours
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
              {addOns.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center gap-4 rounded-2xl bg-card p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <addon.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{addon.name}</h3>
                    <p className="text-sm text-muted-foreground">+${addon.price}</p>
                  </div>
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
