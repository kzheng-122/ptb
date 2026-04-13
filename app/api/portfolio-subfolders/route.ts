import { NextResponse } from "next/server"

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET

export async function GET(request: Request) {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary credentials not configured" },
      { status: 500 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder")

    if (!folder) {
      return NextResponse.json(
        { error: "Folder parameter is required" },
        { status: 400 }
      )
    }

    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64")

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders/${folder}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch subfolders")
    }

    const data = await response.json()

    const subfolders =
      data.folders?.map((folder: any) => ({
        name: folder.name,
        path: folder.path,
      })) || []

    return NextResponse.json(subfolders)
  } catch (error) {
    console.error("Error fetching subfolders:", error)
    return NextResponse.json(
      { error: "Failed to fetch subfolders" },
      { status: 500 }
    )
  }
}