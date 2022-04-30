const model = require('../../db/models');
const ReceiverModel = model.Receiver;

let ReceiverRepository = {};

ReceiverRepository.findById = async(id) => {
    return await ReceiverModel.findByPk(id);
}

ReceiverRepository.create = async(receiver) => {
    return await ReceiverModel.create(receiver);
};

ReceiverRepository.update = async(id, receiver) => {
    return await ReceiverModel.update(receiver, { where: { id: id } });
};

ReceiverRepository.delete = async(id) => {
    return await ReceiverModel.destroy({ where: { id: id } });
};

module.exports = ReceiverRepository;