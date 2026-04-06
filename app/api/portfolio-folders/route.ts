import { NextResponse } from "next/server"

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

export async function GET() {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary credentials not configured" },
      { status: 500 }
    )
  }

  try {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64")
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
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
    // Filter for folders inside /portfolio only
    const portfolioFolders = data.folders.filter((folder: any) => 
      folder.path.startsWith('portfolio/') && folder.path !== 'portfolio'
    )
    return NextResponse.json(portfolioFolders)
  } catch (error) {
    console.error("Error fetching portfolio folders:", error)
    return NextResponse.json(
      { error: "Failed to fetch folders" },
      { status: 500 }
    )
  }
}