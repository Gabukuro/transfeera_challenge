const app = require('../../src/app');
const request = require('supertest');

const ReceiverModel = require('../../db/models').Receiver;

const ReceiverTestSetup = require('./ReceiverTestSetup');

describe('update receiver tests', () => {
    it('should update a receiver successfully', async () => {
        const dummyReceiver = await ReceiverModel.create(ReceiverTestSetup.dummyReceiver);

        let updatedReceiver = {
            ...dummyReceiver.dataValues,
            email: null
        };

        const response = await request(app)
            .put(`/receiver/${dummyReceiver.id}`)
            .send(updatedReceiver)
            .expect(200);

        let updatedBody = response.body;

        expect(updatedBody.message).toEqual('Receiver updated successfully');

        let updatedReceiverData = await ReceiverModel.findByPk(dummyReceiver.id);
        expect(updatedReceiverData.email).toEqual(updatedReceiver.email);
    });

    describe('should throw an error when try to update any other field than email', () => {
        test.each(['name', 'cpf_cnpj', 'status'])('field: %s', async (field) => {

            const dummyReceiver = await ReceiverModel.create(ReceiverTestSetup.dummyReceiver);

            let updatedReceiver = dummyReceiver.dataValues;
            updatedReceiver[field] = null;

            const response = await request(app)
                .put(`/receiver/${dummyReceiver.id}`)
                .send(updatedReceiver)
                .expect(400);

            let err = response.error;
            expect(err.text).toEqual(`Can't edit ${field} field`);
        });

        describe('should throw an error when edit all infos', () => {
            test.each(['', null, undefined])('value: %s', async (value) => {
                const dummyReceiver = await ReceiverModel.create(ReceiverTestSetup.dummyReceiver);

                let updatedReceiver = {
                    ...dummyReceiver.dataValues,
                    name: value,
                    cpf_cnpj: value,
                    status: value,
                };

                const response = await request(app)
                    .put(`/receiver/${dummyReceiver.id}`)
                    .send(updatedReceiver)
                    .expect(400);

                let err = response.error;
                expect(err.text).toEqual(`Can't edit name, cpf_cnpj, status fields`);
            });
        });
    });
});