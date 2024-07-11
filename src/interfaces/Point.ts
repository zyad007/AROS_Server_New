import Base from "./Base";

export interface Point extends Base {
    lat: number,
    lng: number,
    regionId: number
}