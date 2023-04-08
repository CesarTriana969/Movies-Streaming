const Seasons = require('../models/seasons.models');
const Series = require('../models/series.models');
const uuid = require('uuid');
const { Op } = require('sequelize');

const findAllSeasons = async (limit, offset, search) => {
  const queryOptions = {
    limit: limit,
    offset: offset,
    where: {},
    include: {
      model: Series,
      attributes: ['id', 'title'], 
    },
  };

  if (search) {
    queryOptions.where = {
      title: {
        [Op.iLike]: `%${search}%`,
      },
    };
  }

  const data = await Seasons.findAndCountAll(queryOptions);
  return data;
};

const createSeason = async (seasonObj) => {
  const newSeason = {
    id: uuid.v4(),
    title: seasonObj.title,
    synopsis: seasonObj.synopsis,
    seasonNumber: seasonObj.seasonNumber,
    releaseYear: seasonObj.releaseYear,
    seriesId: seasonObj.seriesId,
    coverUrl: seasonObj.coverUrl,
    trillerUrl: seasonObj.trillerUrl,
  };
  const data = await Seasons.create(newSeason);
  return data;
};

const updateSeason = async (seasonId, seasonObj) => {
  const updatedSeason = {
    title: seasonObj.title,
    synopsis: seasonObj.synopsis,
    seasonNumber: seasonObj.seasonNumber,
    releaseYear: seasonObj.releaseYear,
    seriesId: seasonObj.seriesId,
    coverUrl: seasonObj.coverUrl,
    trillerUrl: seasonObj.trillerUrl,
  };
  const data = await Seasons.update(updatedSeason, {
    where: { id: seasonId },
  });
  return data;
};

const deleteSeason = async (seasonId) => {
  const data = await Seasons.destroy({
    where: { id: seasonId },
  });
  return data;
};

module.exports = {
  findAllSeasons,
  createSeason,
  updateSeason,
  deleteSeason,
};
