const ReceiverMiddleware = require('../Middlewares/ReceiverMiddleware');
const ReceiverController = require('../Controllers/ReceiverController');

module.exports = (app) => {
    app.post('/receiver', ReceiverMiddleware.validator);
    app.post('/receiver', ReceiverController.create);
}