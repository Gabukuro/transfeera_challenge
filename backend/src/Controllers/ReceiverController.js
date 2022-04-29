const ReceiverService = require('../Services/ReceiverService');

let ReceiverController = {}; 

ReceiverController.create = async(req, res) => {
    let receiver = req.body;
    let createdReceiver = await ReceiverService.create(receiver);
    res.status(201).send(createdReceiver);
}

module.exports = ReceiverController;