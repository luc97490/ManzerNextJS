import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import styles from '@/styles/Post.module.css'

async function publish(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroy(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

const Post: React.FC<PostProps> = (props) => {
  let title = props.title

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.user?.username || 'Unknown author'}</p>
        <ReactMarkdown>{props.ingredients}</ReactMarkdown>
        {(
          <button className={styles.button} onClick={() => publish(props.id)}>
            Publish
          </button>
        )}
        <button className={styles.button} onClick={() => destroy(props.id)}>
          Delete
        </button>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id,
  )
  const post = await prisma.meal.findUnique({
    where: { id },
    include: { user: true },
  })
  return { props: { ...post } }
}

export default Post
