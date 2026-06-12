import { cookies } from "next/headers";

export async function createSession(
  username: string,
  role: string
) {
  const cookieStore = await cookies();

  cookieStore.set("user", username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  cookieStore.set("role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete("user");
  cookieStore.delete("role");
}

export async function getSession() {
  const cookieStore = await cookies();

  return {
    user: cookieStore.get("user")?.value,
    role: cookieStore.get("role")?.value,
  };
}