"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/auth";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [sku, setSku] = useState("");
  const [qtdMin, setQtdMin] = useState(0);
  const [qtdAtual, setQtdAtual] = useState(0);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user || user.role !== "gestor") router.push("/login");

    fetch("/api/produtos")
      .then(res => res.json())
      .then(setProducts);
  }, [router]);

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nome, sku, quantidadeMinima: qtdMin, quantidadeAtual: qtdAtual })
    });

    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setNome(""); setSku(""); setQtdMin(0); setQtdAtual(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Produtos</h1>

      {/* Formulário para adicionar produto */}
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input placeholder="SKU" value={sku} onChange={e => setSku(e.target.value)} />
        <input type="number" placeholder="Qtd Mínima" value={qtdMin} onChange={e => setQtdMin(Number(e.target.value))} />
        <input type="number" placeholder="Qtd Atual" value={qtdAtual} onChange={e => setQtdAtual(Number(e.target.value))} />
        <button onClick={handleAdd}>Adicionar Produto</button>
      </div>

      {/* Tabela de produtos */}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Nome</th><th>SKU</th><th>Qtd Atual</th><th>Qtd Mínima</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p:any) => (
            <tr key={p._id} style={{ backgroundColor: p.quantidadeAtual < p.quantidadeMinima ? "#f99" : "#9f9" }}>
              <td>{p.nome}</td>
              <td>{p.sku}</td>
              <td>{p.quantidadeAtual}</td>
              <td>{p.quantidadeMinima}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
