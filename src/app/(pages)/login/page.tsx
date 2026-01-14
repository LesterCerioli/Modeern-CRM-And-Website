"use client";
import { LoginForm } from "@/components/auth/loginForm/loginForm";
import { useRouter } from "next/navigation";


const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = (role: "admin" | "accounting" | "finance" | "marketing" | "it" | "accounting-manager" | "finance-manager" | "marketing-manager" | "it-manager") => {
    sessionStorage.setItem("currentRole", role);

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "accounting" || role === "accounting-manager" || role === "finance" || role === "finance-manager") {
      router.push("/accounting");
    } else if (role === "marketing" || role === "marketing-manager") {
      router.push("/marketing");
    } else if (role === "it" || role === "it-manager") {
      router.push("/it");
    } else {
      router.push("/dashboard");
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
