import { getProducts } from "./produtoController";
import { getMovements } from "./movementController";

export async function getEstoqueResumo() {
  const products = await getProducts();
  const movements = await getMovements();

  return {
    totalProdutos: products.length,
    produtosAbaixoMinimo: products.filter((p: any) => p.quantidadeAtual < p.quantidadeMinima).length,
    totalMovimentacoes: movements.length
  };
}
