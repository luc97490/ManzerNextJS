import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const postId = req.query.id

  switch (req.method) {
    case 'DELETE':
      return handleDELETE(postId, res)

    case 'PUT':
      return handlePUT(postId, req.body, res)

    case 'PATCH':
      return handlePATCH(postId, req.body, res)

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      )
  }
}

// DELETE /api/post/:id
async function handleDELETE(postId: unknown, res: NextApiResponse<any>) {
  const post = await prisma.meal.delete({
    where: { id: Number(postId) },
  })
  return res.json(post)
}

// PUT /api/post/:id
async function handlePUT(
  postId: unknown,
  data: { title: string, ingredients: string, imageUrl: string },
  res: NextApiResponse<any>
) {
  const post = await prisma.meal.update({
    where: { id: Number(postId) },
    data: {
      title: data.title,
      ingredients: data.ingredients,
      imageUrl: data.imageUrl,
    },
  })
  return res.json(post)
}

// PATCH /api/post/:id
async function handlePATCH(
  postId: unknown,
  data: { title?: string, ingredients?: string, imageUrl?: string },
  res: NextApiResponse<any>
) {
  const post = await prisma.meal.update({
    where: { id: Number(postId) },
    data,
  })
  return res.json(post)
}
