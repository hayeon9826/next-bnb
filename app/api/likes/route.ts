import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import prisma from '@/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  if (!session?.user) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }

  // 찜하기 로직 처리
  const { roomId }: { roomId: number } = formData

  // Like 데이터가 있는지 확인
  let like = await prisma.like.findFirst({
    where: {
      roomId,
      userId: session?.user?.id,
    },
  })

  // 만약 이미 찜을 했다면, 해당 like 데이터 삭제. 아니라면, 데이터 생성
  if (like) {
    // 이미 찜을 한 상황
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    })
    return NextResponse.json(like, {
      status: 200,
    })
  } else {
    // 찜을 하지 않은 상황
    like = await prisma.like.create({
      data: {
        roomId,
        userId: session?.user?.id,
      },
    })

    return NextResponse.json(like, {
      status: 201,
    })
  }
}
