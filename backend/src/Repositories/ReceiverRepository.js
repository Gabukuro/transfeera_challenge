const model = require('../../db/models');
const ReceiverModel = model.Receiver;

let ReceiverRepository = {};

ReceiverRepository.create = async(receiver) => {
    return await ReceiverModel.create(receiver);
}

module.exports = ReceiverRepository;