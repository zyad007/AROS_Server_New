import Base from "./Base";

export interface Admin extends Base {
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string
}