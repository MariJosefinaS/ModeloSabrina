import { cookies } from "next/headers";
import { isValidSession, ADMIN_COOKIE } from "@/lib/auth";
import { listConsultas } from "@/lib/store";
import { Consulta } from "@/lib/types";
import AdminLogin from "@/components/AdminLogin";
import AdminClient from "@/components/AdminClient";
import Decor from "@/components/Decor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authed = isValidSession(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!authed) {
    return (
      <main className="relative grid min-h-screen place-items-center px-4">
        <Decor />
        <AdminLogin />
      </main>
    );
  }

  let consultas: Consulta[] = [];
  try {
    consultas = await listConsultas();
  } catch {
    consultas = [];
  }

  return (
    <main className="relative min-h-screen">
      <Decor />
      <AdminClient initial={consultas} />
    </main>
  );
}
