const seasonsControllers = require('./seasons.controllers')
const responses = require('../utils/handleResponses')
const host = require('../../config').api.host

const getAllSeasons = (req, res) => {

  const offset = Number(req.query.offset) || 0

  const limit = Number(req.query.limit) || 10

  const search = req.query.search

  seasonsControllers.findAllSeasons(limit, offset, search)
    .then(data => {

      const nextPageUrl = data.count - offset > limit ? `${host}/api/v1/seasons?offset=${offset + limit}&limit=${limit}` : null
      const prevPageUrl = (offset - limit) >= 0 ? `${host}/api/v1/seasons?offset=${offset - limit}&limit=${limit}` : null

      responses.success({
        res,
        status: 200,
        count: data.count,
        next: nextPageUrl,
        prev: prevPageUrl,
        data: data.rows,
        message: 'Getting all the seasons'
      })
    })
    .catch(err => {
      responses.error({
        res,
        data: err,
        message: 'Something bad getting the seasons',
        status: 400
      })
    })
}

const postSeasons = async (req, res) => {

  const seasonObj = req.body

  try {
    const data = await seasonsControllers.createSeason({ ...seasonObj })
    responses.success({
      res,
      status: 201,
      data,
      message: 'Season Created! :D'
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
        seasonNumber: 1,
        releaseYear: 2020,
        seriesId: 'string',
        coverUrl: 'string',
        trillerUrl: 'string'
      }
    })
  }
}

module.exports = {
  getAllSeasons,
  postSeasons
}