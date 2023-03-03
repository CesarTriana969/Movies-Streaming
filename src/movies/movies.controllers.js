const Movies = require('../models/movies.models')
const MovieGenres = require('../models/movieGenres.models')
const uuid = require('uuid')
const Genres = require('../models/genres.models')
const { Op } = require('sequelize')


const findAllMovies = async (limit, offset, search) => {
  // limit -> Cuantos quiero mostrar
  // offset -> Donde empiezo a mostrar


  const queryOptions = {
    limit: limit,
    offset: offset,
    where: {},

  }

  if (search) {
    queryOptions.where = {
      title: {
        [Op.iLike]: `%${search}%`
      } //Like iLike
    }
  }


  const data = await Movies.findAndCountAll(queryOptions)
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