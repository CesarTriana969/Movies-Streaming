const router = require('express').Router()

const episodesServices = require('./episodes.services')
const upload = require('../utils/multer')


router.route('/')
  .get(episodesServices.getAllEpisodes)
  .post(upload.single('episodeVideo'), episodesServices.postEpisode)


module.exports = router