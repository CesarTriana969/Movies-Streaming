const Episodes = require("./episodes.models")
const Genres = require("./genres.models")
const MovieGenres = require("./movieGenres.models")
const Movies = require("./movies.models")
const Seasons = require("./seasons.models")
const SerieGenres = require("./seriesGenres.models")
const Series = require("./series.models")
const Users = require("./users.models")

const initModels = () => {
  //?Users
  Users

  //? Series -> Seasons
  Series.hasMany(Seasons);
  Seasons.belongsTo(Series);

  //? Seasons -> Episodes
  Seasons.hasMany(Episodes);
  Episodes.belongsTo(Seasons);

  //? Many-to-many, Movies -> Genres through MovieGenres
  Movies.belongsToMany(Genres, { through: MovieGenres });
  Genres.belongsToMany(Movies, { through: MovieGenres });

  //? Many-to-many, Genres -> Series through SerieGenres
  Genres.belongsToMany(Series, { through: SerieGenres });
  Series.belongsToMany(Genres, { through: SerieGenres });
}

module.exports = initModels