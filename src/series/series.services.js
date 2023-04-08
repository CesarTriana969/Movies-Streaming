const seriesControllers = require('./series.controllers')
const responses = require('../utils/handleResponses')
//const { addToFirebaseSeriesVideo } = require('../utils/firebase')
const host = require('../../config').api.host

const getAllSeries = (req, res) => {

  const offset = Number(req.query.offset) || 0

  const limit = Number(req.query.limit) || 10

  const search = req.query.search

  seriesControllers.findAllSeries(limit, offset, search)
    .then(data => {

      const nextPageUrl = data.count - offset > limit ? `${host}/api/v1/series?offset=${offset + limit}&limit=${limit}` : null
      const prevPageUrl = (offset - limit) >= 0 ? `${host}/api/v1/series?offset=${offset - limit}&limit=${limit}` : null

      responses.success({
        res,
        status: 200,
        count: data.count,
        next: nextPageUrl,
        prev: prevPageUrl,
        data: data.rows,
        message: 'Getting all the series'
      })
    })
    .catch(err => {
      responses.error({
        res,
        data: err,
        message: 'Something bad getting the series',
        status: 400
      })
    })
}

const postSeries = async (req, res) => {

  const seriesObj = req.body
  //const seriesFile = req.file

  try {
    //const seriesUrl = await addToFirebaseSeriesVideo(seriesFile)
    const data = await seriesControllers.createSeries({ ...seriesObj })
    responses.success({
      res,
      status: 201,
      data,
      message: 'Series Created! :D'
    })
  } catch (err) {
    responses.error({
      res,
      data: err,
      message: err.message,
      status: 400,
      fields: {
        title: 'string',
        synopsis: 'string',
        releaseYear: 2020,
        director: 'string',
        classification: 'string',
        rating: 0.0
      }
    })
  }
}

const postGenreToSeries = (req, res) => {

  const { seriesId, genreId } = req.params

  seriesControllers.addGenreToSeries({ seriesId, genreId })
    .then(data => {
      responses.success({
        res,
        status: 201,
        message: 'Genre added to series successfully',
        data
      })
    })
    .catch(err => {
      responses.error({
        res,
        status: 400,
        message: err.message,
        data: err
      })
    })
}

const getAllSeriesByGenre = async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;

    const { count, rows } = await seriesControllers.findAllSeriesByGenre(genreId, limit, offset);

    const nextPageUrl = count - offset > limit ? `${host}/api/v1/series/genre/${genreId}?offset=${offset + limit}&limit=${limit}` : null;
    const prevPageUrl = (offset - limit) >= 0 ? `${host}/api/v1/series/genre/${genreId}?offset=${offset - limit}&limit=${limit}` : null;

    responses.success({
      res,
      status: 200,
      count,
      next: nextPageUrl,
      prev: prevPageUrl,
      data: rows,
      message: 'Getting all the series'
    });
  } catch (err) {
    responses.error({
      res,
      data: err,
      message: 'Something went wrong while getting the series',
      status: 400
    });
  }
};



module.exports = {
  getAllSeries,
  postSeries,
  postGenreToSeries,
  getAllSeriesByGenre
}