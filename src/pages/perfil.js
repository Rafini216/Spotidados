"use client";

import { useState } from "react";
import Image from "next/image";

export default function Perfil() {
  const [nome, setNome] = useState("Vick");
  const [editando, setEditando] = useState(false);
  const [nomeTemp, setNomeTemp] = useState(nome);

  const handleSalvar = () => {
    setNome(nomeTemp);
    localStorage.setItem("spotidados-nome", nomeTemp);
    setEditando(false);
  };

  const handleCancelar = () => {
    setNomeTemp(nome);
    setEditando(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-black/30 backdrop-blur-lg rounded-2xl border border-orange-500/30 shadow-2xl overflow-hidden">
        {/* Cabeçalho decorativo */}
        <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 px-6 py-4 border-b border-orange-500/20">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-300">
            👤 Meu Perfil
          </h1>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-gray-300 mb-8 text-center md:text-left">
            Gerencie suas informações pessoais e preferências musicais
          </p>

          {/* Avatar + Nome */}
          <div className="flex flex-col items-center mb-10">
            {/* Avatar com efeito de halo (igual à home) */}
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative">
                <Image
                  src="/perfil.jpeg"
                  alt="Avatar do usuário"
                  width={120}
                  height={120}
                  className="relative w-38 h-38 rounded-full border-4 shadow-2xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Nome editável */}
            <div className="text-center">
              {editando ? (
                <div className="flex flex-col items-center gap-3">
                  <input
                    type="text"
                    value={nomeTemp}
                    onChange={(e) => setNomeTemp(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-orange-500/50 rounded-lg text-white text-xl font-bold text-center focus:outline-none focus:ring-2 focus:ring-orange-500/70"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSalvar}
                      className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition shadow-md"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleCancelar}
                      className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-5xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-300 mb-2">
                    {nome}
                  </h2>
                  <button
                    onClick={() => {
                      setEditando(true);
                      setNomeTemp(nome);
                    }}
                    className="text-orange-400 hover:text-orange-300 text-sm font-medium transition flex items-center gap-1"
                  >
                    ✏️ Editar nome
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Seção de informações */}
          <div className="space-y-4">
            <div className="bg-orange-500/8 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold text-orange-400 mb-1">📧 E-mail</h3>
              <p className="text-gray-300">vick@example.com</p>
            </div>
            <div className="bg-pink-500/8 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold text-orange-400 mb-1">
                🎵 Artista favorito
              </h3>
              <p className="text-gray-300">Kendrick Lamar</p>
            </div>
            <div className="bg-blue-500/8 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold text-orange-400 mb-1">
                🎧 Total de músicas ouvidas
              </h3>
              <p className="text-gray-300">12.487</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
