const ReceiverRepository = require('../Repositories/ReceiverRepository');
const ReceiverService = require('../Services/ReceiverService');

let ReceiverController = {};

ReceiverController.create = async (req, res) => {
    let receiver = req.body;
    try {
        let createdReceiver = await ReceiverService.create(receiver);
        res.status(201).send(createdReceiver);
    } catch (err) {
        res.status(err.code ?? 500).send(err.message);
    }
}

ReceiverController.update = async (req, res) => {
    let id = req.params.id;
    let receiver = req.body;
    try {
        await ReceiverService.update(id, receiver);
        res.status(200).send({ 'message': 'Receiver updated successfully' });
    } catch (err) {
        res.status(err.code ?? 500).send(err.message);
    }
}

ReceiverController.delete = async (req, res) => {
    let id = req.params.id;
    try {
        await ReceiverRepository.delete(id);
        res.status(200).send({ 'message': 'Receiver deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

ReceiverController.bulkDelete = async (req, res) => {
    let ids = req.body;
    try {
        await ReceiverRepository.delete(ids);
        res.status(200).send({ 'message': 'Receivers deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = ReceiverController;