import { RequestHandler } from "express";
import NotFound from "../errors/NotFound";
import BadRequest from "../errors/BadRequest";
import { ObstacleModel } from "../models/ObstacleModel";
import { Result } from "../dto/Result";
import { Obstacle } from "../interfaces/Obstacle";
import { ObsatacleSearch } from "../schemas/ObstacleSearch";
import { ObstacleCreate } from "../schemas/ObstacleCreate";
import { ReportModel } from "../models/ReportModel";
import { UserModel } from "../models/UserModel";

export const create: RequestHandler = async (req, res, next) => {

    try {

        const obstacleData = req.body as ObstacleCreate;

        const obstacle: Obstacle = {
            lat: obstacleData.lat,
            lng: obstacleData.lng,
            regionId: obstacleData.regionId,
            type: obstacleData.type,

            id: 0,
            status: "ACTIVE",
            imageUrl: obstacleData.imageUrl,
            noReports: 1
        }

        const userId = obstacleData.userId;

        const user = await UserModel.getById(userId);

        if (!user) return next(new NotFound('User not found'));

        const exists = await ObstacleModel.getByLatLng(obstacle.lat, obstacle.lng, 0.0001, obstacle.type);

        if (!exists) {
            const result = await ObstacleModel.save(obstacle)

            if (!result) return next(new BadRequest('Error creating Obstacle'));

            const report = await ReportModel.save({
                lat: result.lat,
                lng: result.lng,
                obstacleId: result.id,
                imageUrl: result.imageUrl,
                userId: userId,

                id: 0,
            })

            return res.status(200).send(new Result(
                true,
                '',
                report
            ));
        }

        const report = await ReportModel.save({
            id: 0,
            lat: exists.lat,
            lng: exists.lng,
            obstacleId: exists.id,
            userId: userId,
            imageUrl: obstacleData.imageUrl
        })

        exists.noReports += 1;
        exists.imageUrl = obstacleData.imageUrl;
        await exists.save();

        return res.status(200).send(new Result(
            true,
            '',
            report
        ));
    }

    catch (e) {
        console.log(e);
        next(e);
    }

}

export const getAll: RequestHandler = async (req, res, next) => {

    try {
        let query = {};
        Object.assign(query, req.query);
        const { status, type, page }: ObsatacleSearch = query;

        let [obstacles, count] = await ObstacleModel.search({ status, type }, page);

        // if(count === -1) count = await AdminModel.count();

        res.status(200).send(new Result(
            true,
            count + '',
            obstacles
        ))

    }

    catch (e) {
        next(e);
    }

}

export const reportImage: RequestHandler<{ reportId: number }> = async (req, res, next) => {
    try {

        const {imageUrl} = req.body;
        const {reportId} = req.params;

        if(!imageUrl) return next(new BadRequest('URL is required'));

        const report = await ReportModel.getById(reportId);

        console.log(report);

        if (!report) return next(new NotFound('No report with this Id'));

        report.imageUrl = imageUrl;
        console.log(report);
        await report.save();

        const obstacle = await ObstacleModel.getById(report.obstacleId);

        if (!obstacle) return next(new NotFound('No obstacle with this Id'));

        obstacle.imageUrl = imageUrl;
        await obstacle.save();

        return res.sendStatus(200);

    }
    catch (e) {
        next(e);
    }
}

export const get: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const obstacle = await ObstacleModel.getById(id);

        if (!obstacle) return next(new NotFound('No obstacle with this Id'));

        const reports = await ReportModel.getMany({obstacleId: obstacle.id});

        return res.send({
            ...obstacle,
            reports
        })

    }

    catch (e) {
        console.log(e);
        next(e)
    }
}

export const fix: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const obstacle = await ObstacleModel.getById(id);

        if (!obstacle) return next(new NotFound('No obstacle with this Id'));

        obstacle.status = 'FIXED';
        await obstacle.save();

        return res.send(obstacle);
    }
    catch (e) {

    }
}

export const del: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const obstacle = await ObstacleModel.getById(id);

        if (!obstacle) return next(new NotFound('No obstacle with this id'));

        await ReportModel.deleteObstacle(obstacle.id)

        const result = await obstacle.delete();

        if (result) return res.sendStatus(204);

        return next(new BadRequest('Error deleting obstacle'))
    }

    catch (e) {
        next(e);
    }
}