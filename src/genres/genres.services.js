const genreControllers = require('./genres.controllers.js')
const responses = require('../utils/handleResponses')

const getAllGenres = (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  genreControllers.findAllGenres(limit, offset)
    .then(data => {
      const count = data.count;
      const nextPageUrl = (offset + limit) < count ? `${host}/api/v1/genres?offset=${offset + limit}&limit=${limit}` : null;
      const prevPageUrl = offset > 0 ? `${host}/api/v1/genres?offset=${Math.max(offset - limit, 0)}&limit=${limit}` : null;

      responses.success({
        res,
        status: 200,
        message: 'Getting all Genres',
        count,
        next: nextPageUrl,
        prev: prevPageUrl,
        data: data.rows,
      });
    })
    .catch(err => {
      responses.error({
        res,
        status: 400,
        message: err.message,
        data: err,
      });
    });
};



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