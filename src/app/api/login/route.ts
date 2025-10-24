import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const users = [
  { username: "operador", password: "123", role: "operador" },
  { username: "gestor", password: "456", role: "gestor" }
];

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return NextResponse.json({ error: "Usuário ou senha inválidos" }, { status: 401 });

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return NextResponse.json({ token, role: user.role });
}
