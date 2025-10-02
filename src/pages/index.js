// src/app/page.js
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  tempoTotal,
  todosArtistas,
  contarTotalMusicas,
} from "../utils/dataProcessing";

export async function getStaticProps() {
  const tempo = Math.floor(tempoTotal() / 1000 / 60);
  const artistas = todosArtistas().length;
  const musicas = await contarTotalMusicas();
  return {
    props: { tempo, artistas, musicas },
  };
}

export default function Home({ tempo, artistas, musicas }) {
  const [nomeUsuario, setNomeUsuario] = useState("Vick");
  const [ativoIndex, setAtivoIndex] = useState(0);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("spotidados-nome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  // Loop 4 segundos por item
  useEffect(() => {
    const interval = setInterval(() => {
      setAtivoIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const dados = [
    { valor: musicas, label: "Total de reproduções", cor: "from-green-500 to-emerald-500" },
    { valor: tempo, label: "Minutos ouvidos", cor: "from-blue-500 to-cyan-500" },
    { valor: artistas, label: "Artistas ouvidos", cor: "from-amber-400 to-orange-500" },
  ];

  const renderIcone = (index) => {
    switch (index) {
      case 0:
        return (
          <svg className="w-6 h-6" viewBox="0 0 100 100">
            <path d="M20,50 A30,30 0 1,1 80,50" fill="none" stroke="white" strokeWidth="2"/>
            <path d="M75,55 L85,50 L75,45" fill="white" />
          </svg>
        );
      case 1:
        // Ícone de relógio
        return (
          <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        );
      case 2:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="gold">
            <path d="M5,13L7,7L12,10L17,7L19,13L12,15M12,3L9,9L3,10L6,14L4,20L12,18L20,20L18,14L21,10L15,9L12,3Z" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Perfil */}
        <div className="flex flex-col items-center gap-10">
          <section className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
              <Image
                src="/perfil.jpeg"
                alt="Avatar"
                width={140}
                height={140}
                className="relative w-32 h-32 rounded-full border-4 shadow-2xl"
              />
            </div>
            <p className="text-3xl mt-4 text-white/90">Seja bem vinda!</p>
            <h2 className="font-bold text-5xl bg-clip-text text-transparent p-1.5 bg-gradient-to-r from-orange-400 to-pink-300">
              {nomeUsuario}
            </h2>
          </section>

          {/* Vinil estilizado — agora com animação de rotação */}
          <section>
            <div className="relative w-48 h-48 flex items-center justify-center mt-8">
              <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 shadow-2xl"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-36 h-36">
                {/* Disco girando suavemente */}
                <div className="w-full h-full rounded-full bg-black relative overflow-hidden animate-spin-slow">
                  <div className="absolute top-4 left-6 w-8 h-8 rounded-full bg-white/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B4F</span>
                    </div>
                  </div>
                  <div className="absolute inset-4 rounded-full border border-gray-800"></div>
                  <div className="absolute inset-8 rounded-full border border-gray-800"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Métricas com efeito em cascata */}
        <section className="flex flex-col items-center lg:items-start">
          <h3 className="text-2xl font-bold mb-6 text-white text-center lg:text-left">
            Principais dados:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 w-full max-w-md">
            {dados.map((item, index) => (
              <div
                key={index}
                className={`text-center p-5 rounded-2xl backdrop-blur-lg border border-white/10 transition-all duration-700 relative overflow-hidden ${
                  ativoIndex === index
                    ? "scale-105 shadow-2xl bg-gradient-to-b from-white/10 to-white/20"
                    : "scale-100 bg-gradient-to-b from-white/5 to-white/10"
                }`}
              >
                {/* Halo de destaque */}
                {ativoIndex === index && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl blur opacity-60 animate-pulse"></div>
                )}

                <div className="relative z-10">
                  <div className="flex justify-center mb-3">
                    <div className="relative w-12 h-12">
                      <div className="w-full h-full rounded-full bg-black"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.cor} flex items-center justify-center`}>
                          {renderIcone(index)}
                        </div>
                      </div>
                      {/* Brilho para os discos */}
                      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/30"></div>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-white mb-1">
                    {item.valor}
                  </div>
                  <div className="text-white/80 text-sm">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Estilo da animação de rotação lenta */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}