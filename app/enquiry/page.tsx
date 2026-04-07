"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react"

const eventTypes = [
  "Wedding",
  "Pet Birthday Party",
  "Corporate Event",
  "Private Party",
  "Other",
]

const hoursOptions = ["2 Hours", "3 Hours", "4 Hours", "5+ Hours"]

export default function EnquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    location: "",
    hoursNeeded: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
              Thank You!
            </h1>
            <p className="mt-4 text-muted-foreground">
              We've received your enquiry and will get back to you within 24 hours.
              We can't wait to help make your event pawsome!
            </p>
            <Button
              className="mt-8 rounded-full"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Enquiry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get in Touch
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Tell us about your event and we'll create something magical together
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({ ...formData, eventDate: e.target.value })
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select
                        value={formData.eventType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, eventType: value })
                        }
                        required
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hoursNeeded">Hours Needed *</Label>
                      <Select
                        value={formData.hoursNeeded}
                        onValueChange={(value) =>
                          setFormData({ ...formData, hoursNeeded: value })
                        }
                        required
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          {hoursOptions.map((hours) => (
                            <SelectItem key={hours} value={hours}>
                              {hours}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Event Location *</Label>
                    <Input
                      id="location"
                      required
                      placeholder="Venue name and address"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your event, your pets, or any special requests..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Enquiry"
                    )}
                  </Button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="rounded-2xl bg-card p-6 shadow-sm">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Contact Information
                  </h3>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Email</p>
                        <p className="text-sm text-muted-foreground">
                          hello@pawtobooth.com
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          (555) 123-4567
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Service Area
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Greater Los Angeles Area
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-primary/10 p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    What Happens Next?
                  </h3>
                  <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        1
                      </span>
                      We'll review your enquiry within 24 hours
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        2
                      </span>
                      Our team will reach out to discuss details
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        3
                      </span>
                      We'll create a custom quote for your event
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
