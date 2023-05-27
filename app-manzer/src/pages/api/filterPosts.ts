import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// GET /api/filterPosts?searchString=:searchString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { searchString } = req.query
  const resultPosts = await prisma.meal.findMany({
    where: {
      OR: [
        {
          title: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
        {
          ingredients: {
            contains: Array.isArray(searchString)
              ? searchString[0]
              : searchString,
          },
        },
      ],
    },
  })
  return res.json(resultPosts)
}
