import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { name, description, price, imageUrls } = await req.json()
}
