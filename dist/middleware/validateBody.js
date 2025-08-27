"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateBody(dtoClass) {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dto, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length) {
            return res.status(400).json({
                message: 'Validación fallida',
                errors: errors.map(e => ({ property: e.property, constraints: e.constraints }))
            });
        }
        req.body = dto;
        next();
    };
}
