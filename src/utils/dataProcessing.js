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


export function top100Artistas(inicio = null, fim = null) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }


  const contagemArtistas = dadosHistory.reduce((acc, data) => {
    const artista = data.master_metadata_album_artist_name
    const ultimaMusica = data.master_metadata_track_name
    const key = artista;
    if (!artista) return acc

    const dataTs = new Date(data.ts)
    if (inicio && fim && (dataTs < inicio || dataTs > fim)) {

      return acc
    }
    if (!acc[key])

      acc[key] = {
        artista: artista,
        numeroRepetido: 0,
        tempoOuvido: 0,
        ultimaMusicaOuvida: ultimaMusica

      }


    acc[key].numeroRepetido++

    acc[key].tempoOuvido += data.ms_played / 1000 / 60

    acc[key].ultimaMusicaOuvida= !acc[key].ultimaMusicaOuvida || new Date(data.ts) > new Date(acc[key].ultimaMusicaOuvida) ? ultimaMusica : acc[key].ultimaMusicaOuvida

    return acc
  }, {})

  return Object.values(contagemArtistas)
    .sort((a, b) => b.numeroRepetido - a.numeroRepetido)
    .slice(0, 100)
}





// top 100 musicas

export function top100Musicas(inicio = null, fim = null) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }


  const contagemMusicas = dadosHistory.reduce((acc, data) => {
    const dataTs = new Date(data.ts)
    if (inicio && fim && (dataTs < inicio || dataTs > fim)) {

      return acc
    }

    const musica = data.master_metadata_track_name
    const album = data.master_metadata_album_album_name
    const artista = data.master_metadata_album_artist_name


    if (musica && album && artista) {

      const key = `${musica}-${album}-${artista}`
      if (!acc[key]) {
        acc[key] = {
          album: album,
          artista: artista,
          musica: musica,
          numeroRepetido: 0,
          tempoOuvido: 0,
          
        }
      }
      acc[key].numeroRepetido++
      acc[key].tempoOuvido += data.ms_played / 1000 / 60 



    } return acc
  }, {})


  return Object.values(contagemMusicas)
    .sort((a, b) => b.tempoOuvido - a.tempoOuvido)
    .slice(0, 100);
}





// top 100 albums

export function top100Albums(inicio=null, fim=null) {
  if (!dadosHistory || dadosHistory.length === 0) {
    return [];
  }


  const contagemAlbums = dadosHistory.reduce((acc, data) => {
    const ultimaMusica = data.master_metadata_track_name
    const album = data.master_metadata_album_album_name
    const artista = data.master_metadata_album_artist_name;

    const dataTs = new Date(data.ts)
    if (inicio && fim && (dataTs < inicio || dataTs > fim)) {

      return acc
    }

    if (album && artista) {

      const key = `${album}-${artista}`;
      if (!acc[key])
        acc[key] = {
          album: album,
          artista: artista,
          numeroRepetido: 0,
          tempoOuvido: 0,
          ultimaMusicaOuvida: ultimaMusica
        }

      acc[key].numeroRepetido++
      acc[key].tempoOuvido += data.ms_played / 1000 / 60
      acc[key].ultimaMusicaOuvida= !acc[key].ultimaMusicaOuvida || new Date(data.ts) > new Date(acc[key].ultimaMusicaOuvida) ? ultimaMusica : acc[key].ultimaMusicaOuvida 
    }
    return acc
  }, {})

  return Object.values(contagemAlbums)

    .sort((a, b) => b.tempoOuvido - a.tempoOuvido)
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

        }
      }
      acc[key].numeroRepetido++
      acc[key].tempoOuvido += data.ms_played / 1000 / 60




    } return acc
  }, {})



  return Object.values(contagemMusicas)
    .sort((a, b) => b.tempoOuvido - a.tempoOuvido)
    .slice(0, 20);


}

export function vezesTocado(name) {

}

//contar artistas

export function todosArtistas() {
  const artistaSet = new Set();

  dadosHistory.forEach(data => {
    if (data.master_metadata_album_artist_name) {
      artistaSet.add(data.master_metadata_album_artist_name);
    }
  });

  return Array.from(artistaSet);
}

//contar musicas
export function musicasDiferentes(nome) {
  const musicaSet = new Set()
  dadosHistory.forEach(data => {
    if (data.master_metadata_album_artist_name === nome) {

      const musica = data.master_metadata_track_name
      if (musica) {
        musicaSet.add(musica)
      }
    }

  })
  return musicaSet.size
}

//tempo total ouvido

export function tempoTotal() {
  return dadosHistory.reduce((acc, data) => {
    return acc + (data.ms_played || 0)
  }, 0)


}

//tempo e repeats de cada artista
export function tempoERepeatsArtista(nome) {
  return dadosHistory.reduce((acc, data) => {
    if (data.master_metadata_album_artist_name === nome) {
      acc.tempo += data.ms_played || 0
      acc.repeats++
      return acc
    }
    return acc
  }, { tempo: 0, repeats: 0 })
}


export function percentagemArtista(nome) {
  const artista = tempoERepeatsArtista(nome)
  const total = tempoTotal()
  return (artista.tempo / total) * 100
}


export function filtrarDatas(periodo) {
  const fim = new Date("2024-1-18")
  if (periodo === "all") {
    return { inicio: null, fim: null }
  }

  if (periodo === "1month") {
    const inicio = new Date("2024-1-18")
    inicio.setMonth(fim.getMonth() - 1)
    return { inicio, fim }
  }
  if (periodo === "6months") {
    const inicio = new Date("2024-1-18")
    inicio.setMonth(fim.getMonth() - 6)
    return { inicio, fim }
  }
  if (periodo === "1year") {
    const inicio = new Date("2024-1-18")
    inicio.setFullYear(fim.getFullYear() - 1)
    return { inicio, fim }
  }


}
