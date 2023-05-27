import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { use } from 'react'


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const { title, ingredients, imageUrl, userId } = req.body
  const result = await prisma.meal.create({
    data: {
      title: title,
      ingredients: ingredients,
      imageUrl: imageUrl,
      user: {
        connect: {
          id: userId, // Utilisez directement l'ID de l'utilisateur
        },
      },
    },
  })
  return res.status(201).json(result)
}
