const Series = require('../models/series.models')
const SeriesGenres = require('../models/seriesGenres.models')
const uuid = require('uuid')
const Genres = require('../models/genres.models')
const { Op } = require('sequelize')


const findAllSeries = async (limit, offset, search) => {

  const queryOptions = {
    limit: limit,
    offset: offset,
    where: {},
  }

  if (search) {
    queryOptions.where = {
      title: {
        [Op.iLike]: `%${search}%`
      }
    }
  }

  const data = await Series.findAndCountAll(queryOptions)
  return data
}

const createSeries = async (seriesObj) => {
  const newSeries = {
    id: uuid.v4(),
    title: seriesObj.title,
    synopsis: seriesObj.synopsis,
    releaseYear: seriesObj.releaseYear,
    director: seriesObj.director,
    classification: seriesObj.classification,
    rating: seriesObj.rating
  }
  const data = await Series.create(newSeries)
  return data
}

const addGenreToSeries = async (dataObj) => {
  const data = await SeriesGenres.create({
    id: uuid.v4(),
    seriesId: dataObj.seriesId,
    genreId: dataObj.genreId
  })
  return data
}

const findAllSeriesByGenre = async (genreId, limit, offset) => {
  const data = await Series.findAndCountAll({
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
  findAllSeries,
  createSeries,
  addGenreToSeries,
  findAllSeriesByGenre
}