import { z } from "zod"

export const testimonialsSchema = z.object({
    _id: z.string().min(1, "El id es obligatorio"),
    quote: z.string().min(2, "La cita es obligatoria"),
    author: z.string().min(2, "El autor es obligatorio"),
    role: z.string().min(2, "El rol es obligatorio"),
    avatar: z.string().min(2, "El avatar es obligatorio")
})

export type TestimonialsFormData = z.infer<typeof testimonialsSchema>

export interface Testimonials {
    _id: string;
    quote: string;
    author: string;
    role: string;
    avatar: string;
}