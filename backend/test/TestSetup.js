const models = require('../db/models');

beforeEach(async () => {
    await models.sequelize.sync({ force: true })
});
