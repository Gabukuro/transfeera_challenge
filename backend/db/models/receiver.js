'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receiver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Receiver.init({
    name: DataTypes.STRING,
    cpf_cnpj: DataTypes.STRING,
    email: DataTypes.STRING,
    pix_key: DataTypes.STRING,
    pix_key_type: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Receiver',
  });
  return Receiver;
};