const app = require('../../src/app');
const request = require('supertest');
const faker = require('faker-br');

const dummyReceiver = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    cpf_cnpj: faker.br.cpf(),
}

const pixKeys = [
    { key_type: 'CPF', key: faker.br.cpf() },
    { key_type: 'CNPJ', key: faker.br.cnpj() },
    { key_type: 'EMAIL', key: faker.internet.email() },
    { key_type: 'TELEFONE', key: `+5511999999999` },
    { key_type: 'CHAVE_ALEATORIA', key: `a234567d-a12a-a12a-a12a-aa123456789a` },
]

describe('create receiver tests', () => {
    it('should create a valid receiver', async () => {
        let receiver = { 
            ...dummyReceiver, 
            pix_key_type: pixKeys[0].key_type, 
            pix_key: pixKeys[0].key 
        };

        const response = await request(app)
            .post('/receiver')
            .send(receiver)
            .expect(201);

        let createdReceiver = response.body;

        let keys = Object.keys(receiver);
        keys.forEach(key => expect(createdReceiver[key]).toEqual(receiver[key]));
    });

    it('should throw an error when receiver is invalid', async () => {

        let receiver = { 
            ...dummyReceiver, 
            pix_key_type: pixKeys[0].key_type, 
            pix_key: 'abublé' 
        };

        const response = await request(app)
            .post('/receiver')
            .send(receiver)
            .expect(400);

        let err = response.error;
        expect(err.text).toEqual('PIX key is invalid');
    });
});