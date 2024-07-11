import { RequestHandler } from "express";
import { AdminModel } from "../models/AdminModel";
import NotFound from "../errors/NotFound";
import { compare, hash } from "bcrypt";
import NotAuthorized from "../errors/NotAuthorized";
import { Token } from "../types/Token";
import { sign } from "jsonwebtoken";
import { Result } from "../dto/Result";
import { LoginType } from "../schemas/LoginSchema";
import { Admin } from "../interfaces/Admin";
import BadRequest from "../errors/BadRequest";
import { AdminCreate } from "../schemas/AdminCreate";
import { AdminSearch } from "../schemas/AdminSearch";
import { UserCreate } from "../schemas/UserCreate";
import { User } from "../interfaces/User";
import { UserModel } from "../models/UserModel";
import { UserSearch } from "../schemas/UserSearch";


export const create: RequestHandler = async (req, res, next) => {

    try {

        const userData = req.body as UserCreate;

        const privetaHash = await hash(userData.licenseNumber, 10);

        const user: User = {
            id: 0,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            licenseNumber: userData.licenseNumber,
            privateHash: privetaHash
        }

        const exists = await UserModel.getOne({ email: user.email });

        if (exists) return next(new BadRequest('User with this email exists'));

        const result = await UserModel.save(user)

        if (!result) return next(new BadRequest('Error creating User'))

        return res.status(200).send(new Result(
            true,
            '',
            {
                id: result.id,
                fullName: result.firstName + ' ' + result.lastName,
                email: result.email,
            }
        ));
    }

    catch (e) {
        console.log(e);
        next(e);
    }

}

export const getAll: RequestHandler = async (req, res, next) => {

    try {
        let query = {};
        Object.assign(query, req.query);
        const { firstName, lastName, email, licenseNumber, page }: UserSearch = query;

        let [users, count] = await UserModel.search({ firstName, lastName, email, licenseNumber }, page);

        // if(count === -1) count = await AdminModel.count();

        res.status(200).send(new Result(
            true,
            count + '',
            users
        ))

    }

    catch (e) {
        next(e);
    }

}

export const del: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const user = await UserModel.getById(id);

        if (!user) return next(new NotFound('No User with this id'));

        const result = await user.delete();

        if (result) return res.sendStatus(204);

        return next(new BadRequest('Error deleting User'))
    }

    catch (e) {
        next(e);
    }
}