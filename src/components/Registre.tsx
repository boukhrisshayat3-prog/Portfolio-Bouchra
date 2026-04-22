import { useEffect, useState } from "react";
import AnimatedBorderButton from "./AnimatedBorderButton";

interface DashboardProps {
  onLogin: (email: string) => void;
}

interface AuthCredential {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface ApiUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface ApiHero {
  image?: string;
}

const AUTH_STORAGE_KEY = "auth_credentials";

const readCredentials = (): AuthCredential[] => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is AuthCredential =>
            typeof item?.name === "string" &&
            typeof item?.email === "string" &&
            typeof item?.role === "string" &&
            typeof item?.password === "string"
        )
      : [];
  } catch {
    return [];
  }
};

export function Dashboard({ onLogin }: DashboardProps) {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [apiUsers, setApiUsers] = useState<ApiUser[]>([]);
  const [apiError, setApiError] = useState("");
  const [heroImage, setHeroImage] = useState("/hero.png");

    const inputClassName = `relative border
      --color-primary hover:border-primary/50 transition-all
      duration-1000 focus:outline-none focus-visible:ring-2
      focus-visible:ring-primary focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed group
       text-lg font-medium overflow-visible
      animated-border p-3 rounded-lg w-full focus:ring-2  outline-none`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://ap-ihealen-journy.vercel.app/api/users");
        if (!response.ok) {
          throw new Error("Could not fetch users from API.");
        }

        const data: ApiUser[] = await response.json();
        setApiUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setApiError(err instanceof Error ? err.message : "Unknown API error.");
      }
    };

    const fetchHeroImage = async () => {
      try {
        const response = await fetch("https://ap-ihealen-journy.vercel.app/api/hero");
        if (!response.ok) return;

        const data: ApiHero | ApiHero[] = await response.json();
        const heroData = Array.isArray(data) ? data[0] : data;
        if (heroData?.image && heroData.image.trim()) {
          setHeroImage(heroData.image);
        }
      } catch {
        
      }
    };

    fetchUsers();
    fetchHeroImage();
  }, []);

  const resetFeedback = () => {
    setMessage("");
    setError("");
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFeedback();

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (role.trim().length < 2) {
      setError("Role must be at least 2 characters.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const credentials = readCredentials();
    const existsInLocal = credentials.some(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase()
    );

    const existsInApi = apiUsers.some(
      (item) =>
        item.name.toLowerCase() === name.trim().toLowerCase() ||
        item.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existsInLocal || existsInApi) {
      setError("This email is already registered. Please log in.");
      setMode("login");
      return;
    }

    const nextCredentials = [
      ...credentials,
      {
        name: name.trim(),
        email: email.trim(),
        role: role.trim(),
        password,
      },
    ];

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextCredentials));
    setMessage("Account created. You can log in now.");
    setName("");
    setEmail("");
    setRole("");
    setPassword("");
    setMode("login");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetFeedback();

    const credentials = readCredentials();
    const match = credentials.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!match) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("username", match.email);
    onLogin(match.email);
  };

  return (
    <div
      className="--color-primary min-h-screen p-8 flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url('${heroImage}')` }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="w-full max-w-md rounded-2xl shadow-lg border p-8 relative z-10" style={{ backgroundImage: `url('${heroImage}')` }}>
        <h1 className="text-3xl --color-secondary text-slate-800 mb-2">
          {mode === "register" ? "Create Account" : "Log In"}
        </h1>
        <p className="  --color-muted-foreground mb-6">
          {mode === "register"
            ? "Create email and password to access the portfolio."
            : "Use your email and password to enter."}
        </p>
        {apiError && <p className="text-amber-600 text-sm mb-4">{apiError}</p>}

        <form
          onSubmit={mode === "register" ? handleRegister : handleLogin}
          className="space-y-4"
        >
          {mode === "register" && (
            <>
              <div>
                <label className="block mb-1 text-md font-medium --color-secondary">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium --color-secondary">
                  Role
                </label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputClassName}
                  placeholder="Your role"
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium --color-secondary">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClassName}
              placeholder="Your email address"
            />
          </div>

    

          <div>
            <label className="block mb-1 text-sm font-medium --color-secondary">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClassName}
              placeholder="Your password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}
        

          <AnimatedBorderButton className="mx-auto block">
            {mode === "register" ? "Create account" : "Log in"}
          </AnimatedBorderButton>
        
        </form>

        <button
          type="button"
          onClick={() => {
            resetFeedback();
            setMode((prev) => (prev === "register" ? "login" : "register"));
          }}
          className="w-full mt-4 text-sm font-semibold  hover:underline"
        >
          {mode === "register"
            ? "Already have an account? Log in"
            : "Need an account? Register"}
        </button>
      </div>
    </div>
  );
}
