import { useEffect, useState } from "react"
import type { Testimonials } from "../schemas/testimonialsShema"

export const useTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonials[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("https://ap-ihealen-journy.vercel.app/api/testimonials")

                if (!response.ok) {
                    throw new Error("Error al cargar la API")
                }

                const data = await response.json()

                if (Array.isArray(data) && data.length > 0) {
                    setTestimonials(data)
                } else if (data) {
                    setTestimonials([data])
                } else {
                    setTestimonials([])
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error Fatal")
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    return { testimonials, loading, error }
}