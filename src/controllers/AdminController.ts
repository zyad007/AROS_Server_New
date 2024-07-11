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

export const login: RequestHandler = async (req, res, next) => {

    try {
        const { email, password }: LoginType = req.body;

        const user = await AdminModel.getOne({
            email
        });

        if (!user) return next(new NotFound('There is no user with this email'));

        const checkPass = await compare(password, user.passwordHash);

        if (!checkPass) return next(new NotAuthorized('Invalid password'));

        const token = sign({
            id: user.id,
            createdAt: new Date(),
            role: "ADMIN"
        } as Token, process.env.SECRET as string);

        return res.status(200).send(new Result(
            true,
            '',
            {
                id: user.id,
                fullName: user.firstName + ' ' + user.lastName,
                email: user.email,
                token,
            }
        ));
    }

    catch (e) {
        next(e)
    }

}


export const create: RequestHandler = async (req, res, next) => {

    try {

        const userData = req.body as AdminCreate;

        const passwordHash = await hash(userData.password, 10);

        const admin = {
            id: 0,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            passwordHash: passwordHash,
        }
        
        const exists = await AdminModel.getOne({ email: admin.email });

        if (exists) return next(new BadRequest('Admin with this email exists'));

        const result = await AdminModel.save(admin as Admin)

        if (!result) return next(new BadRequest('Error creating Admin'))

        const token = sign({
            id: result.id,
            createdAt: new Date()
        } as Token, process.env.SECRET as string)

        return res.status(200).send(new Result(
            true,
            '',
            {
                id: result.id,
                fullName: result.firstName + ' ' + result.lastName,
                email: result.email,
                token,
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
        const { firstName, lastName, email, page }: AdminSearch = query;

        let [admins, count] = await AdminModel.search({ firstName, lastName, email }, page);

        // if(count === -1) count = await AdminModel.count();

        res.status(200).send(new Result(
            true,
            count + '',
            admins
        ))

    }

    catch (e) {
        next(e);
    }

}

export const del: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const admin = await AdminModel.getById(id);

        if (!admin) return next(new NotFound('No Admin with this id'));

        const result = await admin.delete();

        if (result) return res.sendStatus(204);

        return next(new BadRequest('Error deleting Admin'))
    }

    catch (e) {
        next(e);
    }
}