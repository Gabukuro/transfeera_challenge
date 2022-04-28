const scheme = require('./ValidatorScheme');
const { cnpj, cpf } = require('cpf-cnpj-validator');

class ReceiverValidator {
    constructor(receiver) {
        this.receiver = receiver;
        this.scheme = scheme;
    }

    validate() {
        this.validateByScheme();
        this.customValidation();

        return true;
    }

    validateByScheme() {
        let fields = Object.keys(this.scheme);

        fields.forEach(field => {
            let rules = this.scheme[field];

            this.validateField(field, rules);

            if (rules.when) {
                let subFields = Object.keys(rules.when);
                subFields.forEach(subField => {
                    let subRules = rules.when[subField];
                    this.validateField(field, subRules[this.receiver[subField]]);
                })
            }
        });
    }

    validateField(field, rules) {
        if (rules.required && !this.receiver[field])
            throw new Error(`${this.parseField(field)} is required`);

        if (rules.allowedTypes && !rules.allowedTypes.includes(this.receiver[field]))
            throw new Error(`${this.parseField(field)} is not allowed`);

        if (rules.maxLength && this.receiver[field] && this.receiver[field].length > rules.maxLength)
            throw new Error(`${this.parseField(field)} is too long`);

        if (rules.pattern && this.receiver[field] && !this.receiver[field].match(rules.pattern))
            throw new Error(`${this.parseField(field)} is invalid`);
    }

    parseField(field) {
        return field.charAt(0).toUpperCase() + field.slice(1).split('_').join(' ');
    }

    customValidation() {
        if (this.receiver.pix_key_type === 'CPF' && !cpf.isValid(this.receiver.pix_key))
            throw new Error(`Pix key is invalid`);

        if (this.receiver.pix_key_type === 'CNPJ' && !cnpj.isValid(this.receiver.pix_key))
            throw new Error(`Pix key is invalid`);
    }
}

module.exports = ReceiverValidator;