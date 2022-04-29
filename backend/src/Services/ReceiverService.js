const ReceiverRepository = require('../Repositories/ReceiverRepository');

let ReceiverService = {};

ReceiverService.create = async(receiver) => {
    let isDraft = checkIfReceiverIsDraft(receiver);
    let status = isDraft ? 'draft' : 'valid';
    receiver = {...receiver, status: status};
    return await ReceiverRepository.create(receiver);
}

ReceiverService.update = async(id, receiver) => {
    let isDraft = checkIfReceiverIsDraft(receiver);
    let status = isDraft ? 'draft' : 'valid';
    receiver = {...receiver, status: status};
    return await ReceiverRepository.update(id, receiver);
}

checkIfReceiverIsDraft = (receiver) => {
    let isDraft = Object.values(receiver).some(x => !x);
    return isDraft;
}

module.exports = ReceiverService;