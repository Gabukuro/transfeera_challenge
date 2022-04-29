const app = require('../../src/app');
const request = require('supertest');

require('../TestSetup');

const ReceiverModel = require('../../db/models').Receiver;

const ReceiverTestSetup = require('./ReceiverTestSetup');
beforeEach(ReceiverTestSetup.createDummyReceiver);

describe('update receiver tests', () => {
    it('should update a receiver successfully', async () => {
        const dummyReceiver = await ReceiverModel.findByPk(1);

        let updatedReceiver = {
            ...dummyReceiver.dataValues,
            email: null
        };

        const response = await request(app)
            .put(`/receiver/1`)
            .send(updatedReceiver)
            .expect(200);

        let updatedBody = response.body;

        expect(updatedBody.message).toEqual('Receiver updated successfully');

        let updatedReceiverData = await ReceiverModel.findByPk(1);
        expect(updatedReceiverData.email).toEqual(updatedReceiver.email);
    });

    describe('should throw an error when try to update any other field than email', () => {
        test.each(['name', 'cpf_cnpj', 'status'])('field: %s', async (field) => {
            const dummyReceiver = await ReceiverModel.findByPk(1);

            let updatedReceiver = dummyReceiver.dataValues;
            updatedReceiver[field] = null;

            const response = await request(app)
                .put(`/receiver/1`)
                .send(updatedReceiver)
                .expect(400);

            let err = response.error;
            expect(err.text).toEqual(`Can't edit ${field} field`);
        });

        describe('should throw an error when edit all infos', () => {
            test.each(['', null, undefined])('value: %s', async (value) => {
                const dummyReceiver = await ReceiverModel.findByPk(1);

                let updatedReceiver = {
                    ...dummyReceiver.dataValues,
                    name: value,
                    cpf_cnpj: value,
                    status: value,
                };

                const response = await request(app)
                    .put(`/receiver/1`)
                    .send(updatedReceiver)
                    .expect(400);

                let err = response.error;
                expect(err.text).toEqual(`Can't edit name, cpf_cnpj, status fields`);
            });
        });
    });
});