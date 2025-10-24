"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user || user.role !== "gestor") router.push("/login");

    fetch("/api/produtos").then(res => res.json()).then(setProducts);
  }, [router]);

  const total = products.length;
  const abaixoMin = products.filter((p:any) => p.quantidadeAtual < p.quantidadeMinima).length;

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Total de produtos: {total}</p>
      <p>Produtos abaixo do mínimo: {abaixoMin}</p>
      <button onClick={() => router.push("/produtos")}>Ir para Produtos</button>
    </div>
  );
}
