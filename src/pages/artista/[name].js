import { useRouter } from "next/router";

import {todosArtistas, PagArtista } from "../../utils/dataProcessing";




//Construir as páginas de todos os artistas


export async function getStaticPaths() {
  const artistas = todosArtistas();
  const paths = artistas.map(name => ({ params: { name } }));

  return { paths, fallback: false };
}


export async function getStaticProps(){
  const artistas = PagArtista()
  return {
    props: { artistas },
  };
}

//Routing da página de cada artista

export default function ArtistPage() {
  const router = useRouter();
  const { name } = router.query;

  if (!name) return <p>Loading...</p>;

  const top20 = PagArtista(name);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{name} — Top 20 Songs</h1>
      <ul>
        {top20.map((music, i) => (
          <li key={music.musica} className="flex justify-between border-b pb-1">
            <span>{i + 1}. {music.musica} - {music.album}  </span>

            <span className="text-gray-500">Plays: {music.numeroRepetido} | Time: {Math.floor(music.tempoOuvido)}H </span>
          </li>
        ))}
      </ul>
    </main>
  );
}