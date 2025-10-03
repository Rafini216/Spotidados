import React from "react";
import { top100Artistas, getSeasonDates } from "../utils/dataProcessing";
import { useState } from "react";



export default function Seasons() {
    const [year, setYear] = useState(2023)
  const winter = getSeasonDates("winter", year);
  const spring = getSeasonDates("spring", year);
  const summer = getSeasonDates("summer", year);
  const autumn = getSeasonDates("autumn", year);

  const winterTop10 = top100Artistas(winter.inicio, winter.fim).slice(0, 10);
  const springTop10 = top100Artistas(spring.inicio, spring.fim).slice(0, 10);
  const summerTop10 = top100Artistas(summer.inicio, summer.fim).slice(0, 10);
  const autumnTop10 = top100Artistas(autumn.inicio, autumn.fim).slice(0, 10);
    ;
  return (
    
   <div className="min-h-screen bg-gradient-to-br to-black text-white p-4">
          <div className="mb-4 flex gap-2">
        <button onClick={() => setYear(year - 1)} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">Previous Year</button>
        <span className="px-4 py-1 font-bold text-orange-400">{year}</span>
        <button onClick={() => setYear(year + 1)} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">Next Year</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold text-blue-200 mb-2 text-center">Winter</h2>
          <ul className="space-y-2">
            {winterTop10.map((artist, i) => (
              <li key={artist.artista} className="bg-blue-900/30 rounded px-2 py-1">
                {i + 1}. {artist.artista} <span className="text-xs text-blue-200">({artist.numeroRepetido})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-green-200 mb-2 text-center">Spring</h2>
          <ul className="space-y-2">
            {springTop10.map((artist, i) => (
              <li key={artist.artista} className="bg-green-900/30 rounded px-2 py-1">
                {i + 1}. {artist.artista} <span className="text-xs text-green-200">({artist.numeroRepetido})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-200 mb-2 text-center">Summer</h2>
          <ul className="space-y-2">
            {summerTop10.map((artist, i) => (
              <li key={artist.artista} className="bg-yellow-900/30 rounded px-2 py-1">
                {i + 1}. {artist.artista} <span className="text-xs text-yellow-200">({artist.numeroRepetido})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-orange-200 mb-2 text-center">Autumn</h2>
          <ul className="space-y-2">
            {autumnTop10.map((artist, i) => (
              <li key={artist.artista} className="bg-orange-900/30 rounded px-2 py-1">
                {i + 1}. {artist.artista} <span className="text-xs text-orange-200">({artist.numeroRepetido})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}