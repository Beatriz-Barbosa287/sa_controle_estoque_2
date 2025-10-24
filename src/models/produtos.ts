import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  nome: String,
  sku: String,
  quantidadeMinima: Number,
  quantidadeAtual: Number,
  precoUnitario: Number,
  categoria: String
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
