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

const MyPost: React.FC<{ post: PostProps }> = ({ post }) => {

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

            <div className=" flex justify-around bg-white rounded-b-lg  p-2"> <button className="btn bg-base-100 min-h-0 h-10">Modifier</button> <button className="btn h-10 min-h-0 btn-outline">Suprimer</button></div>
        </div>
    );
};

export default MyPost
