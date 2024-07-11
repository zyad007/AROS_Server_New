import { query } from "../db";
import { Admin } from "../interfaces/Admin";
import { Test } from "../interfaces/Test";
import { Point } from "../interfaces/Point";
import { BaseModel } from "./BaseModel";

export class PointModel extends BaseModel<Point, PointModel>('points', () => PointModel) implements Point {

    public lat: number;
    public lng: number;
    public regionId: number;

    constructor(point: Point) {
        super(point.id);
        Object.assign(this, point)
    }

    public static async deleteRegion(regionId: number) {
        await query(`DELETE FROM points WHERE region_id = $1`, [regionId]);
    }
}
