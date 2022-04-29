const scheme = require('./Schemes/ReceiverValidatorScheme');
const { cnpj, cpf } = require('cpf-cnpj-validator');
const NiceExceptionHandler = require('../Helpers/NiceExceptionHandler');

const ReceiverValidator = {};

ReceiverValidator.validate = (receiver) => {
    validateByScheme(receiver);
    customValidation(receiver);

    return true;
}

const validateByScheme = (receiver) => {
    let fields = Object.keys(scheme);

    fields.forEach(field => {
        let rules = scheme[field];

        validateField(receiver, field, rules);

        if (rules.when) {
            let subFields = Object.keys(rules.when);
            subFields.forEach(subField => {
                let subRules = rules.when[subField];
                validateField(receiver, field, subRules[receiver[subField]]);
            });
        }
    });
}

const validateField = (receiver, field, rules) => {
    if (rules.required && !receiver[field])
        throw new NiceExceptionHandler(`${parseField(field)} is required`, 400);

    if (rules.allowedTypes && !rules.allowedTypes.includes(receiver[field]))
        throw new NiceExceptionHandler(`${parseField(field)} not allowed`, 400);

    if (rules.maxLength && receiver[field] && receiver[field].length > rules.maxLength)
        throw new NiceExceptionHandler(`${parseField(field)} is too long`, 400);

    if (rules.pattern && receiver[field] && !receiver[field].match(rules.pattern))
        throw new NiceExceptionHandler(`${parseField(field)} is invalid`, 400);
}

const parseField = (field) => {
    let parsers = {
        'pix_key': 'PIX key',
        'pix_key_type': 'PIX key type',
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
    };

    return parsers[field];
}

const customValidation = (receiver) => {
    if (receiver.pix_key_type === 'CPF' && !cpf.isValid(receiver.pix_key))
        throw new NiceExceptionHandler(`PIX key is invalid`, 400);

    if (receiver.pix_key_type === 'CNPJ' && !cnpj.isValid(receiver.pix_key))
        throw new NiceExceptionHandler(`PIX key is invalid`, 400);
}

ReceiverValidator.validateUpdateReceiver = (oldReceiver, newReceiver) => {
    let changeableFields = ['email'];
    let fields = Object.keys(oldReceiver);
    let wrongFields = [];

    fields.forEach(field => {
        if (!changeableFields.includes(field) && oldReceiver[field] !== newReceiver[field])
        wrongFields.push(field);
    });

    if (wrongFields.length == 1) throw new NiceExceptionHandler(`Can't edit ${wrongFields[0]} field`, 400);
    if (wrongFields.length > 1) throw new NiceExceptionHandler(`Can't edit ${wrongFields.join(', ')} fields`, 400);
}

module.exports = ReceiverValidator; 