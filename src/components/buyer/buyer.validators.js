const BaseJoi = require("joi");

const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const Response = require("../../../responses/response");

// Create Joi Schema

const schemas = {
    sendOTPValidator: Joi.object().keys({
        channel: Joi.string().valid('call', 'sms'),
    }),
};

const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true,
        },
    },
};

module.exports = {
    sendOTPValidator: (req, res, next) => {
        let schema = schemas.sendOTPValidator;
        let option = options.basic;

        schema.validate(req.params,option)
        .then(() => {
            next();
        })
        .catch((err) => {
            let error = [];
            err.details.forEach((element) => {
                error.push(element.message);
            });

            Response.joierrors(req, res, err);
        });
    }
}