const faker = require('faker-br');
const ReceiverModel = require('../../db/models').Receiver;

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

describe('Receiver validator', () => {

    describe('when receiver is invalid', () => {
        let invalidPixKeys = [
            { key_type: 'CPF', key: '123.456.789-12' },
            { key_type: 'CNPJ', key: '22.222.222/2222-22' },
            { key_type: 'EMAIL', key: 'invalidEmail' },
            { key_type: 'TELEFONE', key: '5511111111111' },
        ];

        describe(`should throw error when receiver has invalid pix key`, () => {
            test.each(invalidPixKeys)('invalid pik key: %s', async pix => {
                let receiver = { ...dummyReceiver, pix_key_type: pix.key_type, pix_key: pix.key };
                let createdReceiver = ReceiverModel.create(receiver).catch(err => {
                    let errors = err.errors;
                    expect(errors[0].message).toBe('PIX key is invalid');
                });
            });
        });

        describe(`should throw error when receiver has undefined pix key`, () => {
            test.each(pixKeys)('pix: %s', async pix => {
                [null, undefined, ''].forEach(async pixKey => {
                    let receiver = { ...dummyReceiver, pix_key_type: pix.key_type, pix_key: pixKey };
                    let createdReceiver = await ReceiverModel.create(receiver).catch(err => {
                        let errors = err.errors;
                        expect(errors[0].message).toBe('PIX key is invalid');
                    });
                });
            });
        });

        it('should throw error when receiver has not allowed pixKeyType', async () => {
            let receiver = { ...dummyReceiver, pix_key_type: 'invalidPixKeyType', pix_key: faker.br.cpf() };
            let createdReceiver = await ReceiverModel.create(receiver).catch(err => {
                let errors = err.errors;
                expect(errors[0].message).toBe('PIX key type not allowed');

            });
        });

        it('should throw error when receiver pixKey is too long', async () => {
            let receiver = { ...dummyReceiver, pix_key_type: 'CHAVE_ALEATORIA', pix_key: 'x'.repeat(141) };
            let createdReceiver = await ReceiverModel.create(receiver).catch(err => {
                let errors = err.errors;
                expect(errors[0].message).toBe('PIX key is invalid');
                expect(errors[1].message).toBe('PIX key is too long');

            });
        });

        it('should throw error when receiver email is too long', async () => {
            let receiver = { ...dummyReceiver, pix_key_type: 'CPF', pix_key: faker.br.cpf(), email: 'x'.repeat(251) };
            let createdReceiver = await ReceiverModel.create(receiver).catch(err => {
                let errors = err.errors;
                expect(errors[0].message).toBe('Email is invalid');
                expect(errors[1].message).toBe('Email is too long');
            });
        });
    });
});