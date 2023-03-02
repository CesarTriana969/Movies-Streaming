const Movies = require('../models/movies.models')
const MovieGenres = require('../models/movie_genres.models')
const uuid = require('uuid')
const Genres = require('../models/genres.models')


const findAllMovies = async (limit, offset) => {
  // limit -> Cuantos quiero mostrar
  // offset -> Donde empiezo a mostrar


  // const queryOptions = {
  //     limit: limit || 20,
  //     offset: offset || 0
  // }
  [Op]
  const data = await Movies.findAndCountAll()
  return data
}

const createMovie = async (movieObj) => {
  const newMovie = {
    id: uuid.v4(),
    title: movieObj.title,
    synopsis: movieObj.synopsis,
    releaseYear: movieObj.releaseYear,
    director: movieObj.director,
    duration: movieObj.duration,
    trillerUrl: movieObj.trillerUrl,
    coverUrl: movieObj.coverUrl,
    movieUrl: movieObj.movieUrl,
    classification: movieObj.classification,
    rating: movieObj.rating
  }
  const data = await Movies.create(newMovie)
  return data
}

const addGenreToMovie = async (dataObj) => {
  const data = await MovieGenres.create({
    id: uuid.v4(),
    movieId: dataObj.movieId,
    genreId: dataObj.genreId
  })
  return data
}

const findAllMoviesByGenre = async (genreId) => {
  const data = await Movies.findAll({
    include: {
      model: Genres,
      where: {
        id: genreId
      }
    }
  })
  return data
}


module.exports = {
  findAllMovies,
  createMovie,
  addGenreToMovie,
  findAllMoviesByGenre
}