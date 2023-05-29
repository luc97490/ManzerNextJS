import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'

type Props = {
  feed: PostProps[]
}

const Accueil: React.FC<Props> = (props) => {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const filterBySector = (post: PostProps) => {
    if (selectedSectors.length === 0) {
      return true;
    } else {
      return selectedSectors.includes(post.user.secteur.toLowerCase());
    }
  };
  const filteredFeed = props.feed.filter((post) =>
    (post.title.toLowerCase().includes(searchTerm.toLowerCase())
      || post.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      || post.user.nameMag.toLowerCase().includes(searchTerm.toLowerCase()))
    && filterBySector(post)

  );


  const handleSectorChange = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter((s) => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black m-14">Menu du jour</h1>
        <span className="font-semibold text-black">Découvrez l&apos;excellence culinaire sur Manzer.re, le guide ultime pour dénicher les meilleurs repas.</span>
        <div className="flex flex-col items-center gap-3 m-14">
          <input type="text" placeholder='Recherche' className="input input-bordered w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="bg-base-100 p-3 max-w-lg w-full center rounded-md flex justify-around">
            <input type="checkbox" className="checkbox"
              checked={selectedSectors.includes('nord')}
              onChange={() => handleSectorChange('nord')}
            /><span>Nord</span>
            <input type="checkbox" className="checkbox"
              checked={selectedSectors.includes('sud')}
              onChange={() => handleSectorChange('sud')}
            /><span>Sud</span>
            <input type="checkbox" className="checkbox"
              checked={selectedSectors.includes('ouest')}
              onChange={() => handleSectorChange('ouest')}
            /><span>Ouest</span>
            <input type="checkbox" className="checkbox"
              checked={selectedSectors.includes('est')}
              onChange={() => handleSectorChange('est')}
            /><span>Est</span>
          </div>
        </div>
      </div>


      <main className='bg-base-100 py-16 rounded-3xl'>
        {filteredFeed.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.meal.findMany({
    include: {
      user: true
    }

  })
  return {
    props: { feed },
  }
}

export default Accueil
