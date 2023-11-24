import { NextResponse } from 'next/server'
import prisma from '@/db'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import axios from 'axios'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') as string
  const limit = (searchParams.get('limit') as string) || '10'
  const id = searchParams.get('id') as string
  const my = searchParams.get('my') as string
  const q = searchParams.get('q') as string
  const location = searchParams.get('location') as string
  const category = searchParams.get('category') as string

  const session = await getServerSession(authOptions)

  if (id) {
    // 상세 숙소 가져오기 (단일)
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
  }
  if (my) {
    // 내가 생성한 숙소 가져오기 (무한 스크롤)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'unauthorized user' },
        {
          status: 401,
        },
      )
    }

    const count = await prisma.room.count({
      where: {
        userId: session?.user?.id,
      },
    })

    const skipPage = parseInt(page) - 1
    const rooms = await prisma.room.findMany({
      orderBy: { id: 'desc' },
      where: {
        userId: session?.user?.id,
        title: q ? { contains: q } : {},
      },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
    })

    return NextResponse.json(
      {
        page: parseInt(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      },
      {
        status: 200,
      },
    )
  }
  if (page) {
    // 일반 숙소 리스트 가져오기 (무한 스크롤)
    const count = await prisma.room.count()
    const skipPage = parseInt(page) - 1
    const rooms = await prisma.room.findMany({
      where: {
        address: location ? { contains: location } : {},
        category: category || {},
      },
      orderBy: { id: 'desc' },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
    })

    return NextResponse.json(
      {
        page: parseInt(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      },
      {
        status: 200,
      },
    )
  }
  const rooms = await prisma.room.findMany()

  return NextResponse.json(rooms, {
    status: 200,
  })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }
  // 데이터 생성을 처리한다
  const formData = await req.json()
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  }

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address,
    )}`,
    { headers },
  )

  const result = await prisma.room.create({
    data: {
      ...formData,
      price: parseInt(formData.price),
      userId: session?.user ? session?.user?.id : {},
      lat: data.documents[0].y,
      lng: data.documents[0].x,
    },
  })

  return NextResponse.json(result, { status: 200 })
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url)
  const session = await getServerSession(authOptions)
  const id = searchParams.get('id') as string

  if (!session?.user) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }
  // 데이터 수정을 처리한다
  const formData = await req.json()
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  }

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address,
    )}`,
    { headers },
  )

  const result = await prisma.room.update({
    where: { id: parseInt(id) },
    data: {
      ...formData,
      price: parseInt(formData.price),
      userId: session?.user?.id,
      lat: data.documents[0].y,
      lng: data.documents[0].x,
    },
  })

  return NextResponse.json(result, { status: 200 })
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const session = await getServerSession(authOptions)
  const id = searchParams.get('id') as string

  if (!session?.user) {
    return NextResponse.json(
      { error: 'unauthorized user' },
      {
        status: 401,
      },
    )
  }
  // 데이터 삭제를 처리한다
  if (id) {
    const result = await prisma.room.delete({
      where: {
        id: parseInt(id),
      },
    })

    return NextResponse.json(result, { status: 200 })
  }

  return NextResponse.json(null, { status: 500 })
}
