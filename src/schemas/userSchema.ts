import { z } from "zod"

export const userSchema = z.object({
    name: z.string().min(2, "El nombre es obligatorio").max(100, "El nombre no puede exceder los 100 caracteres"),
    email: z.string().email("El correo electrónico no es válido"),
    role: z.string().min(2, "El rol es obligatorio").max(50, "El rol no puede exceder los 50 caracteres")
})

export type userFormData = z.infer<typeof userSchema>
export interface User {
     _id:string,
  name: string,
    email: string,
    role: string
}

