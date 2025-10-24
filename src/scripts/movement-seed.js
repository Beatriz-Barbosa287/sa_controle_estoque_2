import mongoose from "mongoose";
import Movement from "./models/Movement";
import Product from "./models/Product";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/estoque";

async function seedMovements() {
  await mongoose.connect(MONGODB_URI);

  const products = await Product.find();
  if (products.length === 0) {
    console.log("Popule os produtos antes de criar movimentações!");
    return mongoose.disconnect();
  }

  const movements = [
    { produtoId: products[0]._id, tipo: "saida", quantidade: 3, operador: "operador" },
    { produtoId: products[1]._id, tipo: "entrada", quantidade: 10, operador: "gestor" },
    { produtoId: products[2]._id, tipo: "saida", quantidade: 5, operador: "operador" },
    { produtoId: products[3]._id, tipo: "saida", quantidade: 1, operador: "gestor" },
    { produtoId: products[4]._id, tipo: "entrada", quantidade: 5, operador: "operador" },
    { produtoId: products[5]._id, tipo: "saida", quantidade: 2, operador: "operador" },
    { produtoId: products[6]._id, tipo: "saida", quantidade: 1, operador: "gestor" },
    { produtoId: products[7]._id, tipo: "entrada", quantidade: 3, operador: "gestor" },
    { produtoId: products[8]._id, tipo: "saida", quantidade: 6, operador: "operador" },
    { produtoId: products[9]._id, tipo: "entrada", quantidade: 4, operador: "gestor" }
  ];

  await Movement.deleteMany({});
  await Movement.insertMany(movements);
  console.log("Movimentações populadas com sucesso!");
  mongoose.disconnect();
}

seedMovements().catch(err => console.error(err));
