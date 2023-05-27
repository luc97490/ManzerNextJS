import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { use } from 'react'

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, ingredient, imageUrl, userId } = req.body
  const result = await prisma.meal.create({
    data: {
      title: title,
      ingredients: ingredient,
      imageUrl: imageUrl,
      user: { connect: { id: userId } },
    },
  })
  return res.status(201).json(result)
}
