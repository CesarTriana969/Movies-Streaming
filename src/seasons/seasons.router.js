const router = require('express').Router()

const seasonsServices = require('./seasons.services')
//const upload = require('../utils/multer')


router.route('/')
  .get(seasonsServices.getAllSeasons)
  .post(seasonsServices.postSeasons)

module.exports = router