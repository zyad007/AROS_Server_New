import { query } from "../db";
import { Report } from "../interfaces/Report";
import { Test } from "../interfaces/Test";
import { BaseModel } from "./BaseModel";

export class ReportModel extends BaseModel<Report, ReportModel>('reports', () => ReportModel) implements Report {


    public lat: number;
    public lng: number;
    public imageUrl: string;
    public obstacleId: number;
    public userId: number;

    constructor(Report: Report) {
        super(Report.id);
        Object.assign(this, Report)
    }

    public static async deleteObstacle(obstacleId: number) {
        await query(`DELETE FROM reports WHERE obstacle_id = $1`, [obstacleId]);
    }

}
