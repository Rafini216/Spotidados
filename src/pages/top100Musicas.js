import { filtrarDatas, top100Musicas } from "../utils/dataProcessing.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";

const links = [
  { href: "/top100Artistas", label: "Top 100 Artists" },
  { href: "/top100Musicas", label: "Top 100 Musics" },
  { href: "/top100Albuns", label: "Top 100 Albums" },
];

export default function Home() {
  const pathname = usePathname();
  const [periodo, setPeriodo] = useState("all");

  const lista = useMemo(() => {
    const { inicio, fim } = filtrarDatas(periodo);
    return top100Musicas(inicio, fim);
  }, [periodo]);

  return (
    <div className="min-h-screen bg-gradient-to-br to-black text-white p-4">
      <style jsx global>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho com vinis */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 mt-8">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="group flex flex-col items-center">
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-0 transition-opacity duration-300 ${isActive ? "opacity-70" : "group-hover:opacity-60"}`}
                  ></div>
                  <div className="w-full h-full rounded-full bg-black relative overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    <div
                      className="absolute inset-0"
                      style={{
                        animation: "vinylSpin 8s linear infinite",
                        transformOrigin: "center",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                      onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
                    >
                      <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-white/30"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-700 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">B4F</span>
                        </div>
                      </div>
                      <div className="absolute inset-2 rounded-full border border-gray-800"></div>
                      <div className="absolute inset-4 rounded-full border border-gray-800"></div>
                    </div>
                  </div>
                </div>
                <span
                  className={`mt-4 px-3 py-1 rounded-full text-center font-medium text-xs md:text-sm transition-all duration-300 backdrop-blur-sm border ${isActive
                      ? "text-orange-200 bg-black/40 border-orange-500/30"
                      : "text-orange-400/90 bg-black/30 border-white/10 group-hover:text-orange-200 group-hover:bg-black/40"
                    }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {[
            { key: "all", label: "All Time" },
            { key: "1year", label: "Last Year" },
            { key: "6months", label: "Last 6 Months" },
            { key: "1month", label: "Last Month" },
          ].map((opt) => (
            <span key={opt.key} className="group">
              <button
                onClick={() => setPeriodo(opt.key)}
                className="relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 blur opacity-0 transition-opacity ${periodo === opt.key ? "opacity-70" : "group-hover:opacity-60"}`}
                ></div>
                <div
                  className={`relative rounded-full backdrop-blur-sm border px-4 py-2 ${periodo === opt.key
                      ? "bg-black/40 border-orange-500/50 text-white"
                      : "bg-black/20 border-white/10 text-orange-300"
                    }`}
                >
                  {opt.label}
                </div>
              </button>
            </span>
          ))}
        </div>

        {/* Lista de músicas com destaque escalonado */}
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl border border-orange-500/20 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {/* Top 1 – destaque máximo */}
            {lista[0] && (
              <li>
                <Link
                  href={`/artista/${encodeURIComponent(lista[0].artista)}`}
                  className="block p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 text-yellow-300 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-xl p-5 border border-orange-500/30 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-orange-300">#1</span>
                        <div>
                          <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-pink-200">
                            {lista[0].musica}
                          </div>
                          <div className="text-orange-300 text-sm mt-1">by {lista[0].artista}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-orange-200 text-sm flex flex-wrap gap-4">
                      <span>Played <span className="font-medium">{lista[0].numeroRepetido}</span> times</span>
                      <span>Listened for ~<span className="font-medium">{Math.floor(lista[0].tempoOuvido)}</span> min</span>
                    </div>
                  </div>
                </Link>
              </li>
            )}

            {/* Top 2 e Top 3 – destaque intermediário */}
            {lista.slice(1, 3).map((music, idx) => (
              <li key={music.musica + music.artista}>
                <Link
                  href={`/artista/${encodeURIComponent(music.artista)}`}
                  className="block px-6 py-4 relative overflow-hidden group hover:bg-white/5 transition-colors"
                >
                  <div className="bg-orange-500/5 rounded-lg p-3 border border-orange-500/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-orange-400">#{idx + 2}</span>
                        <div>
                          <div className="text-lg md:text-xl font-medium text-orange-200 group-hover:text-orange-100 transition-colors">
                            {music.musica}
                          </div>
                          <div className="text-orange-400 text-sm">by {music.artista}</div>
                        </div>
                      </div>
                      <div className="text-orange-200 text-sm flex flex-wrap gap-4">
                        <span>Played <span className="font-medium">{music.numeroRepetido}</span> times</span>
                        <span>~<span className="font-medium">{Math.floor(music.tempoOuvido)}</span> min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}

            {/* Top 4 e Top 5 – destaque leve */}
            {lista.slice(3, 5).map((music, idx) => (
              <li key={music.musica + music.artista}>
                <Link
                  href={`/artista/${encodeURIComponent(music.artista)}`}
                  className="block px-6 py-4 relative overflow-hidden group hover:bg-white/5 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-orange-400">#{idx + 4}</span>
                      <div>
                        <div className="text-lg font-medium group-hover:text-orange-300 transition-colors">
                          {music.musica}
                        </div>
                        <div className="text-gray-400 text-sm">by {music.artista}</div>
                      </div>
                    </div>
                    <div className="text-orange-200 text-sm flex flex-wrap gap-4">
                      <span>Played <span className="font-medium">{music.numeroRepetido}</span> times</span>
                      <span>~<span className="font-medium">{Math.floor(music.tempoOuvido)}</span> min</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}

            {/* Top 6 a 100 – estilo neutro */}
            {lista.slice(5).map((music, idx) => (
              <li key={music.musica + music.artista}>
                <Link
                  href={`/artista/${encodeURIComponent(music.artista)}`}
                  className="block px-6 py-3 relative overflow-hidden group hover:bg-white/5 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-orange-400 font-bold w-8">#{idx + 6}</span>
                      <div>
                        <div className="font-medium group-hover:text-orange-300 transition-colors">
                          {music.musica}
                        </div>
                        <div className="text-gray-500 text-sm">by {music.artista}</div>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm flex flex-wrap gap-4">
                      <span>{music.numeroRepetido} plays</span>
                      <span>{Math.floor(music.tempoOuvido)} min</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}