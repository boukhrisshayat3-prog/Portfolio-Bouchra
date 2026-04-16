import { z } from "zod"

export const heroSchema = z.object({
    image: z.string().url("La imagen debe ser una URL válida"),
    title: z.string().min(2, "El título es obligatorio").max(100, "El título no puede exceder los 100 caracteres"),
    paragraph: z.string().min(10, "El párrafo debe tener al menos 10 caracteres").max(200, "El párrafo no puede exceder los 200 caracteres"),
    buttonText: z.string().min(2, "El texto del botón es obligatorio").max(50, "El texto del botón no puede exceder los 50 caracteres"),
    buttonLink: z.string().url("El enlace del botón debe ser una URL válida"),
    buttonDow: z.string().url("La descarga del botón debe ser una URL válida"),
    imagePerfil: z.string().url("La imagen de perfil debe ser una URL válida")
})

export type HeroFormData = z.infer<typeof heroSchema>
export interface Hero {
     _id:string,
  image: string,
  title: string,
  paragraph: string,
  buttonText: string,
  buttonLink: string,
  buttonDow: string,
  imagePerfil:string
}