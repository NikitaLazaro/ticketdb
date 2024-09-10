import {z} from "zod"

export const ticketSchema = z.object({
    title: z.string().min(1, "Titulo Obligatorio").max(255),
    description: z.string().min(1, "Descripción Obligatoria").max(255),
    status: z.string().min(1, "Status").max(10).optional(),
    priority: z.string().min(1, "Priority").max(10).optional(),
})

export const ticketPatchSchema = z.object({
    title: z.string().min(1, "Titulo Obligatorio").max(255).optional(),
    description: z.string().min(1, "Descripción Obligatoria").max(255).optional(),
    status: z.string().min(1, "Status").max(10).optional().optional(),
    priority: z.string().min(1, "Priority").max(10).optional().optional(),
})