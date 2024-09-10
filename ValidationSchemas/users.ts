import {z} from "zod"

export const userSchema = z.object({
    name: z.string().min(3, "Nombre Requerido").max(255),
    username: z.string().min(3, "Usuario Requerido").max(255),
    password: z
    .string()
    .min(6, "Contraseña de al menos 6 carácteres")
    .max(255)
    .optional()
    .or(z.literal("")),
    role: z.string().min(3, "Rol Requerido").max(10),
})