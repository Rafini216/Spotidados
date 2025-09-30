import dadosHistory from "../data/history.json"

export function contarTotalMusicas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return 0;
  }
  return dadosHistory.length;
}

export function obterPrimeiraMusica() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhuma música encontrada";
  }
  return dadosHistory[0]?.master_metadata_track_name || "Música desconhecida";
}

export function encontrarArtistaMaisOuvido() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }
  const contagemArtistas = {};
  
  dadosHistory.forEach(musica => {
    const artista = musica.master_metadata_album_artist_name;
    if (artista) {
      contagemArtistas[artista] = (contagemArtistas[artista] || 0) + 1;
    }
  });

  let artistaMaisOuvido = "Nenhum artista encontrado";
  let maiorContagem = 0;
  
  for (const artista in contagemArtistas) {
    if (contagemArtistas[artista] > maiorContagem) {
      maiorContagem = contagemArtistas[artista];
      artistaMaisOuvido = artista;
    }
  }

  return artistaMaisOuvido;
}

export function top100Artistas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }
  
  
  const contagemArtistas = dadosHistory.reduce((acc, data) => { 
    const artista = data.master_metadata_album_artist_name
    if (artista){
      acc[artista]=(acc[artista]||0)+1
      
    }
    return acc
  }, {})

 return Object.entries(contagemArtistas)
    .map(([artista, count]) => ({ artista, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 100);
  }


  export function top100Musicas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }
  
  
  const contagemMusicas = dadosHistory.reduce((acc, data) => { 
    const musica = data.master_metadata_track_name
    const album = data.master_metadata_album_album_name
     const artista = data.master_metadata_album_artist_name;

    if (musica && artista &&album ) {
      
      const key = `${musica}|||${artista} || ${album}`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc
  }, {})

 return Object.entries(contagemMusicas)
    .map(([musica, count]) => ({ musica, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 100);
  }


    export function top100Albums() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }
  
  
  const contagemAlbums = dadosHistory.reduce((acc, data) => { 
    const album = data.master_metadata_album_album_name
     const artista = data.master_metadata_album_artist_name;

    if (album && artista) {
      
      const key = `${album}|||${artista}`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc
  }, {})

 return Object.entries(contagemAlbums)
    .map(([album, count]) => ({ album, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 100);
  }