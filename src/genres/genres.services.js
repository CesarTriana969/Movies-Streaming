const genreControllers = require('./genres.controllers.js')
const responses = require('../utils/handleResponses')

const getAllGenres = (req, res) => {
  genreControllers.findAllGenres()
    .then(data => {
      responses.success({
        res,
        status: 200,
        message: 'Getting all Genres',
        data
      })
    })
    .catch(err => {
      responses.error({
        res,
        data: err,
        status: 400,
        message: err.message,
      })
    })
}

const postGenre = (req, res) => {
  const { name } = req.body
  genreControllers.createGenre(name)
    .then(data => {
      responses.success({
        res,
        status: 201,
        message: 'Genre created successfully',
        data
      })
    })
    .catch(err => {
      responses.error({
        res,
        data: err,
        status: 400,
        message: err.message,
        fields: {
          name: 'string'
        }
      })
    })
}

module.exports = {
  getAllGenres,
  postGenre
}