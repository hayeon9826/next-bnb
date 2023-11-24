import { NextResponse } from 'next/server'
import prisma from '@/db'

export async function GET() {
  const data = await prisma.faq.findMany()

  return NextResponse.json(data, {
    status: 200,
  })
}
