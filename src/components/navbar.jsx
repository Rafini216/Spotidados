// src/components/navbar.js
export default function Navbar() {
  return (
    <header className="bg-black/50 backdrop-blur-md text-white py-4 px-6 border-b-2 border-orange-500">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-3">
          {/* Ícone de vinil estilizado */}
          <div className="relative w-8 h-8">
            {/* Disco preto */}
            <div className="w-full h-full rounded-full bg-black"></div>

            {/* Rótulo central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            </div>

            {/* Faixas concêntricas */}
            <div className="absolute inset-1 rounded-full border border-gray-800"></div>
            <div className="absolute inset-2 rounded-full border border-gray-800"></div>

            {/* Brilho sutil */}
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/30"></div>
          </div>

          <span className="font-bold text-xl">SpotiDados</span>
        </a>
        {/* Efeito nos botões de texto */}
        <nav className="hidden md:flex gap-6">
          <a
            href="/top100Artistas"
            className="relative px-3 py-1.5 rounded-lg group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <span className="relative z-10 text-white hover:text-orange-300 transition-colors duration-300 font-medium">
              Top Lists
            </span>
          </a>

          <a href="/perfil" className="relative px-3 py-1.5 rounded-lg group">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <span className="relative z-10 text-white hover:text-orange-300 transition-colors duration-300 font-medium">
              Profile
            </span>
          </a>

          <a href="/pesquisa" className="relative px-3 py-1.5 rounded-lg group">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <span className="relative z-10 text-white hover:text-orange-300 transition-colors duration-300 font-medium">
              Search
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
