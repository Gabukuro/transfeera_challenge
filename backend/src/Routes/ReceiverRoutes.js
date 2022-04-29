const ReceiverController = require('../Controllers/ReceiverController');

module.exports = (app) => {
    app.post('/receiver', ReceiverController.create);
}