'use strict';
const {
  Model
} = require('sequelize');
const { cnpj, cpf } = require('cpf-cnpj-validator');

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
    name: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Name is required' }
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'CPF/CNPJ is required' },
      validate: {
        checkCpfCnpj(value) {
          if (value && value.lenght === 11 && !cpf.isValid(this.receiver.pix_key)) {
            throw new Error('CPF is invalid');
          } else if (value && value.lenght > 11 && !cnpj.isValid(this.receiver.pix_key)) {
            throw new Error('CNPJ is invalid');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: { args: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, msg: 'Email is invalid' },
        len: { args: [0, 250], msg: 'Email is too long' },
      }
    },
    pix_key: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'PIX key is required' },
      validate: {
        len: { args: [0, 140], msg: 'PIX key is too long' },
        when(value) {
          let patterns = {
            CPF: /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/,
            CNPJ: /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
            EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            TELEFONE: /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
            CHAVE_ALEATORIA: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
          };

          if (value && value.match(patterns[this.pix_key_type])) {
            return true;
          } else {
            throw new Error('PIX key is invalid');
          }
        },
        validadePixKey(value) {
          let pixTypes = ['CPF', 'CNPJ'];
          if (!pixTypes.includes(this.pix_key_type))
            return;

          if (this.pix_key_type === 'CPF' && !cpf.isValid(this.pix_key))
            throw new Error(`PIX key is invalid`);

          if (this.pix_key_type === 'CNPJ' && !cnpj.isValid(this.pix_key))
            throw new Error(`PIX key is invalid`);
        }
      }
    },
    pix_key_type: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'PIX key type is required' },
      validate: {
        isIn: { args: [['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA']], msg: 'PIX key type not allowed' },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: { args: false, msg: 'Status is required' },
      validate: {
        isIn: { args: [['valid', 'draft']], msg: 'Status not allowed' },
      }
    }
  }, {
    sequelize,
    modelName: 'Receiver',
  });
  return Receiver;
};