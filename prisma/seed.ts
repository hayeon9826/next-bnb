import { PrismaClient } from '@prisma/client'
import { fakerKO as faker } from '@faker-js/faker'

const prisma = new PrismaClient()
const CATEGORY = [
  '전망좋은',
  '자연',
  '동굴',
  '캠핑장',
  '방',
  '한옥',
  '해변',
  '국립공원',
  '인기',
  '수영장',
  '농장',
  '통나무집',
  '디자인',
  '스키',
  '호수',
  '키즈',
  '저택',
  '신규',
  '섬',
  '주택',
  '서핑',
  '골프장',
]

async function seetUsers() {
  Array.from({ length: 10 }, (v, i) => i).forEach(async () => {
    const userData = {
      email: faker.internet.email(),
      name: faker.person.lastName() + faker.person.firstName(),
      image: faker.image.avatar(),
      desc: faker.lorem.sentence(),
    }

    const res = await prisma.user.create({
      data: userData,
    })

    console.log(res)
  })
}

async function seedRooms() {
  const totalUsers = await prisma.user.count()
  if (totalUsers > 1) {
    Array.from({ length: 20 }, (v, i) => i).forEach(async () => {
      const randomIndex = Math.floor(Math.random() * totalUsers + 1)
      const roomData = {
        images: [
          faker.image.urlLoremFlickr({
            category: 'room',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'building',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'hotel',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'house',
            width: 500,
            height: 500,
          }),
        ],
        title: faker.lorem.words(),
        address:
          faker.location.state() +
          faker.location.street() +
          faker.location.streetAddress({ useFullAddress: true }),
        lat: faker.location.latitude().toString(),
        lng: faker.location.longitude().toString(),
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        desc: faker.lorem.paragraphs(),
        bedroomDesc: faker.lorem.words(),
        price: parseInt(
          faker.commerce.price({ min: 50000, max: 500000, dec: 0 }),
        ),
        freeCancel: faker.datatype.boolean(),
        selfCheckIn: faker.datatype.boolean(),
        officeSpace: faker.datatype.boolean(),
        hasMountainView: faker.datatype.boolean(),
        hasShampoo: faker.datatype.boolean(),
        hasFreeLaundry: faker.datatype.boolean(),
        hasAirConditioner: faker.datatype.boolean(),
        hasWifi: faker.datatype.boolean(),
        hasBarbeque: faker.datatype.boolean(),
        hasFreeParking: faker.datatype.boolean(),
        userId: randomIndex,
      }

      const res = await prisma.room.create({
        data: roomData,
      })

      console.log(res)
    })
  }
}

async function main() {
  //   await seetUsers()
  await seedRooms()
}

main()
