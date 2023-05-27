import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    googleId: 123456,
    username: 'user1',
    email: 'user1@example.com',
    photo: 'user1.jpg',
    meals: {
      create: [
        {
          title: 'Meal 1',
          ingredients: 'Ingredient 1, Ingredient 2',
          imageUrl: 'meal1.jpg',
        },
        {
          title: 'Meal 2',
          ingredients: 'Ingredient 3, Ingredient 4',
          imageUrl: 'meal2.jpg',
        },
      ],
    },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
