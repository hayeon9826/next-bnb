import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import prisma from '@/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId') as string
  const page = searchParams.get('page') as string
  const limit = searchParams.get('limit') as string

  const session = await getServerSession(authOptions)

  if (page) {
    const count = await prisma.comment.count()
    const skipPage = parseInt(page) - 1
    const comments = await prisma.comment.findMany({
      orderBy: { id: 'asc' },
      take: parseInt(limit),
      skip: skipPage * 12,
      include: {
        user: true,
      },
    })

    return NextResponse.json(
      {
        page: parseInt(page),
        data: comments,
        totalCount: count,
        totalPage: Math.ceil(count / 12),
      },
      {
        status: 200,
      },
    )
  } else {
    const count = await prisma.comment.count()
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      where: {
        roomId: roomId ? parseInt(roomId) : {},
        userId: session ? session?.user.id : {},
      },
      include: {
        user: true,
        room: true,
      },
    })

    return NextResponse.json(
      { comments: comments, totalCount: count },
      {
        status: 200,
      },
    )
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') as string

  if (!session?.user || !id) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }

  const result = await prisma.comment.delete({
    where: {
      id: parseInt(id),
    },
  })

  return NextResponse.json(result, {
    status: 200,
  })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const { roomId, body }: { roomId: number; body: string } = formData

  if (!session?.user) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }

  const comment = await prisma.comment.create({
    data: {
      roomId,
      body,
      userId: session?.user.id,
    },
  })

  return NextResponse.json(comment, {
    status: 200,
  })
}
