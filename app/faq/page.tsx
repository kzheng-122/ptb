import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Answers to common questions about our photo booth services
              </p>
            </div>
          </div>
        </section>
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is included in the packages?</AccordionTrigger>
                <AccordionContent>
                  Each package includes a set duration of photo booth service, unlimited shots, instant prints, and digital copies. Higher-tier packages include premium props, multiple backdrops, and custom print designs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you provide staff during the event?</AccordionTrigger>
                <AccordionContent>
                  Yes, our team will set up, operate the booth, and assist guests. Some packages include a dedicated pet handler.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can we customize the print designs?</AccordionTrigger>
                <AccordionContent>
                  Yes, custom print design is available as an add-on and included in select packages.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do we book?</AccordionTrigger>
                <AccordionContent>
                  Submit an enquiry through our form and we’ll confirm availability and details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
