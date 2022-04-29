const faker = require('faker-br');

const ReceiverModel = require('../../db/models').Receiver;

const ReceiverTestSetup = {};

ReceiverTestSetup.dummyReceiver = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        cpf_cnpj: faker.br.cpf(),
        pix_key_type: 'CPF',
        pix_key: faker.br.cpf(),
        status: 'valid'
};

ReceiverTestSetup.pixKeys = [
    { key_type: 'CPF', key: faker.br.cpf() },
    { key_type: 'CNPJ', key: faker.br.cnpj() },
    { key_type: 'EMAIL', key: faker.internet.email() },
    { key_type: 'TELEFONE', key: `+5511999999999` },
    { key_type: 'CHAVE_ALEATORIA', key: `a234567d-a12a-a12a-a12a-aa123456789a` },
]

module.exports = ReceiverTestSetup;