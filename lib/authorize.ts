import { cookies } from "next/headers";

export async function requireRole(
  allowedRoles: string[]
) {
  const cookieStore = await cookies();

  const user =
    cookieStore.get("user")?.value;

  const role =
    cookieStore.get("role")?.value;

  if (!user || !role) {
    return {
      authorized: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  if (!allowedRoles.includes(role)) {
    return {
      authorized: false,
      status: 403,
      message: "Forbidden",
    };
  }

  return {
    authorized: true,
    user,
    role,
  };
}