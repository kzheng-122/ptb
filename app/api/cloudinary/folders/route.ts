import { NextResponse } from "next/server"

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const prefix = searchParams.get("prefix") || "Portfolio"

  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary credentials not configured" },
      { status: 500 }
    )
  }

  try {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders?prefix=${encodeURIComponent(prefix)}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("Cloudinary folders API error:", error)
      return NextResponse.json(
        { error: "Failed to fetch folders" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Cloudinary folders:", error)
    return NextResponse.json(
      { error: "Failed to fetch folders" },
      { status: 500 }
    )
  }
}
