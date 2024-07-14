import { z } from 'zod'

export const ObstacleCreateSchema = z.object({
    lat: z.number({ required_error: 'Lat required' }),
    lng: z.number({ required_error: 'Lng required' }),
    type: z.enum(['A'], { required_error: 'type required' }),
    regionId: z.number({required_error: 'Region Id'}),
    userId: z.number({required_error: 'UserId is required'}),
    imageUrl: z.string({required_error: 'URL is required'})
})

export type ObstacleCreate = z.infer<typeof ObstacleCreateSchema>