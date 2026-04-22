import { z } from "zod"

export const contactInfoSchema = z.object({
    _id: z.string().min(1, "El id es obligatorio"),
    icon: z.string().min(1, "El icono es obligatorio"),
    label: z.string().min(2, "La etiqueta es obligatoria"),
    value: z.string().min(2, "El valor es obligatorio"),
    href: z.string().min(2, "El enlace es obligatorio")
})

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>

export interface ContactInfo {
    _id: string;
    icon: string;
    label: string;
    value: string;
    href: string;
}