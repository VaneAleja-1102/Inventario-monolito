import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateBody<T>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto as object, { whitelist: true, forbidNonWhitelisted: true });
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
