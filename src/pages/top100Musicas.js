import { filtrarDatas, top100Musicas } from "../utils/dataProcessing.js";
import dadosHistory from "../data/history.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";

// Defina os links de navegação
const links = [
  { href: "/top100Artistas", label: "Top 100 Artists" },
  { href: "/top100Musicas", label: "Top 100 Musics" },
  { href: "/top100Albuns", label: "Top 100 Albums" },
  // Adicione mais conforme necessário
];

export default function Home() {
  const pathname = usePathname(); // ✅ agora está definido

  const [periodo, setPeriodo] = useState("all");

  const lista = useMemo(() => {
    const { inicio, fim } = filtrarDatas(periodo);
    return top100Musicas(inicio, fim);
  }, [periodo, dadosHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-br to-black text-white p-4">
      {/* Animação global */}
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

      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho com vinis */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 mt-8">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-0 transition-opacity duration-300 ${
                      isActive ? "opacity-70" : "group-hover:opacity-60"
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
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-700 flex items-center justify-center">
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

                <span
                  className={`mt-3 text-center font-medium text-sm md:text-base transition-colors ${
                    isActive
                      ? "text-orange-200"
                      : "text-orange-400 group-hover:text-orange-200"
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
                className="relative px-4 py-2 rounded-full font-medium text-sm text-orange-300 transition-all duration-300 overflow-hidden"
              >
                {/* Halo de gradiente (ativo ou hover) */}
                <div
                  className={`absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 blur opacity-0 transition-opacity ${
                    periodo === opt.key
                      ? "opacity-70"
                      : "group-hover:opacity-60"
                  }`}
                ></div>

                {/* Fundo do botão com backdrop blur */}
                <div
                  className={`relative rounded-full backdrop-blur-sm border px-4 py-2 ${
                    periodo === opt.key
                      ? "bg-black/40 border-orange-500/50 text-white"
                      : "bg-black/20 border-white/10"
                  }`}
                >
                  {opt.label}
                </div>
              </button>
            </span>
          ))}
        </div>

        {/* Lista de músicas — APENAS UMA VEZ */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-orange-500/20 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {lista.map((music, i) => (
              <li
                key={`${music.musica}-${music.album}-${music.artista}`}
                className="group"
              >
                <Link
                  href={`/artista/${encodeURIComponent(music.artista)}`}
                  className="block px-6 py-4 relative overflow-hidden transition-all duration-300 hover:bg-white/5"
                >
                  <div className="absolute inset-0 -left-full group-hover:left-0 transition-left duration-500 ease-out bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"></div>
                  <div className="relative flex justify-between items-center flex-wrap gap-y-1">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-orange-400 font-bold w-8">
                        #{i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-lg group-hover:text-orange-300 transition-colors truncate">
                          {music.musica}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {music.album} • {music.artista}
                        </div>
                      </div>
                    </div>
                    <div className="text-orange-200 text-sm flex gap-3 whitespace-nowrap">
                      <span>Plays: {music.numeroRepetido}</span>
                      <span>Time: {Math.floor(music.tempoOuvido)}m</span>
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
