import mongoose from "mongoose";

const MovementSchema = new mongoose.Schema({
  produtoNome: String,
  tipo: String, // "entrada" ou "saida"
  quantidade: Number,
  operador: String,
  data: { type: Date, default: Date.now }
});

export default mongoose.models.Movement || mongoose.model("Movement", MovementSchema);
