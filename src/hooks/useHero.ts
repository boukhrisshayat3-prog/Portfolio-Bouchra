import { useEffect, useState } from "react"
import type { Hero } from "../types/hero"

export const useHero = () => {
    const [hero, setHero] = useState<Hero | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await fetch("https://ap-ihealen-journy.vercel.app/api/hero")
                if (!response.ok) throw new Error("Error al cargar la API")

                const data = await response.json()
                if (Array.isArray(data) && data.length > 0) {
                    setHero(data[0])
                } else {
                    setHero(data)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error Fatal")
            } finally {
                setLoading(false)
            }
        }

        fetchHero()
    }, [])

    return { hero, loading, error }
}