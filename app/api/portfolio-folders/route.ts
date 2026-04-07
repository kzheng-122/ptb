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
    const urls = [
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders/portfolio`,
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders/Portfolio`,
    ]
    const results: any[] = []
    for (const url of urls) {
      const r = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 300 },
      })
      if (r.ok) {
        const d = await r.json()
        if (Array.isArray(d.folders)) {
          results.push(...d.folders)
        }
      }
    }
    const seen = new Set<string>()
    const portfolioFolders = results
      .filter((folder: any) => {
        const p = folder?.path || ""
        return (
          (p.startsWith("portfolio/") || p.startsWith("Portfolio/")) &&
          p !== "portfolio" &&
          p !== "Portfolio"
        )
      })
      .filter((f: any) => {
        const key = f.path
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    return NextResponse.json(portfolioFolders)
  } catch (error) {
    console.error("Error fetching portfolio folders:", error)
    return NextResponse.json(
      { error: "Failed to fetch folders" },
      { status: 500 }
    )
  }
}
