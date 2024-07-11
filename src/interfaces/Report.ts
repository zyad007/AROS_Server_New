import Base from "./Base";

export interface Report extends Base {
    lat: number,
    lng: number,
    imageUrl: string

    obstacleId: number,
    userId: number
}