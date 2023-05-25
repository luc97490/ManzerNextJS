import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import styles from '@/styles/Blog.module.css'

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>

      <div className={styles.menujour}>
        <h1 className="text-5xl font-bold text-black m-14">Menu du jour</h1>

        <span className="font-semibold text-black">Découvrez l'excellence culinaire sur Manzer.re, le guide ultime pour dénicher les meilleurs repas.</span>
        <div className="flex flex-col items-center gap-3 m-14">
          <input type="text" placeholder='Recherche' className="input input-bordered w-72" />
          <div className="bg-base-100  p-3  max-w-lg w-full center rounded-md flex justify-around">
            <input type="checkbox" className="checkbox" /><span>Nord</span>
            <input type="checkbox" className="checkbox" /><span>Sud</span>
            <input type="checkbox" className="checkbox" /><span>Ouest</span>
            <input type="checkbox" className="checkbox" /><span>Est</span>

          </div>
        </div>

      </div>


      <main className='bg-base-100 py-16 rounded-t-3xl'>
        {props.feed.map((post) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
      </main>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.meal.findMany({

  })
  return {
    props: { feed },
  }
}

export default Blog
