const app = require('../../src/app');
const request = require('supertest');
const ReceiverRepository = require('../../src/Repositories/ReceiverRepository');

require('../TestSetup');

const ReceiverTestSetup = require('../../test/integration/ReceiverTestSetup');
beforeAll(async () => ReceiverTestSetup.createDummyReceivers(30));

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
        });
    });

    describe('should filter receivers', () => {
        test.each([
            { key: 'pix_key', value: '82939397023' },
            { key: 'pix_key', value: '+5511999999999' },
            { key: 'pix_key', value: 'emaiu@email.com' },
            { key: 'email', value: 'email2@email.com' },
            { key: 'name', value: 'Benjamin Kirby Tennyson' },
            { key: 'status', value: 'valid' }
        ])('filter: %s', async filter => {
            const response = await request(app)
                .get(`/receiver?page=1&limit=10&filter=${filter.value}`)
                .expect(200);

            let body = response.body;

            let receiversCount = await ReceiverRepository.filter(filter.value).count();
            expect(body.data.length).toBeLessThanOrEqual(receiversCount);
        });
    });
});