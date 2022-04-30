const app = require('../../src/app');
const request = require('supertest');
const faker = require('faker-br');

require('../TestSetup');

const dummyReceiver = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    cpf_cnpj: faker.br.cpf(),
    pix_key_type: 'CPF',
    pix_key: faker.br.cpf()
}

describe('create receiver tests', () => {
    it('should create a valid receiver', async () => {
        let receiver = dummyReceiver;

        const response = await request(app)
            .post('/receiver')
            .send(receiver)
            .expect(201);

        let createdReceiver = response.body;

        let keys = Object.keys(receiver);
        keys.forEach(key => expect(createdReceiver[key]).toEqual(receiver[key]));
    });

    it('should throw an error when receiver is invalid', async () => {

        let receiver = { ...dummyReceiver, pix_key: 'abublé' };

        const response = await request(app)
            .post('/receiver')
            .send(receiver)
            .expect(400);

        let err = response.error;
        expect(err.text).toEqual('PIX key is invalid');
    });
});