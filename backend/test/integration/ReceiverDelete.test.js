const app = require('../../src/app');
const request = require('supertest');
const ReceiverModel = require('../../db/models').Receiver;

require('../TestSetup');

const ReceiverTestSetup = require('../../test/integration/ReceiverTestSetup');

describe('delete receiver tests', () => {

    it('should delete a receiver successfully', async () => {
        ReceiverTestSetup.createDummyReceiver();

        const response = await request(app)
            .delete(`/receiver/1`)
            .expect(200);

        expect(response.body.message).toEqual('Receiver deleted successfully');
        expect(await ReceiverModel.count()).toEqual(0);
    });

    it('should delete multiple receivers successfully', async () => {
        ReceiverTestSetup.createDummyReceivers(10);

        const response = await request(app)
            .post(`/receiver/delete-request`)
            .send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .expect(200);

        expect(response.body.message).toEqual('Receivers deleted successfully');
        expect(await ReceiverModel.count()).toEqual(0);
    });
});