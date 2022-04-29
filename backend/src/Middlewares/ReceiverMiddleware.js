const ReceiverValidator = require('../Validators/ReceiverValidator');

let ReceiverMiddleware = {};

ReceiverMiddleware.validator = (req, res, next) => {
    let receiver = req.body;

    try{
        let receiverValidator = new ReceiverValidator(receiver);
        receiverValidator.validate();
        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = ReceiverMiddleware;