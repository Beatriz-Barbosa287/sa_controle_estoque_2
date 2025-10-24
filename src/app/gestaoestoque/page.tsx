"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/auth";

export default function GestaoEstoquePage() {
  const router = useRouter();
  const [resumo, setResumo] = useState<{ totalProdutos: number; produtosAbaixoMinimo: number; totalMovimentacoes: number } | null>(null);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user || user.role !== "gestor") router.push("/login");

    const token = localStorage.getItem("token");
    fetch("/api/gestaoestoque", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setResumo);
  }, [router]);

  if (!resumo) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestão de Estoque</h1>
      <p>Total de produtos: {resumo.totalProdutos}</p>
      <p>Produtos abaixo do mínimo: {resumo.produtosAbaixoMinimo}</p>
      <p>Total de movimentações: {resumo.totalMovimentacoes}</p>
      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
      <button onClick={() => router.push("/produtos")}>Produtos</button>
      <button onClick={() => router.push("/movements")}>Movimentações</button>
    </div>
  );
}
