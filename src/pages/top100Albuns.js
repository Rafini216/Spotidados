import { top100Albums } from "../utils/dataProcessing.js";
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Defina seus links de navegação
const links = [
  { href: '/', label: 'Home' },
  { href: '/artistas', label: 'Artistas' },
  { href: '/albuns', label: 'Álbuns' },
  // adicione conforme necessário
];

export default function Home() {
  const pathname = usePathname(); // ✅ agora está sendo usado
  const topAlbums = top100Albums(); // ✅ chamada direta (sem getStaticProps)

  return (
    <div className="min-h-screen bg-gradient-to-br to-black text-white p-4">
      <style jsx global>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho com botões em formato de vinil */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 mt-8">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className="group flex flex-col items-center">
                  {/* Disco de vinil */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24">
                    <div className={`absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-0 transition-opacity duration-300 ${
                      isActive ? 'opacity-70' : 'group-hover:opacity-60'
                    }`}></div>

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
                            <span className="text-white text-[10px] font-bold">B4F</span>
                          </div>
                        </div>
                        <div className="absolute inset-2 rounded-full border border-gray-800"></div>
                        <div className="absolute inset-4 rounded-full border border-gray-800"></div>
                      </div>
                    </div>
                  </div>

                  <span className={`mt-3 text-center font-medium text-sm md:text-base transition-colors ${
                    isActive 
                      ? 'text-orange-200' 
                      : 'text-orange-400 group-hover:text-orange-200'
                  }`}>
                    {item.label}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>

        {/* Lista de álbuns — APENAS UMA VEZ */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-orange-500/20 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {topAlbums.map((album, i) => (
              <li key={`${album.album}-${album.artista}`} className="group">
                <Link href={`/album/${encodeURIComponent(album.album)}-${encodeURIComponent(album.artista)}`}>
                  <a className="block px-6 py-4 relative overflow-hidden transition-all duration-300 hover:bg-white/5">
                    <div className="absolute inset-0 -left-full group-hover:left-0 transition-left duration-500 ease-out bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"></div>
                    <div className="relative flex justify-between items-center flex-wrap gap-y-1">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-orange-400 font-bold w-8">#{i + 1}</span>
                        <div className="min-w-0">
                          <div className="font-medium text-lg group-hover:text-orange-300 transition-colors truncate">
                            {album.album}
                          </div>
                          <div className="text-sm text-gray-400 truncate">
                            por {album.artista}
                          </div>
                        </div>
                      </div>
                      <div className="text-orange-200 text-sm flex gap-3 whitespace-nowrap">
                        <span>Plays: {album.numeroRepetido}</span>
                        <span>Time: {Math.floor(album.tempoOuvido)}h</span>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}