import { Router } from "express";
import { bodyValidation, queryValidation } from "../middlewares/Validation";
import { LoginSchema } from "../schemas/LoginSchema";
import * as AdminController from "../controllers/AdminController";
import { AdminCreateSchema } from "../schemas/AdminCreate";
import { AdminSearchSchema } from "../schemas/AdminSearch";


const AdminRouter = Router();

AdminRouter.post('/login', bodyValidation(LoginSchema), AdminController.login );

AdminRouter.post('/create', bodyValidation(AdminCreateSchema), AdminController.create );

AdminRouter.get('/', queryValidation(AdminSearchSchema) , AdminController.getAll );

AdminRouter.delete('/:id', AdminController.del);


export default AdminRouter;