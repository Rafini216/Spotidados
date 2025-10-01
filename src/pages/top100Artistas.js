import { top100Artistas } from "../utils/dataProcessing.js"

import Link from "next/link";



//loading da página 
export async function getStaticProps(){
  const topArtistas = top100Artistas()
  return {
    props: { topArtistas },
  };
}


//Content
export default function Home() {
  const topArtistas = top100Artistas();

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
        {topArtistas.map((artist, i) => (
          <li key={artist.artista} className="flex justify-between border-b pb-1">
            <Link href={`/artista/${encodeURIComponent(artist.artista)}`}>
              <span>{i + 1}. {artist.artista}</span>
            </Link>
            <span className="text-gray-500">Plays: {artist.numeroRepetido} | Time: {Math.floor(artist.tempoOuvido)}H </span>
          </li>
        ))}
      </ul>
    </main>
  );
}