
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import MyPost from '@/components/MyPost'
import { getSession, useSession } from "next-auth/react"
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react'

type Props = {
  myrepas: PostProps[]
}
const MesRepas: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession()
  useEffect(() => {
    if (!session) {
      router.push('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [session, router]);

  if (session) {
    return (
      <Layout>
        <div>
          <h1 className="text-5xl font-bold text-black m-14 text-center">Mes Repas</h1>
          <main className='bg-base-100 py-16  rounded-3xl'>
            {props.myrepas.map((post) => (
              <MyPost key={post.id} post={post} />
            ))}
          </main>
        </div>
      </Layout>
    )
  }
  return (<div></div>)

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  // @ts-ignore
  const userId = session?.user?.id;
  const myrepas = await prisma.meal.findMany({
    where: {
      userId: userId, // Filtrer les repas en fonction de l'ID de l'utilisateur connecté
    },
  })
  return {
    props: { myrepas },
  }
}

export default MesRepas
