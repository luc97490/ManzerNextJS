import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import styles from '@/styles/Draft.module.css'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const [userId, setuserId] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, ingredient, imageUrl, userId: 1 }

      await fetch(`/api/meals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/mesrepas')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Create Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Ingredients exemple: tomate, épices..."
            type="text"
            value={ingredient}
          />
          <input
            onChange={(e) => setimageUrl(e.target.value)}
            placeholder="Url de l'image"
            type="text"
            value={imageUrl}
          />
          <input
            disabled={!ingredient || !title || !imageUrl}
            type="submit"
            value="Create"
          />
          <a className={styles.black} href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  )
}

export default Draft
