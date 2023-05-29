import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import Router, { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

import { FileInfo, } from '@uploadcare/upload-client'
import { DialogApi, Widget, WidgetAPI } from "@uploadcare/react-widget";
// fileData must be Blob or File or Buffer


const Create: React.FC = () => {


  const widgetApi = useRef<WidgetAPI | null>(null);

  const [title, setTitle] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const { data: session, status } = useSession()
  // @ts-ignore
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

  const handleFileChange = (fileInfo: FileInfo) => {
    // @ts-ignore
    setimageUrl(fileInfo.originalUrl);

  };
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [session, router]);

  if (session) {

    return (
      <Layout>


        <div className='flex justify-center'>
          <form className=' form-control gap-10 text-center ' onSubmit={submitData}>
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
            <div className='flex flex-col gap-4 items-center'>
              {imageUrl ? (
                <>
                  <img className='w-36' src={imageUrl} alt='Uploaded' />
                  <button
                    className="btn w-52"
                    type='button'
                    onClick={() => {
                      const dialog = widgetApi.current?.openDialog();
                    }}
                  >  <Widget ref={widgetApi} publicKey="320c1e0fa4d667b2e0cf"
                    // @ts-ignore
                    onChange={handleFileChange} />
                    Modifier la photo
                  </button>
                </>
              ) : (
                <button
                  className="btn w-52"
                  type='button'
                  onClick={() => {
                    const dialog = widgetApi.current?.openDialog();
                  }}
                >
                  <Widget ref={widgetApi} publicKey="320c1e0fa4d667b2e0cf"
                    // @ts-ignore
                    onChange={handleFileChange} />
                  Ajouter la photo
                </button>
              )}

            </div>

            <div className=' gap-2'>
              <input className="btn w-48"
                disabled={!ingredient || !title || !imageUrl}
                type="submit"
                value="Créer"
              />
              <a className="btn w-48" href="#" onClick={() => Router.push('/')}>
                ou Annuler
              </a>
            </div>
          </form>
        </div>
        <div className=' h-auto'></div>
      </Layout>
    )
  } else
    return (<div></div>)
}


export default Create
