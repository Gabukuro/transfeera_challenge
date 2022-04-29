const app = require('../../src/app');
const request = require('supertest');

require('../TestSetup');

describe('paginate receivers test', () => {
    describe('shoul paginate receivers', () => {
        test.each([1, 2, 3])('pageNumber: %s', async pageNumber => {
            const response = await request(app)
                .get(`/receiver?page=${pageNumber}&limit=5`)
                .expect(200);

            let body = response.body;

            expect(body.length).toBeLessThanOrEqual(5);
        });
    });
});