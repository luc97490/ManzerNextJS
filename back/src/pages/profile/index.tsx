import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Router, { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { Widget, WidgetAPI } from '@uploadcare/react-widget'
import { FileInfo } from '@uploadcare/upload-client'

export type UserProps = {
    id: string
    adresse: string
    name: string
    imageUrl: string
    secteur: string

}

const Create: React.FC<{ post: UserProps }> = ({ post }) => {
    const widgetApi = useRef<WidgetAPI | null>(null);
    const [name, setName] = useState('')
    const [adresse, setAdresse] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    const [secteur, setSecteur] = useState('')
    const { data: session, status } = useSession()
    // @ts-ignore
    const userId = session?.user?.id;
    useEffect(() => {
        setName(String(session?.user?.name));
        // @ts-ignore
        if (session?.user?.adresse == "null")
            setAdresse("");
        else // @ts-ignore
            setAdresse(String(session?.user?.adresse));
        setimageUrl(String(session?.user?.image));
        // @ts-ignore
        setSecteur(String(session?.user?.secteur));
    }, [session?.user]);
    async function updateUser(id: string, name: string, adresse: string,
        imageUrl: string, secteur: string): Promise<void> {
        await fetch(`/api/user/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                adresse: adresse,
                image: imageUrl,
                secteur: secteur,
            }),
        })
        await Router.push('/')

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
                    <form className=' form-control gap-3 text-center '>
                        <h1 className="text-5xl font-bold text-black m-8 text-center ">Mon Profil</h1>
                        <label className="font-bold text-black">Nom de magasin</label>
                        <input className="input w-full dark:bg-base-100 "
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom de magasin"
                            type="text"

                            value={name}
                        />
                        <label className="font-bold text-black">Adresse</label>
                        <input className="input w-full dark:bg-base-100 "
                            onChange={(e) => setAdresse(e.target.value)}

                            type="text"
                            value={adresse}
                        />
                        <div className='flex flex-col gap-4 items-center'>
                            <img className='h-24' src={imageUrl} alt='Uploaded' />
                            <button
                                className="btn w-52"
                                type='button'
                                onClick={() => {
                                    const dialog = widgetApi.current?.openDialog();
                                }}>
                                <div className='hidden'><Widget ref={widgetApi} publicKey='320c1e0fa4d667b2e0cf'
                                    // @ts-ignore
                                    onChange={handleFileChange} /></div>


                                Modifier la photo
                            </button>
                        </div>
                        <label className="font-bold text-black">Secteur</label>
                        <select className="select select-bordered w-full dark:bg-base-100" value={secteur} onChange={(e) => setSecteur(e.target.value)}>
                            <option selected>Nord</option>
                            <option>Sud</option>
                            <option>Ouest</option>
                            <option>Est</option>
                        </select>

                        <div className=' gap-2'>
                            <input className="btn w-48"
                                disabled={!adresse || !name || !imageUrl}
                                value="Modifier"
                                onClick={() => updateUser(String(userId), name, adresse, imageUrl, secteur)}
                            />
                            <a className="btn w-48" href="#" onClick={() => Router.push('/')}>
                                ou Annuler
                            </a></div>
                    </form>
                </div>
                <div className=' h-auto'></div>
            </Layout>
        )
    } else {
        return (<div></div>)
    }
}

export default Create
