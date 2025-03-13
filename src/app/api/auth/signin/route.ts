import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export default async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
}
