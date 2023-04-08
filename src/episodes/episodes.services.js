const episodesControllers = require('./episodes.controllers')
const responses = require('../utils/handleResponses')
const { addToFirebaseEpisodeVideo } = require('../utils/firebase')
const host = require('../../config').api.host

const getAllEpisodes = (req, res) => {

  const offset = Number(req.query.offset) || 0

  const limit = Number(req.query.limit) || 10

  const search = req.query.search

  episodesControllers.findAllEpisodes(limit, offset, search)
    .then(data => {

      const nextPageUrl = data.count - offset > limit ? `${host}/api/v1/episodes?offset=${offset + limit}&limit=${limit}` : null
      const prevPageUrl = (offset - limit) >= 0 ? `${host}/api/v1/episodes?offset=${offset - limit}&limit=${limit}` : null

      responses.success({
        res,
        status: 200,
        count: data.count,
        next: nextPageUrl,
        prev: prevPageUrl,
        data: data.rows,
        message: 'Getting all the episodes'
      })
    })
    .catch(err => {
      responses.error({
        res,
        data: err,
        message: 'Something bad getting the episodes',
        status: 400
      })
    })
}

const postEpisode = async (req, res) => {

  const episodeObj = req.body
  const episodeFile = req.file

  try {
    const episodeUrl = await addToFirebaseEpisodeVideo(episodeFile)
    const data = await episodesControllers.createEpisode({ ...episodeObj, episodeUrl })
    responses.success({
      res,
      status: 201,
      data,
      message: 'Episode Created! :D'
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
        episodeNumber: 1,
        releaseYear: 2020,
        duration: 120,
        seasonId: 'string',
        coverUrl: 'string',
      }
    })
  }
}

module.exports = {
  getAllEpisodes,
  postEpisode
}