const models = require('../db/models');

beforeEach(async () => {
    await models.sequelize.sync({ force: true })
});

afterAll(async () => {
    await models.sequelize.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});