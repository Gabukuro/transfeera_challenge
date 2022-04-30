const ReceiverRepository = require('../Repositories/ReceiverRepository');
const ReceiverValidator = require('../Validators/ReceiverValidator');

let ReceiverService = {};

ReceiverService.create = async (receiver) => {
    return await ReceiverRepository.create(receiver);
}

ReceiverService.paginate = async (page, limit) => {
    let { count, rows } = await ReceiverRepository.paginate(page, limit);
    return {
        data: rows,
        totalCount: count,
        currentPage: page,
        totalPages: (count / limit)
    }
}

ReceiverService.update = async (id, receiver) => {
    let oldReceiver = await ReceiverRepository.findById(id);

    if (oldReceiver.status == 'valid')
        ReceiverValidator.validateUpdateReceiver(oldReceiver.dataValues, receiver);

    return await ReceiverRepository.update(id, receiver);
}

module.exports = ReceiverService;