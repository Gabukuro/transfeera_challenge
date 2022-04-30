const app = require('../../src/app');
const request = require('supertest');

require('../TestSetup');

const ReceiverTestSetup = require('../../test/integration/ReceiverTestSetup');
beforeEach(async () => await ReceiverTestSetup.createDummyReceivers(30));

describe('paginate receivers test', () => {
    describe('should paginate receivers', () => {
        test.each([1, 2, 3])('pageNumber: %s', async pageNumber => {
            const response = await request(app)
                .get(`/receiver?page=${pageNumber}&limit=10`)
                .expect(200);

            let body = response.body;

            expect(body.data.length).toBeLessThanOrEqual(10);
            expect(body.currentPage).toBe(pageNumber);
            expect(body.totalPages).toBe(3);
            expect(body.totalCount).toBe(30);
        });
    });

    describe('should filter receivers', () => {
        test.each([
            { key: 'pix_key', value: '82939397023' },
            { key: 'name', value: 'Benjamin Kirby Tennyson' },
            { key: 'status', value: 'valid' }
        ])('filter: %s', async filter => {

            let receiversCount = Math.random() * 10;
            for (let i = 0; i < receiversCount; i++) {
                await ReceiverTestSetup.createDummyReceiver({ [filter.key] : `${filter.value}` });
            }

            const response = await request(app)
                .get(`/receiver?page=1&limit=10&filter=${filter.value}`)
                .expect(200);

            let body = response.body;

            expect(body.data.length).toBeLessThanOrEqual(10);
            expect(body.totalCount).toBeGreaterThanOrEqual(receiversCount);
        });
    });
});