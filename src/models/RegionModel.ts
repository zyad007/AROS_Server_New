import { query } from "../db";
import { Region } from "../interfaces/Region";
import { BaseModel } from "./BaseModel";
import { PointModel } from "./PointModel";

export class RegionModel extends BaseModel<Region, RegionModel>('regions', () => RegionModel) implements Region {

    public name: string;
    public country: string;
    public city: string;

    constructor(region: Region) {
        super(region.id);
        Object.assign(this, region)
    }

    public async getPolygon() {
        return await PointModel.getMany({
            regionId: this.id
        })
    }

}
