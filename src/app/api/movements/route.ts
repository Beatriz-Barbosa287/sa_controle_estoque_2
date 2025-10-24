import { NextRequest, NextResponse } from "next/server";
import { getMovements, createMovement } from "../../../controllers/movementController";
import jwt from "jsonwebtoken";

export async function GET() {
  const movements = await getMovements();
  return NextResponse.json(movements);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const decoded: { username: string; role: string } = jwt.verify(token, process.env.JWT_SECRET!) as { username: string; role: string };
    if (decoded.role !== "gestor" && decoded.role !== "operador") return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

    const data = await req.json();
    const movement = await createMovement(data);
    return NextResponse.json(movement);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
