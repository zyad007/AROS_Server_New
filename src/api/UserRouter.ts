import { Router } from "express";
import { bodyValidation, queryValidation } from "../middlewares/Validation";
import { LoginSchema } from "../schemas/LoginSchema";
import * as UserController from "../controllers/UserController";
import { AdminCreateSchema } from "../schemas/AdminCreate";
import { AdminSearchSchema } from "../schemas/AdminSearch";
import { UserCreateSchema } from "../schemas/UserCreate";
import { UserSearchSchema } from "../schemas/UserSearch";


const UserRouter = Router();

UserRouter.post('/create', bodyValidation(UserCreateSchema), UserController.create );

UserRouter.get('/', queryValidation(UserSearchSchema) , UserController.getAll );

UserRouter.delete('/:id', UserController.del);


export default UserRouter;