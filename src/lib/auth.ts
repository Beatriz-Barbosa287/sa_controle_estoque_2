import jwt, { JwtPayload } from "jsonwebtoken";

interface UserToken extends JwtPayload {
  username: string;
  role: "gestor" | "operador";
}

export function getUserFromToken(): UserToken | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === "string") return null;
    return decoded as UserToken;
  } catch {
    return null;
  }
}
export function isUserInRole(role: "gestor" | "operador"): boolean {
  const user = getUserFromToken();
  if (!user) return false;
  return user.role === role;
}