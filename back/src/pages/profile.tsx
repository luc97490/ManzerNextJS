import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router'
import { useSession } from "next-auth/react"

export type UserProps = {
    id: string
    adresse: string
    name: string
    imageUrl: string
    secteur: string

}
const Create: React.FC<{ post: UserProps }> = ({ post }) => {
    const [name, setName] = useState('')
    const [adresse, setAdresse] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    const [secteur, setSecteur] = useState('')
    const { data: session, status } = useSession()
    const userId = session?.user?.id;
    useEffect(() => {
        setName(String(session?.user?.name));
        if (session?.user?.adresse == "null")
            setAdresse("");
        else
            setAdresse(String(session?.user?.adresse));
        setimageUrl(String(session?.user?.image));
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
        await Router.push('/profile')

    }

    return (
        <Layout>
            <div className='flex justify-center'>
                <form className=' form-control gap-3 text-center '>
                    <h1 className="text-5xl font-bold text-black m-14 text-center ">Mon Profil</h1>
                    <label className="font-bold text-black">Nom de magasin</label>
                    <input className="input w-full bg-black"
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nom de magasin"
                        type="text"

                        value={name}
                    />
                    <label className="font-bold text-black">Adresse</label>
                    <input className="input w-full bg-black "
                        onChange={(e) => setAdresse(e.target.value)}

                        type="text"
                        value={adresse}
                    />
                    <label className="font-bold text-black">Url de l'image de profil</label>
                    <input className="input w-full bg-black "
                        onChange={(e) => setimageUrl(e.target.value)}
                        placeholder="Url de l'image"
                        type="text"
                        value={imageUrl}
                    />
                    <label className="font-bold text-black">Secteur</label>
                    <select className="select select-bordered w-full bg-black" value={secteur} onChange={(e) => setSecteur(e.target.value)}>
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
}

export default Create
