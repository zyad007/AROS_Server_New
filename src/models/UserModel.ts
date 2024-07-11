import { query } from "../db";
import { Admin } from "../interfaces/Admin";
import { Test } from "../interfaces/Test";
import { User } from "../interfaces/User";
import { BaseModel } from "./BaseModel";

export class UserModel extends BaseModel<User, UserModel>('users', () => UserModel) implements User {

    public email: string;
    public firstName: string;
    public lastName: string;
    public privateHash: string;
    public licenseNumber: string;

    constructor(user: User) {
        super(user.id);
        Object.assign(this, user)
    }

}
