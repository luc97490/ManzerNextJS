import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const postId = req.query.id

    switch (req.method) {
        case 'PATCH':
            return handlePATCH(String(postId), req.body, res)

        default:
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`,
            )
    }
}

// PATCH /api/post/:id
async function handlePATCH(
    postId: string,
    data: { nameMag: string, adresse: string, imageMag: string, secteur: string },
    res: NextApiResponse<any>
) {
    const post = await prisma.user.update({
        where: { id: String(postId) },
        data: {
            nameMag: data.nameMag,
            imageMag: data.imageMag,
            secteur: data.secteur,
            adresse: data.adresse
        },
    })
    return res.json(post)
}
