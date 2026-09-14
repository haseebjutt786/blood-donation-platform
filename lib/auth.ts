import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "bloodconnect_fallback_secret_key_32chars"
)

export type SessionUser = {
  id: string
  name: string
  email: string
  role: "donor" | "admin"
}

// Sign a JWT and return token string
export async function signToken(payload: SessionUser): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

// Verify JWT token string → SessionUser or null
export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionUser
  } catch {
    return null
  }
}

// Read session from the request cookie (server components / API routes)
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("bc_session")?.value
    if (!token) return null
    return await verifyToken(token)
  } catch {
    return null
  }
}

// Cookie options
export const SESSION_COOKIE = "bc_session"
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
}
