import { query } from "../db";
import { Admin } from "../interfaces/Admin";
import { Test } from "../interfaces/Test";
import { BaseModel } from "./BaseModel";

export class AdminModel extends BaseModel<Admin, AdminModel>('admins', () => AdminModel) implements Admin {

    public email: string;
    public firstName: string;
    public lastName: string;
    public passwordHash: string;

    constructor(admin: Admin) {
        super(admin.id);
        Object.assign(this, admin)
    }

}
