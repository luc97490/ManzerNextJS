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
    username: string
  }


}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.user ? post.user.username : 'Unknown author';
  return (
    <div className={styles.card} >
      <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.image} style={{ backgroundImage: `url(${post.imageUrl})` }}>

        <div className="flex flex-wrap gap-1">
          {post.ingredients.split(' ').map((ingredient, index) => (
            <span key={index} className="badge bg-gray-600">{ingredient.trim()}</span>
          ))}
        </div>
      </div>

      <div className={styles.author}>By {authorName}</div>
    </div>
  );
};

export default Post
