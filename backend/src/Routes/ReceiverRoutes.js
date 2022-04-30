const ReceiverMiddleware = require('../Middlewares/ReceiverMiddlewares');
const ReceiverController = require('../Controllers/ReceiverController');

module.exports = (app) => {
    app.post('/receiver', ReceiverMiddleware.validator);
    app.post('/receiver', ReceiverController.create);

    app.put('/receiver/:id', ReceiverMiddleware.validator);
    app.put('/receiver/:id', ReceiverController.update);

    app.delete('/receiver/:id', ReceiverController.delete);
    app.post('/receiver/delete-request', ReceiverController.bulkDelete);
}