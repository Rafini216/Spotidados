import { useEffect, useState } from "react";
import Image from "next/image";
import {
  tempoTotal,
  todosArtistas,
  contarTotalMusicas,
} from "../utils/dataProcessing";

export default function Home() {
  const [dados, setDados] = useState({
    total: 0,
    tempo: 0,
    artistas: 0,
  });

  useEffect(() => {
    async function carregarDados() {
      try {
        const total = await contarTotalMusicas();
        const tempo = await Math.floor(tempoTotal());
        const artistas = await todosArtistas().length;
        setDados({ total, tempo, artistas });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    carregarDados();
  }, []);

  return (
    //  Container principal com font-sans
    <div className="font-sans flex flex-col items-center justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Perfil */}
        <div className="flex flex-col items-center gap-10">
          {/* Avatar estilizado */}
          <section className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
              <Image
                src="/perfil.jpeg"
                alt="Avatar"
                width={140}
                height={140}
                className="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-lg mt-2 text-white/90">Seja bem vinda!</p>
            <h2 className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-300">
              Vick
            </h2>
          </section>

          {/* Vinil estilizado */}
          <section>
            {/* Capa do álbum + Vinil girando */}
            <div className="relative w-48 h-48 flex items-center justify-center mt-8">
              {/* Capa do álbum (fundo colorido ou imagem) */}
              <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 shadow-2xl"></div>

              {/* Disco de vinil girando, saindo da capa */}
              <div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                style={{ width: "140px", height: "140px" }}
              >
                <div className="w-full h-full rounded-full bg-black relative overflow-hidden vinyl-spin">
                  {/* Brilho no vinil */}
                  <div className="absolute top-4 left-6 w-8 h-8 rounded-full bg-white/20"></div>

                  {/* Rótulo central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B4F</span>
                    </div>
                  </div>

                  {/* Faixas concêntricas */}
                  <div className="absolute inset-4 rounded-full border border-gray-800"></div>
                  <div className="absolute inset-8 rounded-full border border-gray-800"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Métricas estilizadas com ícones de vinil */}
        <section className="flex flex-col items-center lg:items-start">
          <h3 className="text-2xl font-bold mb-6 text-white text-center lg:text-left">
            Alguns dados:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 w-full max-w-md">
            {/* Total de reproduções */}
            <div className="text-center p-5 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-gradient-to-b from-white/5 to-white/10">
              {/* Ícone: vinil com seta circular (reproduções) */}
              <div className="flex justify-center mb-3">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded-full bg-black"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  </div>
                  {/* Setas circulares */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M20,50 A30,30 0 1,1 80,50"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M75,55 L85,50 L75,45" fill="white" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {dados.total}
              </div>
              <div className="text-white/80 text-sm">Total de reproduções</div>
            </div>

            {/* Primeira música */}
            <div className="text-center p-5 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-gradient-to-b from-white/5 to-white/10">
              {/* Ícone: vinil com "1" */}
              <div className="flex justify-center mb-3">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded-full bg-black"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/30"></div>
                </div>
              </div>
              <div className="text-lg font-semibold text-white truncate mb-1">
                {dados.tempo}
              </div>
              <div className="text-white/80 text-sm">Horas ouvidas</div>
            </div>

            {/* Artista mais ouvido */}
            <div className="text-center p-5 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-gradient-to-b from-white/5 to-white/10">
              {/* Ícone: vinil com coroa */}
              <div className="flex justify-center mb-3">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded-full bg-black"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                      {/* Coroa SVG simples */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="gold"
                      >
                        <path
                          d="M5,13L7,7L12,10L17,7L19,13L12,15M12,3L9,9L3,10L6,14L4,20L12,18L20,20L18,14L21,10L15,9L12,3Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/30"></div>
                </div>
              </div>
              <div className="text-lg font-semibold text-white truncate mb-1">
                {dados.artistas}
              </div>
              <div className="text-white/80 text-sm">Artistas ouvidos</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
