import { useEffect, useState } from "react"
import type { Projects } from "../schemas/projectShema"

export const useProjects = () => {
    const [projects, setProjects] = useState<Projects[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("https://ap-ihealen-journy.vercel.app/api/projects")
                if (!response.ok) throw new Error("Error al cargar la API")

                const data = await response.json()
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data)
                } else {
                    setProjects([data])
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error Fatal")
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    return { projects, loading, error }
}