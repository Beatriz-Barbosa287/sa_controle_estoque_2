"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../lib/auth";

export default function MovementsPage() {
  const router = useRouter();

  const [movements, setMovements] = useState<any[]>([]);
  const [produtoNome, setProdutoNome] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user || (user.role !== "operador" && user.role !== "gestor")) router.push("/login");

    fetch("/api/movements").then(res => res.json()).then(setMovements);
  }, [router]);

  const handleAddMovement = async () => {
    const token = localStorage.getItem("token");
    const user = getUserFromToken();
    if (!user) return;

    const res = await fetch("/api/movements", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ produtoNome, tipo, quantidade, operador: user.username })
    });

    const newMovement = await res.json();
    setMovements([...movements, newMovement]);
    setProdutoNome(""); setTipo("entrada"); setQuantidade(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Movimentações</h1>

      {/* Formulário de movimentações */}
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Nome do Produto" value={produtoNome} onChange={e => setProdutoNome(e.target.value)} />

        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <input type="number" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} />

        <button onClick={handleAddMovement}>Registrar Movimentação</button>
      </div>

      {/* Tabela de histórico */}
      <table border={1} cellPadding={5}>
        <thead>
          <tr><th>Produto</th><th>Tipo</th><th>Qtd</th><th>Operador</th><th>Data</th></tr>
        </thead>
        <tbody>
          {movements.map((m:any) => (
            <tr key={m._id}>
              <td>{m.produtoNome}</td>
              <td>{m.tipo}</td>
              <td>{m.quantidade}</td>
              <td>{m.operador}</td>
              <td>{new Date(m.data).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
