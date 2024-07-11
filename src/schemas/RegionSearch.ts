import {z} from 'zod'
export const RegionSearchSchema = z.object({
    name: z.string().optional(),
    page: z.number().optional()
}) 

export type RegionSearch = z.infer<typeof RegionSearchSchema>