import { filtrarDatas, top100Albums } from "../utils/dataProcessing.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";


// Defina seus links de navegação
const links = [
  { href: "/top100Artistas", label: "Top 100 Artists" },
  { href: "/top100Musicas", label: "Top 100 Musics" },
  { href: "/top100Albuns", label: "Top 100 Albums" },
  // adicione conforme necessário
];

export default function Home() {
  const [periodo, setPeriodo] = useState("all");


  const lista = useMemo(() => {
    const { inicio, fim } = filtrarDatas(periodo);
    return top100Albums(inicio, fim);
  }, [periodo]);

  const pathname = usePathname();


  return (
    <div className="min-h-screen bg-gradient-to-br to-black text-white p-4">
      <style jsx global>{`
        @keyframes vinylSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho com botões em formato de vinil */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 mt-8">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center"
              >
                {/* Disco de vinil */}
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-0 transition-opacity duration-300 ${isActive ? "opacity-70" : "group-hover:opacity-60"
                      }`}
                  ></div>

                  <div className="w-full h-full rounded-full bg-black relative overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    <div
                      className="absolute inset-0"
                      style={{
                        animation: "vinylSpin 8s linear infinite",
                        transformOrigin: "center",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.animationPlayState = "paused")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.animationPlayState = "running")
                      }
                    >
                      <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-white/30"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-pink-700 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">
                            B4F
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-2 rounded-full border border-gray-800"></div>
                      <div className="absolute inset-4 rounded-full border border-gray-800"></div>
                    </div>
                  </div>
                </div>

                {/*Label estilizada */}
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

        {/* Filtros — estilizados para combinar com o tema */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {[
            { key: "all", label: "All Time" },
            { key: "1year", label: "Last Year" },
            { key: "6months", label: "Last 6 Months" },
            { key: "1month", label: "Last Month" },
          ].map((opt) => (
            <span key={opt.key} className="group">
              <button
                onClick={() => setPeriodo(opt.key)}
                className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden ${periodo === opt.key ? "text-white" : "text-orange-300"
                  }`}
              >
                {/* Halo de destaque (ativo ou hover) */}
                <div
                  className={`absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 blur opacity-0 transition-opacity ${periodo === opt.key
                      ? "opacity-70"
                      : "group-hover:opacity-60"
                    }`}
                ></div>

                {/* Fundo do botão */}
                <div
                  className={`relative rounded-full backdrop-blur-sm border ${periodo === opt.key
                      ? "bg-black/40 border-orange-500/50"
                      : "bg-black/20 border-white/10"
                    } px-4 py-2`}
                >
                  {opt.label}
                </div>
              </button>
            </span>
          ))}
        </div>

        {/* Lista de álbuns */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-orange-500/20 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {/* Top 1 */}
            {lista.slice(0, 1).map((album, i) => (
              <li key={album.artista} className="group">
                {/* Top 1 style aqui */}
                <Link
                  href={`/artista/${encodeURIComponent(album.artista)}`}
                  className="block px-6 py-4 relative overflow-hidden transition-all duration-300 hover:bg-white/5"
                >
                  {/* style conteúdo aqui*/}
                  <div className="relative flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-orange-400 font-bold w-8">
                        #{i + 1}
                      </span>
                      <span className="font-medium text-lg group-hover:text-orange-300 transition-colors">
                        {album.artista}
                      </span>
                    </div>
                    <div className="text-orange-200 text-sm flex gap-3">
                      <span>Last song played: {album.ultimaMusicaOuvida}</span>
                      <span>Plays: {album.numeroRepetido}</span>
                      <span>Time: {Math.floor(album.tempoOuvido)}m</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {/* Top 2-5 */}
            {lista.slice(1, 5).map((album, i) => (
              <li key={album.artista} className="group">
                {/* Top 2-5 style aqui */}
                <Link
                  href={`/artista/${encodeURIComponent(album.artista)}`}
                  className="block px-6 py-4 relative overflow-hidden transition-all duration-300 hover:bg-white/5"
                >
                  {/* style conteudo aqui */}
                  <div className="relative flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-orange-400 font-bold w-8">
                        #{i + 2}
                      </span>
                      <span className="font-medium text-lg group-hover:text-orange-300 transition-colors">
                        {album.artista}
                      </span>
                    </div>
                    <div className="text-orange-200 text-sm flex gap-3">
                      <span>Last song played: {album.ultimaMusicaOuvida}</span>
                      <span>Plays: {album.numeroRepetido}</span>
                      <span>Time: {Math.floor(album.tempoOuvido)}m</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {/* Rest 6-100 */}
            {lista.slice(5).map((album, i) => (
              <li key={album.artista} className="group">
                {/* 6-100 style aqui */}
                <Link
                  href={`/artista/${encodeURIComponent(album.artista)}`}
                  className="block px-6 py-4 relative overflow-hidden transition-all duration-300 hover:bg-white/5"
                >
                  {/* style conteudo aqui */}
                  <div className="relative flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-orange-400 font-bold w-8">
                        #{i + 6}
                      </span>
                      <span className="font-medium text-lg group-hover:text-orange-300 transition-colors">
                        {album.artista}
                      </span>
                    </div>
                    <div className="text-orange-200 text-sm flex gap-3">
                      <span>Last song played: {album.ultimaMusicaOuvida}</span>
                      <span>Plays: {album.numeroRepetido}</span>
                      <span>Time: {Math.floor(album.tempoOuvido)}m</span>
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