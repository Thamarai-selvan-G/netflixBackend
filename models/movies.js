'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movies.init({
    movieName: DataTypes.STRING,
    thumpNile: DataTypes.STRING,
    movieVideo: DataTypes.STRING,
    rating: DataTypes.STRING,
    genre: DataTypes.STRING,
    about: DataTypes.STRING,
    relesedYear: DataTypes.INTEGER,
    censor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};