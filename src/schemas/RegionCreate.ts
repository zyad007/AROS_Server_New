import {z} from 'zod'

export const RegionCreateSchema = z.object({
    city: z.string({required_error: "city is required"}),
    name : z.string({required_error: "name is required"}),
    country : z.string({required_error: "country is required"}),
    points: z.array(z.array(z.number()).min(2).max(2)).min(3)
}) 

export type RegionCreate = z.infer<typeof RegionCreateSchema>