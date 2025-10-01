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



// top 100 artistas


export function top100Artistas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }


  const contagemArtistas = dadosHistory.reduce((acc, data) => {
    const artista = data.master_metadata_album_artist_name
    const key =  artista;
    if (!acc[key])
      acc[key] = {
        artista: artista,
        numeroRepetido: 0,
        tempoOuvido: 0,
        datas: []
      }
    acc[key].numeroRepetido++
    acc[key].tempoOuvido += data.ms_played / 1000 / 60 / 60
    acc[key].datas.push(data.ts)

    return acc
  }, {})

  return Object.values(contagemArtistas)
    .sort((a, b) => b.numeroRepetido - a.numeroRepetido)
    .slice(0, 100);
}





// top 100 musicas

export function top100Musicas() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }


  const contagemMusicas = dadosHistory.reduce((acc, data) => {
    const musica = data.master_metadata_track_name
    const album = data.master_metadata_album_album_name
    const artista = data.master_metadata_album_artist_name;

    if (musica && album && artista) {

      const key = `${musica}-${album}-${artista}`
      if (!acc[key]) {
        acc[key] = {
          album: album,
          artista: artista,
          musica: musica,
          numeroRepetido: 0,
          tempoOuvido: 0,
          datas: []
        }
}
        acc[key].numeroRepetido++
        acc[key].tempoOuvido += data.ms_played / 1000 / 60 / 60
        acc[key].datas.push(data.ts)



    }return acc
  }, {})


  return Object.values(contagemMusicas)
  .sort((a, b) => b.numeroRepetido - a.numeroRepetido)
  .slice(0, 100);
}





// top 100 albums

export function top100Albums() {
  if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }


  const contagemAlbums = dadosHistory.reduce((acc, data) => {
    const album = data.master_metadata_album_album_name
    const artista = data.master_metadata_album_artist_name;


    if (album && artista) {

      const key = `${album}-${artista}`;
      if (!acc[key])
        acc[key] = {
          album: album,
          artista: artista,
          numeroRepetido: 0,
          tempoOuvido: 0,
          datas: []
        }

      acc[key].numeroRepetido++
      acc[key].tempoOuvido += data.ms_played / 1000 / 60 / 60
      acc[key].datas.push(data.ts)

    }
    return acc
  }, {})

  return Object.values(contagemAlbums)

    .sort((a, b) => b.numeroRepetido - a.numeroRepetido)
    .slice(0, 100);
}



//top 20 de cada artista

export function PagArtista(nome) {
  

  
  const musicas = dadosHistory.filter(
    (musica) => musica.master_metadata_album_artist_name === nome
  );

   if (!dadosHistory || dadosHistory.length === 0) {
    return "Nenhum artista encontrado";
  }


  const contagemMusicas = musicas.reduce((acc, data) => {
    const musica = data.master_metadata_track_name
    const album = data.master_metadata_album_album_name

    if (musica) {

      const key = `${musica}-${album}`
      if (!acc[key]) {
        acc[key] = {
          album: album,
          
          musica: musica,
          numeroRepetido: 0,
          tempoOuvido: 0,
          datas: []
        }
}
        acc[key].numeroRepetido++
        acc[key].tempoOuvido += data.ms_played / 1000 / 60 / 60
        acc[key].datas.push(data.ts)



    }return acc
  }, {})


  return Object.values(contagemMusicas)
  .sort((a, b) => b.numeroRepetido - a.numeroRepetido)
  .slice(0, 20);
}



//build da página de cada artista e contar artistas

export function todosArtistas() {
  const artistaSet = new Set();

  dadosHistory.forEach(data => {
    if (data.master_metadata_album_artist_name) {
      artistaSet.add(data.master_metadata_album_artist_name);
    }
  });

  return Array.from(artistaSet);
}



//tempo total ouvido

export function tempoTotal(){
  return dadosHistory.reduce((acc, data) =>{
    return acc + (data.ms_played || 0)  / 1000 / 60 / 60
  }, 0)


}