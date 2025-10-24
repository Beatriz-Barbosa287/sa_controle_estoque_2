import mongoose from "mongoose";
import User from "../models/usuarios";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/estoque";

const users = [
  { username: "operador", password: "123", role: "operador" },
  { username: "gestor", password: "456", role: "gestor" }
];

async function initUsers() {
  await mongoose.connect(MONGODB_URI);
  await User.deleteMany({});
  await User.insertMany(users);
  console.log("Usuários iniciais criados!");
  mongoose.disconnect();
}

initUsers().catch(console.error);
