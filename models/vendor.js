'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vendor.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userName :DataTypes.STRING,
    mobileNumber: DataTypes.INTEGER,
    profile: DataTypes.STRING,
    tocken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vendor',
  });
  return vendor;
};