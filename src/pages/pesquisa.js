// src/app/pesquisa/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Pesquisa() {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = () => {
    if (termo.trim()) {
      setResultados([
        { id: 1, tipo: "Artist", nome: "Kendrick Lamar", imagem: "/kd.jpeg" },
        { id: 2, tipo: "Music", nome: "HUMBLE.", artista: "Kendrick Lamar" },
        { id: 3, tipo: "Album", nome: "DAMN.", artista: "Kendrick Lamar" },
      ]);
    } else {
      setResultados([]);
    }
  };

  const limparBusca = () => {
    setTermo("");
    setResultados([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-black/30 backdrop-blur-lg rounded-2xl border border-orange-500/30 shadow-2xl overflow-hidden">
        {/* Cabeçalho decorativo */}
        <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 px-6 py-3 border-b border-orange-500/20">
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-300">
            🔍 Search
          </h1>
        </div>

        <div className="p-5 md:p-6">
          <p className="text-gray-300 mb-6 text-center md:text-left text-sm md:text-base">
            Find your favorite artists, songs, and albums
          </p>

          {/* Ícone temático de música/pesquisa */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Halo sutil */}
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-40"></div>
              
              {/* Ícone de ondas sonoras estilizado */}
              <div className="relative flex items-end justify-center w-18 h-18">
                <div className="w-2 bg-orange-400 rounded-full animate-pulse" style={{ height: '60%', animationDelay: '0s' }}></div>
                <div className="w-2 bg-pink-400 rounded-full mx-1 animate-pulse" style={{ height: '80%', animationDelay: '0.2s' }}></div>
                <div className="w-2 bg-orange-400 rounded-full animate-pulse" style={{ height: '70%', animationDelay: '0.4s' }}></div>
                <div className="w-2 bg-pink-400 rounded-full mx-1 animate-pulse" style={{ height: '90%', animationDelay: '0.6s' }}></div>
                <div className="w-2 bg-orange-400 rounded-full animate-pulse" style={{ height: '65%', animationDelay: '0.8s' }}></div>
              </div>
            </div>
          </div>

          {/* Campo de busca compacto */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={termo}
                onChange={(e) => setTermo(e.target.value)}
                placeholder="Artist, music or album..."
                className="w-full px-4 py-2 bg-white/10 border border-orange-500/40 rounded-lg text-white text-base placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500/60 transition pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400">🔍</span>
              {termo && (
                <button
                  onClick={limparBusca}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-sm"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={handleBuscar}
              disabled={!termo.trim()}
              className={`mt-3 w-full py-2 text-sm font-medium rounded-lg transition ${
                termo.trim()
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-700 cursor-not-allowed text-gray-400"
              }`}
            >
              Search
            </button>
          </div>

          {/* Resultados */}
          {resultados.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              <h3 className="text-sm font-semibold text-orange-400 mb-2">Results:</h3>
              {resultados.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {item.imagem && (
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        width={42}
                        height={30}
                        className="rounded-full border border-white/20"
                      />
                    )}
                    <div>
                      <div className="font-medium text-sm">{item.nome}</div>
                      <div className="text-xs text-gray-400">
                        {item.tipo} • {item.artista || ""}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : termo ? (
            <div className="text-center py-6 text-gray-400 text-sm">
              No results for &quot;{termo}&quot;
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 italic text-sm">
              Search for anything...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}