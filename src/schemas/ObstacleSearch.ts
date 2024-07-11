import {z} from 'zod'

export const ObsatacleSearchSchema = z.object({
    type: z.enum(['']).optional(),
    status: z.enum(['ACTIVE', 'FIXED']).optional(),
    page: z.number().optional()
})

export type ObsatacleSearch = z.infer<typeof ObsatacleSearchSchema>