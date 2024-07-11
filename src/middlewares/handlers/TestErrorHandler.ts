import { NextFunction, Request, Response } from "express"
import CustomError from "../../errors/CustomError"
import BadRequest from "../../errors/BadRequest"
import { DatabaseError } from "pg";
import NotAuthorized from "../../errors/NotAuthorized";
import { Result } from "../../dto/Result";

export const testErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {

    const handler = 'TEST_HANDLER';

    if (err instanceof BadRequest) {
        return res.status(400).send(new Result(
            false,
            '',
            {
                handler: handler,
                ...err,
                message: err.message
            }
        ))
    }

    if (err instanceof DatabaseError) {
        return res.status(500).send(new Result(
            false,
            '',
            {
                handler: handler,
                name: 'DataBaseError',
                message: err.message
            }))
    }

    if (err instanceof NotAuthorized) {
        return res.status(401).send(new Result(
            false,
            '',
            {
                handler: handler,
                ...err,
                message: err.message
            }
        ))
    }

    return res.status(500).send(new Result(
        false,
        '',
        {
            handler: handler,
            name: err.name,
            message: err.message || 'Something failed!',
        }
    ))

}