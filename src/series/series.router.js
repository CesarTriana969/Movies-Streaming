const router = require('express').Router()

const seriesServices = require('./series.services')
//const upload = require('../utils/multer')


router.route('/')
  .get(seriesServices.getAllSeries)
  .post(seriesServices.postSeries)

router.get('/genres/:genreId', seriesServices.getAllSeriesByGenre)

router.post('/:seriesId/genres/:genreId', seriesServices.postGenreToSeries)


module.exports = router