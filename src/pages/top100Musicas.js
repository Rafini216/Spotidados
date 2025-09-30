import { top100Musicas } from "../utils/dataProcessing.js"
import dadosHistory from "../data/history.json"
import Link from "next/link";


export default function Home() {
    const topMusicas = top100Musicas(dadosHistory, 100);

    return (
        <main className="p-6">
            <div className="flex space-x-6 mb-4">
                <Link href="/top100Artistas">
                    <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600">Top 100 Artists</h1>
                </Link>
                <Link href="/top100Musicas">
                    <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600">Top 100 Musics</h1>
                </Link>
                <Link href="/top100Albuns">
                    <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600">Top 100 Albums</h1>
                </Link>
            </div>
            <ul className="space-y-2">
                {topMusicas.map((music, i) => (
                    <li key={`${music.musica}  ${music.album}  ${music.artista}` } className="flex justify-between border-b pb-1">
                        <span>{i + 1}. {music.musica} {music.album} {music.artista}  </span>
                        <span className="text-gray-500">{music.count}</span>
                    </li>
                ))}
            </ul>
        </main>
    );
}