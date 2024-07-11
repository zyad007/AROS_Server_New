import { Router } from "express";
import { bodyValidation, queryValidation } from "../middlewares/Validation";
import { LoginSchema } from "../schemas/LoginSchema";
import * as ObstacleController from "../controllers/ObstacleController";
import { AdminCreateSchema } from "../schemas/AdminCreate";
import { AdminSearchSchema } from "../schemas/AdminSearch";
import { UserCreateSchema } from "../schemas/UserCreate";
import { UserSearchSchema } from "../schemas/UserSearch";
import { ObstacleCreateSchema } from "../schemas/ObstacleCreate";
import { ObsatacleSearchSchema } from "../schemas/ObstacleSearch";


const ObstacleRouter = Router();

ObstacleRouter.post('/create', bodyValidation(ObstacleCreateSchema), ObstacleController.create);

ObstacleRouter.get('/', queryValidation(ObsatacleSearchSchema), ObstacleController.getAll);

ObstacleRouter.delete('/:id', ObstacleController.del);

ObstacleRouter.post('/:id/fix', ObstacleController.fix);

ObstacleRouter.post('/:reportId/image', ObstacleController.reportImage);

ObstacleRouter.get('/:id', ObstacleController.get);


export default ObstacleRouter;