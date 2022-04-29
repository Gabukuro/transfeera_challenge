const ReceiverRepository = require('../Repositories/ReceiverRepository');

let ReceiverService = {};

ReceiverService.create = async(receiver) => {
    let isDraft = Object.values(receiver).some(x => !x);
    let status = isDraft ? 'draft' : 'valid';
    receiver = {...receiver, status: status};
    return await ReceiverRepository.create(receiver);
}

module.exports = ReceiverService;