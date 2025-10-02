import { useRouter } from "next/router";

import {
  musicasDiferentes,
  tempoERepeatsArtista,
  percentagemArtista,
  PagArtista,
} from "../../utils/dataProcessing";

//Construir as páginas de todos os artistas

//Routing da página de cada artista

export default function ArtistPage() {
  const router = useRouter();
  const { name } = router.query;

  if (!name) return <p>Loading...</p>;
  const top20 = PagArtista(name);
  const percentagem = percentagemArtista(name);
  const tempo = tempoERepeatsArtista(name);
  const vezes = musicasDiferentes(name);

  return (
    <div className="min-h-screen bg-gradient-to-br to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center md:text-left">
          {name} — <span className="text-orange-400">Top 20 Songs</span>
        </h1>

        {/* Informações destacadas (com efeito de card) */}
        <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-orange-500/20 p-4 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
            <div className="text-orange-400 font-bold">
              {percentagem.toFixed(2)}%
            </div>
            <div className="text-gray-300 text-sm">of my plays</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
            <div className="text-orange-400 font-bold">{tempo.repeats}</div>
            <div className="text-gray-300 text-sm">times played</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
            <div className="text-orange-400 font-bold">{vezes}</div>
            <div className="text-gray-300 text-sm">different songs</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
            <div className="text-orange-400 font-bold">
              {Math.floor(tempo.tempo / 1000 / 60)}
            </div>
            <div className="text-gray-300 text-sm">minutes listened</div>
          </div>
        </div>

        {/* Lista de músicas */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-orange-500/20 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {top20.map((music, i) => (
              <li key={music.musica} className="group">
                <div className="block px-6 py-4 relative overflow-hidden transition-all duration-300 hover:bg-white/5">
                  {/* Faixa de luz horizontal ao passar o mouse */}
                  <div className="absolute inset-0 -left-full group-hover:left-0 transition-left duration-500 ease-out bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"></div>

                  <div className="relative flex justify-between items-center flex-wrap gap-y-1">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-orange-400 font-bold w-6 text-right">
                        #{i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-lg group-hover:text-orange-300 transition-colors truncate">
                          {music.musica}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {music.album}
                        </div>
                      </div>
                    </div>
                    <div className="text-orange-200 text-sm flex gap-3 whitespace-nowrap">
                      <span>Plays: {music.numeroRepetido}</span>
                      <span>Time: {Math.floor(music.tempoOuvido)}m</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
