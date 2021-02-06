'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  borrow.init({
    date_of_borrowing: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'borrow',
  });
  return borrow;
};