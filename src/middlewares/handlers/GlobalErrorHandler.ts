import { NextFunction, Request, Response } from "express";
import BadRequestError from "../../errors/BadRequest";
import { Result } from "../../dto/Result";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let status: number;

    if (err instanceof BadRequestError) {
        status = 400;

        return res.status(status).send(new Result(
            false,
            err.message,
            {
                ...err
            }
        )
        )

    } else {
        status = 500
    }

    res.status(status).send(new Result(
        false,
        err.message || 'Something failed!',
        {
            handler: 'GLOBAL_ERROR_HANDLER',
            name: err.name,
            message: err.message || 'Something failed!',
        }
    )
    )

}