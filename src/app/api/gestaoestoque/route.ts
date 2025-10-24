import { NextRequest, NextResponse } from "next/server";
import { getEstoqueResumo } from "../../../controllers/gestaoestoqueController";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const decoded: { username: string; role: string } = jwt.verify(token, process.env.JWT_SECRET!) as { username: string; role: string };
    if (decoded.role !== "gestor") return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

    const resumo = await getEstoqueResumo();
    return NextResponse.json(resumo);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
