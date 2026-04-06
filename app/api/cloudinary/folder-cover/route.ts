import { NextResponse } from "next/server"

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME

export async function POST(request: Request) {
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary credentials not configured" },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { folder } = body

    if (!folder) {
      return NextResponse.json(
        { error: "Folder parameter is required" },
        { status: 400 }
      )
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")
    
    // Get the first image from the folder as cover
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
          max_results: 1,
          sort_by: [{ created_at: "asc" }],
        }),
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("Cloudinary search API error:", error)
      return NextResponse.json(
        { error: "Failed to fetch folder cover" },
        { status: response.status }
      )
    }

    const data = await response.json()
    const coverImage = data.resources?.[0]?.secure_url || null
    
    return NextResponse.json({ coverImage })
  } catch (error) {
    console.error("Error fetching folder cover:", error)
    return NextResponse.json(
      { error: "Failed to fetch folder cover" },
      { status: 500 }
    )
  }
}
