'use strict';
var faker = require('faker-br');

const receivers = [...Array(30)].map((receiver) => {
  let cpf = faker.br.cpf();
  let shouldBeDraft = Math.floor((Math.random() * 50) + 1) % 2 !== 0;

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    cpfCnpj: !shouldBeDraft ? cpf : null,
    pixType: 'CPF',
    pixKey: cpf,
    status: !shouldBeDraft ? 'valid' : 'draft'
  };
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Receivers', receivers, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Receivers', null, {});
  }
};
