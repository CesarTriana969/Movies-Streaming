const Genres = require('../models/genres.models')

const findAllGenres = async (limit, offset) => {
  const data = await Genres.findAndCountAll({
    limit,
    offset,
  });
  return data;
};


const createGenre = async (name) => {
  const data = await Genres.create({ name })
  return data
}

module.exports = {
  findAllGenres,
  createGenre
}