import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import Post, { PostProps } from '@/components/Post'
import prisma from '../../lib/prisma'
import { getSession } from "next-auth/react"


type Props = {
  myrepas: PostProps[]
}
const Repas: React.FC<Props> = (props) => {

  return (
    <Layout>
      <div>
        <h1 className="text-5xl font-bold text-black m-14 text-center">Les Repas : {props.myrepas.length > 0 && props.myrepas[0].user.nameMag}</h1>
        <main className='bg-base-100 py-16  rounded-3xl'>
          {props.myrepas.map((post) => (
            <Post key={post.id} post={post} />

          ))}
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = String(
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id,
  )
  const myrepas = await prisma.meal.findMany({

    where: {
      userId: userId, // Filtrer les repas en fonction de l'ID de l'utilisateur connecté
    }, include: {
      user: true
    }
  })

  return {
    props: { myrepas },
  }
}
export default Repas