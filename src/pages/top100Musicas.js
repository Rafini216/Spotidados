import { top100Musicas } from "../utils/dataProcessing.js"

import Link from "next/link";



//loading da página 
export async function getStaticProps(){
  const topMusicas = top100Musicas()
  return {
    props: { topMusicas },
  };
}

//Content
export default function Home() {
    const topMusicas = top100Musicas();

    return (
        <main className="p-6">
            <div className="flex space-x-6 mb-4">
                <Link href="/top100Artistas">
                    <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600">Top 100 Artists</h1>
                </Link>
                <Link href="/top100Musicas">
                    <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600">Top 100 Musics</h1>
                </Link>
                <Link href="/top100Albuns">
                    <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600">Top 100 Albums</h1>
                </Link>
            </div>
            <ul className="space-y-2">
                {topMusicas.map((music, i) => (
                    <li key={`${music.musica} - ${music.album}  -  ${music.artista}` } className="flex justify-between border-b pb-1">
                        <Link href={`/artista/${encodeURIComponent(music.artista)}`}>
                        <span>{i + 1}. {music.musica} - {music.album}  -  {music.artista}  </span>
                        </Link>
                        <span className="text-gray-500">Plays: {music.numeroRepetido} | Time: {Math.floor(music.tempoOuvido)}M
            </span>
                    </li>
                ))}
            </ul>
        </main>
    );
}