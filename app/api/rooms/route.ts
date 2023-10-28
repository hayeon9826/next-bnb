import { NextResponse } from 'next/server'
import prisma from '@/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') as string
  const limit = searchParams.get('limit') as string
  const id = searchParams.get('id') as string

  const session = await getServerSession(authOptions)

  if (id) {
    const room = await prisma.room.findFirst({
      where: {
        id: id ? parseInt(id) : {},
      },
      include: {
        likes: {
          where: session ? { userId: session.user.id } : {},
        },
        user: true,
        comments: true,
      },
    })

    return NextResponse.json(room, {
      status: 200,
    })
  } else if (page) {
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
  } else {
    const rooms = await prisma.room.findMany()

    return NextResponse.json(rooms, {
      status: 200,
    })
  }
}
