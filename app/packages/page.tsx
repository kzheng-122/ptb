import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Check, Star, Clock, Camera, Printer, Sparkles } from "lucide-react"

const packages = [
  {
    id: 1,
    name: "The Photoshoot Experience",
//    duration: "--------",
    price: 300,
    description: "Designed to capture your pet's personality in its most authentic form",
    features: [
      "up to 1 hour session",
      "40 edited high-resolution images",
      "Guided, natural storytelling",
      "Personalized online gallery for viewing",
    ],
    isPopular: true,
  },
  {
    id: 2,
    name: (<span> The Pawty <br /> Experience </span>),
//    duration: "--------",
    price: 550,
    description: "For celebrations that deserve to be remembered beyond the moment",
    features: [
      "up to 2 hours coverage",
      "100 edited high-resolution images",
      "Documentary-style storytelling",
      "Personalized online gallery for viewing",
    ],
    isPopular: true,
  },
  {
    id: 3,
    name: "The complete Story (Bundle)",
//    duration: "Photoshoot + Pawty",
    price: 750,
    description: "The complete experience for grand celebrations",
    features: [
      "1x photoshoot experience (up to 1 hour)",
      "1x pawty experience (up to 2 hours)",
      "Complete narrative of your pet's story",
      "Personalized online gallery for viewing",
    ],
    isPopular: true,
  },
]

 const addOns = [
  {
    name: "Additional Time",
    price: "50 / 30 minutes",
    icon: Clock,
  },
  {
    name: "Additional Location",
    price: 75,
    icon: Camera,
  },
  {
    name: "Priority Editing",
    price: " (30% of total package price)",
    icon: Sparkles,
  },
  {
    name: "Portfolio Opt-Out",
    price: 100,
    icon: Printer,
  },
] 

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-8 lg:py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
                Our Packages
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the perfect package for your special event
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-10">
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
                  {/* {pkg.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                        <Star className="h-4 w-4 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )} */}

                  <div className="text-center">
                    <h3 className="font-Cormorant Garamond text-2xl font-bold text-foreground">
                      {pkg.name}
                    </h3>
                    {/* <div className="mt-2 text-sm text-muted-foreground">
                      {pkg.duration}
                    </div> */}
                    <div className="mt-4">
                      <span className="font-Cormorant Garamond text-4xl font-bold text-foreground">
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
                    <Link href="/enquiry">Enquire Now</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="bg-secondary/30 py-8 lg:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                Add-Ons
              </h2>
              <p className="mt-4 text-muted-foreground">
                Enhance your experience with these extras
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
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
