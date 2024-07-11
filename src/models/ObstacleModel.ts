import { query } from "../db";
import { Admin } from "../interfaces/Admin";
import { Test } from "../interfaces/Test";
import { Obstacle } from "../interfaces/Obstacle";
import { BaseModel } from "./BaseModel";

export class ObstacleModel extends BaseModel<Obstacle, ObstacleModel>('obstacles', () => ObstacleModel) implements Obstacle {
    
    public lat: number;
    public lng: number;
    public type: string;
    public status: "ACTIVE" | "FIXED";
    public regionId: number;
    public noReports: number;
    public imageUrl: string;

    constructor(obstacle: Obstacle) {
        super(obstacle.id);
        Object.assign(this, obstacle)
    }

    public static async getByLatLng(lat: number, lng: number, offset: number, type: string): Promise<ObstacleModel | undefined> {
        const {rows} = await query(`SELECT * FROM obstacles WHERE lat < ${lat+offset} AND lat > ${lat-offset} AND lng < ${lng+offset} AND lng > ${lng-offset} AND type = '${type}'`, []);

        if(!rows.length) return

        const modelDb = super.recursiveToCamel(rows[0]) as Obstacle;

        return new ObstacleModel(modelDb);
    } 
}
