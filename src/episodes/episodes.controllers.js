const Episodes = require('../models/episodes.models');
const Seasons = require('../models/seasons.models');
const uuid = require('uuid');
const { Op } = require('sequelize');

const findAllEpisodes = async (limit, offset, search) => {
  const queryOptions = {
    limit: limit,
    offset: offset,
    where: {},
    include: {
      model: Seasons,
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

  const data = await Episodes.findAndCountAll(queryOptions);
  return data;
};

const createEpisode = async (episodeObj) => {
  const newEpisode = {
    id: uuid.v4(),
    title: episodeObj.title,
    synopsis: episodeObj.synopsis,
    episodeNumber: episodeObj.episodeNumber,
    duration: episodeObj.duration,
    seasonId: episodeObj.seasonId,
    coverUrl: episodeObj.coverUrl,
    episodeUrl: episodeObj.episodeUrl,
  };
  const data = await Episodes.create(newEpisode);
  return data;
};

const updateEpisode = async (episodeId, episodeObj) => {
  const updatedEpisode = {
    title: episodeObj.title,
    synopsis: episodeObj.synopsis,
    episodeNumber: episodeObj.episodeNumber,
    duration: episodeObj.duration,
    seasonId: episodeObj.seasonId,
    coverUrl: episodeObj.coverUrl,
    episodeUrl: episodeObj.episodeUrl,
  };
  const data = await Episodes.update(updatedEpisode, {
    where: { id: episodeId },
  });
  return data;
};

const deleteEpisode = async (episodeId) => {
  const data = await Episodes.destroy({
    where: { id: episodeId },
  });
  return data;
};

module.exports = {
  findAllEpisodes,
  createEpisode,
  updateEpisode,
  deleteEpisode,
};
