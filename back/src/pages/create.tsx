import React, { useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import styles from '@/styles/Draft.module.css'
import { useSession } from "next-auth/react"


const Create: React.FC = () => {
  const [title, setTitle] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const { data: session, status } = useSession()
  const userId = session?.user?.id;
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, ingredient, imageUrl, userId: userId }

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
      <div className='flex justify-center'>
        <form className=' form-control gap-3 text-center ' onSubmit={submitData}>
          <h1 className="text-5xl font-bold text-black m-14 text-center ">Ajouter un repas</h1>
          <input className="input w-full "
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du repas"
            type="text"
            value={title}
          />

          <input className="input w-full "
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Ingredients exemple: tomate épices..."
            type="text"
            value={ingredient}
          />
          <input className="input w-full "
            onChange={(e) => setimageUrl(e.target.value)}
            placeholder="Url de l'image"
            type="text"
            value={imageUrl}
          />
          <div className=' gap-2'>
            <input className="btn w-48"
              disabled={!ingredient || !title || !imageUrl}
              type="submit"
              value="Créer"
            />
            <a className="btn w-48" href="#" onClick={() => Router.push('/')}>
              ou Annuler
            </a></div>
        </form>
      </div>
      <div className=' h-auto'></div>
    </Layout>
  )
}

export default Create
