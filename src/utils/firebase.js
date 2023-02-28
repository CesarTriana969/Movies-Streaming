const firebase = require('firebase/app')
const { getStorage, uploadBytes, ref, getDownloadURL } = require('firebase/storage')

const config = require('../../config').api.firebase

const firebaseApp = firebase.initializeApp(config)

const storage = getStorage(firebaseApp)

//? peliculas

const addToFirebaseMovieVideo = async (file) => {
  const movieRef = ref(storage, `movieVideos/${Date.now()}-${file.originalname}`)

  await uploadBytes(movieRef, file.buffer)
  const movieUrl = await getDownloadURL(movieRef)
  return movieUrl
}

//? cover pelicula

//? Serie - Name - Temporada - Cover
//? Serie - Name - Temporada - Capitulo