const { Op } = require("sequelize");
const model = require('../../db/models');
const ReceiverModel = model.Receiver;

let ReceiverRepository = {};

ReceiverRepository.create = async (receiver) => {
    return await ReceiverModel.create(receiver);
};

ReceiverRepository.findById = async (id) => {
    return await ReceiverModel.findByPk(id);
};

ReceiverRepository.paginate = async (page, limit, filter = '') => {
    return await ReceiverModel.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: {
            [Op.or]: [
                { name: { [Op.substring]: filter } },
                { pix_key: { [Op.substring]: filter } },
                { pix_key_type: { [Op.substring]: filter } },
                { status: { [Op.substring]: filter } },
            ]
        }
    });
};

ReceiverRepository.update = async (id, receiver) => {
    return await ReceiverModel.update(receiver, { where: { id: id } });
};

ReceiverRepository.delete = async (id) => {
    return await ReceiverModel.destroy({ where: { id: id } });
};

module.exports = ReceiverRepository;