import { NextResponse } from 'next/server'
import prisma from '@/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') as string
  const limit = searchParams.get('limit') as string

  if (page) {
    const count = await prisma.room.count()
    const skipPage = parseInt(page) - 1
    const rooms = await prisma.room.findMany({
      orderBy: { id: 'asc' },
      take: parseInt(limit),
      skip: skipPage * 12,
    })

    return NextResponse.json(
      {
        page: parseInt(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / 12),
      },
      {
        status: 200,
      },
    )
  }
}
