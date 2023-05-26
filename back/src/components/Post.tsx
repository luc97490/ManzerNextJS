import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import styles from '@/components/Post.module.css'

export type PostProps = {
  id: number
  title: string
  ingredients: string
  imageUrl: string
  user: {
    id: string
    name: string
  }


}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.user ? post.user.name : 'Unknown author';
  return (
    <div className="bg-slate-300 w-80 rounded-2xl mb-4 dark:bg-base-300" >
      <h2 className="text-lg text-center p-1 " >{post.title}</h2>
      <div className={styles.image} style={{ backgroundImage: `url(${post.imageUrl})` }}>

        <div className="flex flex-wrap gap-1">
          {post.ingredients.split(' ').map((ingredient, index) => (
            <span key={index} className="badge bg-gray-600">{ingredient.trim()}</span>
          ))}
        </div>
      </div>

      <div className="pl-8 p-1  text-sm rounded-b-2xl  font-bold bg-black text-white dark:bg-slate-100 dark:text-black">By {authorName}</div>
    </div>
  );
};

export default Post
