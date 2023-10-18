import { NextResponse } from 'next/server'
import prisma from '@/db'

export async function GET() {
  const data = await prisma.room.findMany()

  return NextResponse.json(data, {
    status: 200,
  })
}
