import { useState } from "react";
import AnimatedBorderButton  from "./AnimatedBorderButton";

interface LoginProps {
    onLogin: (username: string) => void;
}

const USUARIOS_PERMITIDOS = ["admin", "alumno"]; //( Both valid users)

const Login = ({onLogin}: LoginProps) => {
    const [usuario, setUsuario] = useState("");
    const [error, setError] = useState("")


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(USUARIOS_PERMITIDOS.includes(usuario.toLocaleLowerCase())){
            localStorage.setItem("username", usuario)
            onLogin(usuario)
        }else{
          setError("Invalid username")
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className=" p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-foreground text-center mb-6">System Access</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your username..."
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <AnimatedBorderButton>
            Sign in
          </AnimatedBorderButton>
        </form>
      </div>
    </div>
  )
}

export default Login