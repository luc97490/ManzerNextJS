import Router from 'next/router'
import styles from '@/components/Post.module.css'
import React, { useState, useEffect, useRef } from 'react'
import { Widget, WidgetAPI } from '@uploadcare/react-widget'
import { FileInfo } from '@uploadcare/upload-client'


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

    const widgetApi = useRef<WidgetAPI | null>(null);
    const [title, setTitle] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    useEffect(() => {
        setTitle(post.title);
        setIngredient(post.ingredients);
        setimageUrl(post.imageUrl);
    }, []);
    async function deleteRepas(id: number): Promise<void> {
        await fetch(`/api/mymeals/${id}`, {
            method: "DELETE",
        });
        await Router.push("/mesrepas")
    }
    async function updateRepas(id: number, title: string, ingredient: string,
        imageUrl: string): Promise<void> {
        await fetch(`/api/mymeals/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                ingredients: ingredient,
                imageUrl: imageUrl,
            }),

        });
        await Router.push("/mesrepas")
    }
    const handleFileChange = (fileInfo: FileInfo) => {
        // @ts-ignore
        setimageUrl(fileInfo.originalUrl);

    };

    return (
        <div className="bg-slate-300 w-80 rounded-2xl mb-4 dark:bg-base-300" >
            <h2 className="text-lg text-center p-1 ">{post.title}</h2>
            <div className={styles.image} style={{ backgroundImage: `url(${post.imageUrl})` }}>

                <div className="flex flex-wrap gap-1">
                    {post.ingredients.split(' ').map((ingredient, index) => (
                        <span key={index} className="badge bg-gray-600">{ingredient.trim()}</span>
                    ))}
                </div>
            </div>

            <div className=" text-center  p-1  text-sm rounded-b-2xl  font-bold bg-black text-white dark:bg-slate-100 dark:text-black">
                <label htmlFor={`my-modal${String(post.id)}`} className=" btn text-black bg-base-100 min-h-0 h-10 dark:text-white">Modifier</label>
                <label htmlFor={`my-modal-2${String(post.id)}`} className="text-white dark:text-black btn h-10 min-h-0 btn-outline">Suprimer</label>
            </div>
            <input type="checkbox" id={`my-modal${String(post.id)}`} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <label htmlFor={`my-modal${String(post.id)}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Modification</h3>
                    <label>Titre du repas</label>
                    <input className="input w-full bg-black"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre du repas"
                        type="text"

                        value={title}
                    />
                    <label>Ingredients</label>
                    <input className="input w-full bg-black "
                        onChange={(e) => setIngredient(e.target.value)}
                        placeholder="Ingredients exemple: tomate épices..."
                        type="text"
                        value={ingredient}
                    />

                    <label>Photo du repas</label>
                    <div className='flex flex-col gap-4 items-center'>
                        <img className='h-36' src={imageUrl} alt='Uploaded' />
                        <button
                            className="btn w-52"
                            type='button'
                            onClick={() => {
                                const dialog = widgetApi.current?.openDialog();
                            }}>
                            <Widget ref={widgetApi} publicKey="320c1e0fa4d667b2e0cf"
                                // @ts-ignore
                                onChange={handleFileChange} />


                            Modifier la photo
                        </button>
                    </div>
                    <div className="modal-action">
                        <label htmlFor={`my-modal${String(post.id)}`}
                            // @ts-ignore
                            disabled={!ingredient || !title || !imageUrl} className="btn"
                            onClick={() => updateRepas(Number(post.id), title, ingredient, imageUrl)}>
                            Modifier
                        </label>
                    </div>
                </div>
            </div >
            <input type="checkbox" id={`my-modal-2${String(post.id)}`} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <label htmlFor={`my-modal-2${String(post.id)}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{`Suppression: ${post.title}`}</h3>
                    <p className="py-4">Êtes-vous sûr(e) de vouloir supprimer ce repas ?</p>


                    <div className="modal-action">
                        <label htmlFor={`my-modal-2${String(post.id)}`} className="btn">Annuler</label>
                        <label htmlFor={`my-modal-2${String(post.id)}`} className="btn" onClick={() => deleteRepas(Number(post.id))}>Supprimer</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MyPost
