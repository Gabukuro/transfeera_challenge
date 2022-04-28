const faker = require('faker-br');
const ReceiverValidator = require('../../src/Domain/Receiver/Validator');

const dummyReceiver = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    cpf_cnpj: faker.br.cpf(),
}

const pixKeys = [
    { key_type: 'CPF', key: faker.br.cpf() },
    { key_type: 'CNPJ', key: faker.br.cnpj() },
    { key_type: 'EMAIL', key: faker.internet.email()},
    { key_type: 'TELEFONE', key: `+5511999999999` },
    { key_type: 'CHAVE_ALEATORIA', key: `a234567d-a12a-a12a-a12a-aa123456789a` },
]

describe('Receiver validator', () => {

    describe('when receiver is valid', () => {
        pixKeys.forEach(pix => {
            it(`should return true when receiver ${pix.key_type} is valid`, () => {
                let receiver = { ...dummyReceiver, pix_key_type: pix.key_type, pix_key: pix.key };
                let receiverValidator = new ReceiverValidator(receiver);
                expect(receiverValidator.validate()).toBe(true);
            });
        });

        it('should return true when receiver email is not defined', () => {
            [null, undefined, ''].forEach(email => {
                let receiver = { ...dummyReceiver, email: email, pix_key_type: 'CPF', pix_key: faker.br.cpf() };
                let receiverValidator = new ReceiverValidator(receiver);
                expect(receiverValidator.validate()).toBe(true);
            });
        });
    });

    describe('when receiver is invalid', () => {

        let invalidPixKeys = [
            { key_type: 'CPF', key: '123.456.789-12' },
            { key_type: 'CNPJ', key: '22.222.222/2222-22' },
            { key_type: 'EMAIL', key: 'invalidEmail' },
            { key_type: 'TELEFONE', key: '5511111111111' },
        ];

        invalidPixKeys.forEach(pix => {
            it(`should throw error when receiver has invalid ${pix.key_type} pixKey`, () => {
                let receiver = { ...dummyReceiver, pix_key_type: pix.key_type, pix_key: pix.key };
                let receiverValidator = new ReceiverValidator(receiver);
                expect(() => receiverValidator.validate()).toThrow(`Pix key is invalid`);
            });
        });

        pixKeys.forEach(pix => {
            it(`should throw error when receiver has undefined ${pix.key_type} pixKey`, () => {
                [null, undefined, ''].forEach((pixKey) => {
                    let receiver = { ...dummyReceiver, pix_key_type: pix.key_type, pix_key: pixKey };
                    let receiverValidator = new ReceiverValidator(receiver);
                    expect(() => receiverValidator.validate()).toThrow('Pix key is required');
                });
            });
        });

        it('should throw error when receiver has not allowed pixKeyType', () => {
            let receiver = { ...dummyReceiver, pix_key_type: 'invalidPixKeyType', pix_key: faker.br.cpf() };
            let receiverValidator = new ReceiverValidator(receiver);
            expect(() => receiverValidator.validate()).toThrow('Pix key type is not allowed');
        });

        it('should throw error when receiver pixKey is to long', () => {
            let receiver = { ...dummyReceiver, pix_key_type: 'CHAVE_ALEATORIA',  pix_key: 'x'.repeat(141) };
            let receiverValidator = new ReceiverValidator(receiver);
            expect(() => receiverValidator.validate()).toThrow('Pix key is too long');
        });

        it('should throw error when receiver email is to long', () => {
            let receiver = { ...dummyReceiver, pix_key_type: 'CPF', pix_key: faker.br.cpf(), email: 'x'.repeat(251) };
            let receiverValidator = new ReceiverValidator(receiver);
            expect(() => receiverValidator.validate()).toThrow('Email is too long');
        });
    });
});