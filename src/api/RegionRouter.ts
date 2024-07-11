import { Router } from "express";
import { bodyValidation, queryValidation } from "../middlewares/Validation";
import { LoginSchema } from "../schemas/LoginSchema";
import * as RegionController from "../controllers/RegionController";
import { AdminCreateSchema } from "../schemas/AdminCreate";
import { AdminSearchSchema } from "../schemas/AdminSearch";
import { RegionCreateSchema } from "../schemas/RegionCreate";
import { RegionSearchSchema } from "../schemas/RegionSearch";


const RegionRouter = Router();

RegionRouter.post('/create', bodyValidation(RegionCreateSchema), RegionController.create );

RegionRouter.get('/', queryValidation(RegionSearchSchema) , RegionController.getAll );

RegionRouter.delete('/:id', RegionController.del);

RegionRouter.get('/:id', RegionController.get);


export default RegionRouter;