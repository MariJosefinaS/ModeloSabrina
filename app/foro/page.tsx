import Link from "next/link";
import Decor from "@/components/Decor";
import SiteHeader from "@/components/SiteHeader";
import BabyMascot from "@/components/BabyMascot";
import ForoClient from "@/components/ForoClient";
import { listConsultas } from "@/lib/store";
import { Consulta } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ForoPage() {
  let consultas: Consulta[] = [];
  try {
    consultas = await listConsultas();
  } catch {
    consultas = [];
  }

  return (
    <main className="relative min-h-screen">
      <Decor />
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="reveal flex items-center gap-4">
          <BabyMascot className="w-24 shrink-0" />
          <div>
            <h1 className="font-display text-3xl text-cocoa md:text-4xl">Foro de mamás</h1>
            <p className="mt-1 text-cocoa/80">
              Dejá tu consulta y una asesora te responde acá mismo. Tus preguntas
              también ayudan a otras mamás. 💛
            </p>
            <Link href="/#consejos" className="focus-cute mt-2 inline-block text-sm font-bold text-grape hover:underline">
              ← Volver a los consejos
            </Link>
          </div>
        </div>

        <ForoClient initial={consultas} />
      </section>
    </main>
  );
}
