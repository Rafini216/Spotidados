// src/app/pesquisa/page.js
"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Link from "next/link";
import { searchBar } from "@/utils/dataProcessing";

export default function Pesquisa() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const resultado = searchBar(inputText);

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



                    <div>
                        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
                            <h1 className="text-2xl font-bold text-center mb-6">
                                React Search Bar Example
                            </h1>
                        </div>
                        <TextField
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            onChange={inputHandler}
                        />

                        <div className="mt-8">
                            {inputText && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Artists */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-orange-400 mb-4">Artists</h2>
                                        <ul className="space-y-2">
                                            {resultado.artistas.length === 0 && (
                                                <li className="text-gray-400 italic">No artists found.</li>
                                            )}
                                            {resultado.artistas.map((a, i) => (
                                                <li key={i}>
                                                    <Link
                                                        href={`/artista/${encodeURIComponent(a.artista)}`}
                                                        className="block px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-orange-400/10 hover:from-orange-500/30 hover:to-orange-400/30 transition-colors border border-orange-500/20 text-orange-200 font-medium shadow"
                                                    >
                                                        {a.artista}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Songs */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-pink-400 mb-4">Songs</h2>
                                        <ul className="space-y-2">
                                            {resultado.musicas.length === 0 && (
                                                <li className="text-gray-400 italic">No songs found.</li>
                                            )}
                                            {resultado.musicas.map((m, i) => (
                                                <li key={i}>
                                                    <Link
                                                        href={`/artista/${encodeURIComponent(m.artista)}`}
                                                        className="block px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/10 to-pink-400/10 hover:from-pink-500/30 hover:to-pink-400/30 transition-colors border border-pink-500/20 text-pink-200 font-medium shadow"
                                                    >
                                                        {m.musica}
                                                        <span className="ml-2 text-xs text-gray-400">({m.artista})</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Albums */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-orange-300 mb-4">Albums</h2>
                                        <ul className="space-y-2">
                                            {resultado.albuns.length === 0 && (
                                                <li className="text-gray-400 italic">No albums found.</li>
                                            )}
                                            {resultado.albuns.map((al, i) => (
                                                <li key={i}>
                                                    <Link
                                                        href={`/artista/${encodeURIComponent(al.artista)}`}
                                                        className="block px-4 py-2 rounded-lg bg-gradient-to-r from-orange-300/10 to-pink-300/10 hover:from-orange-300/30 hover:to-pink-300/30 transition-colors border border-orange-300/20 text-orange-100 font-medium shadow"
                                                    >
                                                        {al.album}
                                                        <span className="ml-2 text-xs text-gray-400">({al.artista})</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}