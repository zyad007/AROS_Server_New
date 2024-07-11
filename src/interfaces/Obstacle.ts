import Base from "./Base";

export interface Obstacle extends Base {
    lat: number,
    lng: number,
    type: string,
    status: 'ACTIVE' | 'FIXED',

    noReports: number,
    imageUrl: string,

    regionId: number
}