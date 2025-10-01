import { useRouter } from "next/router";

import { musicasDiferentes, tempoERepeatsArtista, percentagemArtista, todosArtistas, PagArtista } from "../../utils/dataProcessing";




//Construir as páginas de todos os artistas


export async function getStaticPaths() {
  const artistas = todosArtistas();
  const paths = artistas.map(name => ({ params: { name } }));

  return { paths, fallback: false };
}


export async function getStaticProps() {
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
  const percentagem = percentagemArtista(name)
  const tempo = tempoERepeatsArtista(name)
  const vezes = musicasDiferentes(name)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{name} — Top 20 Songs</h1>
      <div className="flex space-x-6 mb-4 text-gray-700">
        <span>{percentagem.toFixed(2)}% das minhas plays</span>
        <span>{tempo.repeats} vezes</span>
        <span>{vezes} músicas diferentes</span>
        <span>{Math.floor(tempo.tempo/1000/60)} minutos ouvidos</span>
      </div>
      <ul>
        {top20.map((music, i) => (
          <li key={music.musica} className="flex justify-between border-b pb-1">
            <span></span>
            <span>{i + 1}. {music.musica} - {music.album}  </span>

            <span className="text-gray-500">Plays: {music.numeroRepetido} | Time: {Math.floor(music.tempoOuvido)}M </span>
          </li>
        ))}
      </ul>
    </main>
  );
}