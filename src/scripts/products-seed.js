import mongoose from "mongoose";
import Product from "./models/Product";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/estoque";

const products = [
  { nome: "Caneta esferográfica azul", sku: "CAN001", quantidadeMinima: 10, quantidadeAtual: 8, precoUnitario: 2.5, categoria: "Escrita" },
  { nome: "Lápis grafite HB", sku: "LAP002", quantidadeMinima: 20, quantidadeAtual: 25, precoUnitario: 1.2, categoria: "Escrita" },
  { nome: "Borracha branca", sku: "BOR003", quantidadeMinima: 15, quantidadeAtual: 12, precoUnitario: 0.8, categoria: "Escrita" },
  { nome: "Caderno universitário 200 folhas", sku: "CAD004", quantidadeMinima: 5, quantidadeAtual: 3, precoUnitario: 14.9, categoria: "Papelaria" },
  { nome: "Papel A4 (resma 500 folhas)", sku: "PAP005", quantidadeMinima: 10, quantidadeAtual: 15, precoUnitario: 29.9, categoria: "Papelaria" },
  { nome: "Clips metálico 100 unidades", sku: "CLI006", quantidadeMinima: 10, quantidadeAtual: 9, precoUnitario: 5, categoria: "Organização" },
  { nome: "Grampeador pequeno", sku: "GRA007", quantidadeMinima: 3, quantidadeAtual: 2, precoUnitario: 18, categoria: "Organização" },
  { nome: "Caixa de grampos nº10", sku: "GRA008", quantidadeMinima: 5, quantidadeAtual: 7, precoUnitario: 3.5, categoria: "Organização" },
  { nome: "Marcador permanente preto", sku: "MAR009", quantidadeMinima: 10, quantidadeAtual: 4, precoUnitario: 6, categoria: "Escrita" },
  { nome: "Pasta plástica com elástico", sku: "PAS010", quantidadeMinima: 8, quantidadeAtual: 10, precoUnitario: 4.5, categoria: "Organização" }
];

async function seedProducts() {
  await mongoose.connect(MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Produtos populados com sucesso!");
  mongoose.disconnect();
}

seedProducts().catch(err => console.error(err));
