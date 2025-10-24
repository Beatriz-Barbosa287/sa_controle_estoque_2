"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      // Se não estiver logado, envia para login
      router.push("/login");
    } else if (user.role === "gestor") {
      router.push("/dashboard");
    } else if (user.role === "operador") {
      router.push("/movements");
    } else {
      // Caso role desconhecida
      router.push("/login");
    }
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-vindo ao Sistema de Estoque</h1>
      <p>Redirecionando...</p>
    </div>
  );
}
