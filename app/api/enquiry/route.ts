import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { name, email, phone, eventDate, eventType, location, hoursNeeded, message } = body

    // Validate required fields
    if (!name || !email || !eventDate || !eventType || !location || !hoursNeeded) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Send email via Resend if configured
    if (resend && process.env.EMAIL_TO) {
      const emailContent = `
New Pawtobooth Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Event Date: ${eventDate}
Event Type: ${eventType}
Location: ${location}
Hours Needed: ${hoursNeeded}
Message: ${message || 'No message'}
      `.trim()

      try {
        await resend.emails.send({
          from: 'Pawtobooth <noreply@pawtobooth.com>', // Update with your verified domain
          to: process.env.EMAIL_TO,
          subject: `New Pawtobooth Enquiry – ${name}`,
          text: emailContent,
        })
      } catch (emailError) {
        console.error("Error sending email:", emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Enquiry submitted successfully" 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing enquiry:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
