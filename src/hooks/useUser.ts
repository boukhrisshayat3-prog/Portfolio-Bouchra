import { useEffect, useState } from "react"
import type { User } from "../schemas/userSchema"

export const useUser = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const [isRegistered, setIsRegistered] = useState<boolean>(() => {
        return localStorage.getItem("user_registered") === "true"
    })

    const registerUser = (userData: { name: string, email: string, role: string }) => {
  
        console.log("User registered:", userData);
        
        localStorage.setItem("user_registered", "true");
        setIsRegistered(true);
    }

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch('https://ap-ihealen-journy.vercel.app/api/users')
                if (!response.ok) throw new Error('Error al cargar la API')

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error Fatal')
            } finally {
                setLoading(false)
            }
        }
        
  
        if (isRegistered) {
            setLoading(true)
            fetchCharacter();
        } else {
            setLoading(false)
        }
    }, [isRegistered])

    return { users, loading, error, isRegistered, registerUser }
}