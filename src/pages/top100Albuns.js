import { top100Albums, } from "../utils/dataProcessing.js"
import dadosHistory from "../data/history.json"
import Link from "next/link";


export default function Home() {
    const topAlbums = top100Albums(dadosHistory, 100);

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
                {topAlbums.map((album, i) => (
                    <li key={`${album.album} - ${album.artista}`} className="flex justify-between border-b pb-1">
                        <span>{i + 1}. {album.album} {album.artista}</span>
                        <span className="text-gray-500">Plays: {album.numeroRepetido} | Time: {Math.floor(album.tempoOuvido)}H </span>
                    </li>
                ))}
            </ul>
        </main>
    ); F
}