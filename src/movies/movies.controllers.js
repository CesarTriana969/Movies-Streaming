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
        //Like -> Case Sensitive -> Diferencia entre mayusculas y minusculas -> los
        //iLike -> Not Case Sensitive -> No generea distincion entre mayusculas y minusculas
      }
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

// Controlador 'findAllMoviesByGenre'
const findAllMoviesByGenre = async (genreId, limit, offset) => {
  const data = await Movies.findAndCountAll({
    include: {
      model: Genres,
      where: {
        id: genreId
      }
    },
    limit: limit,
    offset: offset
  });

  return data;
};



module.exports = {
  findAllMovies,
  createMovie,
  addGenreToMovie,
  findAllMoviesByGenre
}