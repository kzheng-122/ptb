import { NextResponse } from "next/server"

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get("folder")

  if (!folder) {
    return NextResponse.json(
      { error: "Folder parameter is required" },
      { status: 400 }
    )
  }

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary credentials not configured" },
      { status: 500 }
    )
  }

  try {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64")
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: `asset_folder:${folder}`,
          max_results: 100,
          sort_by: [{ created_at: "desc" }],
        }),
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("Cloudinary search API error:", error)
      return NextResponse.json(
        { error: "Failed to fetch images" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.resources || [])
  } catch (error) {
    console.error("Error fetching portfolio images:", error)
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    )
  }
}