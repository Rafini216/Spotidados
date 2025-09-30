// src/components/navbar.js
export default function Navbar() {
  return (
    <header className="bg-black/50 backdrop-blur-md text-white py-4 px-6 border-b-2 border-orange-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Ícone de vinil estilizado */}
          <div className="relative w-8 h-8">
           {/* Disco preto */}
           <a href="/"> <div className="w-full h-full rounded-full bg-black"></div> </a>

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
        </div>

        <nav className="hidden md:flex gap-6">
          <a href="/top100Artistas">
            {" "}
            <button className="hover:text-orange-400 transition">
              Top Lists
            </button>
          </a>
          <a href="/perfil">
            <button className="hover:text-orange-400 transition">Perfil</button>
          </a>
          <a href="/pesquisa">
            <button className="hover:text-orange-400 transition">Buscar</button>
          </a>
        </nav>
      </div>
    </header>
  );
}
