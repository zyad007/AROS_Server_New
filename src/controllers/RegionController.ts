import { RequestHandler } from "express";
import { RegionModel } from "../models/RegionModel";
import { Result } from "../dto/Result";
import { Token } from "../types/Token";
import BadRequest from "../errors/BadRequest";
import { Region } from "../interfaces/Region";
import { RegionCreate } from "../schemas/RegionCreate";
import { RegionSearch } from "../schemas/RegionSearch";
import NotFound from "../errors/NotFound";
import { PointModel } from "../models/PointModel";

export const create: RequestHandler = async (req, res, next) => {

    try {

        const regionData = req.body as RegionCreate;

        const region: Region = {
            id: 0,
            name: regionData.name,
            city: regionData.city,
            country: regionData.country
        }

        const exists = await RegionModel.getOne({ name: region.name });

        if (exists) return next(new BadRequest('Region with this name exists'));

        const result = await RegionModel.save(region)

        if (!result) return next(new BadRequest('Error creating Region'));

        for (let i = 0; i < regionData.points.length; i++) {
            setTimeout(async () => {
                await PointModel.save({
                    id: 0,
                    lat: regionData.points[i][0],
                    lng: regionData.points[i][1],
                    regionId: result.id
                })
            }, 100 * i)
        }

        return res.status(200).send(new Result(
            true,
            '',
            result
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
        const { name, page }: RegionSearch = query;

        let [regions, count] = await RegionModel.search({ name }, page);

        // if(count === -1) count = await AdminModel.count();

        res.status(200).send(new Result(
            true,
            count + '',
            regions
        ))

    }

    catch (e) {
        next(e);
    }

}

export const get: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const region = await RegionModel.getById(id);

        if (!region) return next(new NotFound('No region with this Id'));

        const polygon = await region.getPolygon();

        return res.send({
            ...region,
            points: polygon?.map(x => ([
                x.lat,
                x.lng
            ]))
        })

    }

    catch (e) {
        next(e)
    }
}

export const del: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {

        const { id } = req.params;

        const region = await RegionModel.getById(id);

        if (!region) return next(new NotFound('No region with this id'));

        await PointModel.deleteRegion(region.id);

        const result = await region.delete();

        if (result) return res.sendStatus(204);

        return next(new BadRequest('Error deleting region'))

    }

    catch (e) {
        next(e);
    }
}