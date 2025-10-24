import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "../../../controllers/produtoController";
import jwt from "jsonwebtoken";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const decoded: { username: string; role: string } = jwt.verify(token, process.env.JWT_SECRET!) as { username: string; role: string };
    if (decoded.role !== "gestor") return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

    const data = await req.json();
    const product = await createProduct(data);
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
