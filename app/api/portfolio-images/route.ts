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
    const urls = [`folder:${folder}`]
    if (folder.startsWith("portfolio/")) {
      urls.push(`folder:Portfolio/${folder.slice("portfolio/".length)}`)
    } else if (folder.startsWith("Portfolio/")) {
      urls.push(`folder:portfolio/${folder.slice("Portfolio/".length)}`)
    }
    for (const expr of urls) {
      const r = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expression: expr,
            max_results: 100,
            sort_by: [{ created_at: "desc" }],
          }),
          next: { revalidate: 300 },
        }
      )
      if (r.ok) {
        const d = await r.json()
        if (Array.isArray(d.resources) && d.resources.length > 0) {
          return NextResponse.json(d.resources)
        }
      }
    }
    return NextResponse.json([])
  } catch (error) {
    console.error("Error fetching portfolio images:", error)
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    )
  }
}
