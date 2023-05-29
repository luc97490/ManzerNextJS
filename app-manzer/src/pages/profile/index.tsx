import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Router, { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { Widget, WidgetAPI } from '@uploadcare/react-widget'
import { FileInfo } from '@uploadcare/upload-client'

export type UserProps = {
    id: string
    adresse: string
    secteur: string
    nameMag: string
    imageMag: string

}

const Create: React.FC<{ post: UserProps }> = ({ post }) => {
    const [isLoading, setIsLoading] = useState(false);
    const widgetApi = useRef<WidgetAPI | null>(null);
    const [nameMag, setName] = useState('')
    const [adresse, setAdresse] = useState('')
    const [imageMag, setimageUrl] = useState('')
    const [secteur, setSecteur] = useState('')
    const { data: session, status } = useSession()
    // @ts-ignore
    const userId = session?.user?.id;
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        }
        // @ts-ignore
        if (session?.user?.nameMag == "null")
            setName("");
        else// @ts-ignore
            setName(String(session?.user?.nameMag));
        // @ts-ignore
        if (session?.user?.adresse == "null")
            setAdresse("");
        else // @ts-ignore
            setAdresse(String(session?.user?.adresse));
        // @ts-ignore
        setimageUrl(String(session?.user?.imageMag));
        // @ts-ignore
        setSecteur(String(session?.user?.secteur));



    }, [session?.user]);
    const updateUser = async (id: string, nameMag: string, adresse: string, imageMag: string, secteur: string): Promise<void> => {
        try {
            setIsLoading(true);

            await fetch(`/api/user/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nameMag: nameMag,
                    adresse: adresse,
                    imageMag: imageMag,
                    secteur: secteur,
                }),
            });

            await window.location.reload();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleFileChange = (fileInfo: FileInfo) => {
        // @ts-ignore
        setimageUrl(fileInfo.originalUrl);

    };




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

                            value={nameMag}
                        />
                        <label className="font-bold text-black">Adresse</label>
                        <input className="input w-full dark:bg-base-100 "
                            onChange={(e) => setAdresse(e.target.value)}

                            type="text"
                            value={adresse}
                        />
                        <div className='flex flex-col gap-4 items-center'>
                            <img className='h-24' src={imageMag} alt='Uploaded' />
                            <button
                                className="btn w-52"
                                type='button'
                                onClick={() => {
                                    const dialog = widgetApi.current?.openDialog();
                                }}>
                                <div><Widget ref={widgetApi} publicKey="320c1e0fa4d667b2e0cf"
                                    // @ts-ignore
                                    onChange={handleFileChange}

                                /></div>


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
                        {isLoading && <progress className="progress w-auto"></progress>}
                        <div className=' gap-2'>

                            <input className="btn w-48"
                                disabled={!adresse || !nameMag || !imageMag}
                                value="Modifier"
                                onClick={() => updateUser(String(userId), nameMag, adresse, imageMag, secteur)}
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
