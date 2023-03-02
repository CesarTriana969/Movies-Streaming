const router = require('express').Router()

const genreServices = require('./genres.services')

router.route('/')
  et(genreServices.getAllGenres)
  ost(genreServices.postGenre)

module.exports = router