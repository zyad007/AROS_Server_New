import {z} from 'zod'
export const UserCreateSchema = z.object({
    firstName: z.string({required_error: "First name is required"}),
    lastName : z.string({required_error: "Last name is required"}),
    email: z.string({required_error: 'email is required'}).email('Not a valid email'),
    licenseNumber: z.string({required_error:'license is required'})
}) 

export type UserCreate = z.infer<typeof UserCreateSchema>