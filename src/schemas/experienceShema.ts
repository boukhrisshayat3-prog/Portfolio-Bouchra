import { z } from "zod"

export const experienceSchema = z.object({
    _id: z.string().min(1, "El id es obligatorio"),
    period: z.string().min(2, "El periodo es obligatorio"),
    role: z.string().min(2, "El rol es obligatorio"),
    company: z.string().min(2, "La empresa es obligatoria"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    technologies: z.array(z.string().min(1, "La tecnología no puede estar vacía")).min(1, "Debes agregar al menos una tecnología"),
    current: z.boolean()
})

export type ExperienceFormData = z.infer<typeof experienceSchema>

export interface Experience {
    _id: string;
    period: string;
    role: string;
    company: string;
    description: string;
    technologies: string[];
    current: boolean;
}

