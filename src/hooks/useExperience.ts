import { useEffect, useState } from "react"
import type { Experience } from "../schemas/experienceShema"


export const useExperience = () => {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch("https://ap-ihealen-journy.vercel.app/api/experience")
                if (!response.ok) throw new Error("Error al cargar la API")

                const data = await response.json()
                if (Array.isArray(data) && data.length > 0) {
                    setExperiences(data)
                } else {
                    setExperiences([data])
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error Fatal")
            } finally {
                setLoading(false)
            }
        }

        fetchExperiences()
    }, [])

    return { experiences, loading, error }
}