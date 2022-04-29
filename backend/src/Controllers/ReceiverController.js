const ReceiverService = require('../Services/ReceiverService');

let ReceiverController = {}; 

ReceiverController.create = async(req, res) => {
    let receiver = req.body;
    let createdReceiver = await ReceiverService.create(receiver);
    res.status(201).send(createdReceiver);
}

ReceiverController.update = async(req, res) => {
    let id = req.params.id;
    let receiver = req.body;
    try {
        await ReceiverService.update(id, receiver);
        res.status(200).send({'message': 'Receiver updated successfully'});
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = ReceiverController;