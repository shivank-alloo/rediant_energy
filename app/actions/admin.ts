"use server";

import { cookies } from "next/headers";

const ADMIN_ACCOUNTS = [
  { email: "admin@rediantenergy.com", password: "rediant_admin" },
  { email: "sales@rediantenergy.com", password: "sales_admin" },
  { email: "shivankt589@gmail.com", password: "shivank123" },
];

const SESSION_COOKIE = "rediant_admin_session";
const SESSION_VALUE = "authenticated";

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const account = ADMIN_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
  );
  if (!account) {
    return { success: false, error: "Invalid email or password. Please try again." };
  }
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: false, // Allow HTTP (e.g. http://localhost) for local testing
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
  return { success: true };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}
