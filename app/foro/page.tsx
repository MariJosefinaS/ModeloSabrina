import Link from "next/link";
import Decor from "@/components/Decor";
import SiteHeader from "@/components/SiteHeader";
import BabyMascot from "@/components/BabyMascot";
import ForoClient from "@/components/ForoClient";
import { listConsultasPublicas } from "@/lib/store";
import { Consulta } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ForoPage() {
  let consultas: Consulta[] = [];
  try {
    // Sólo lo público, y sin el email de quien escribió: esta página la ve
    // cualquiera que escanee el QR.
    consultas = (await listConsultasPublicas()).map((c) => ({ ...c, email: null }));
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
            <h1 className="font-display text-3xl text-cocoa dark:text-tinta md:text-4xl">
              Consultas
            </h1>
            <p className="mt-1 text-cocoa/80 dark:text-tinta2">
              Podés dejar un <strong>comentario público</strong>, para que tu
              pregunta ayude a otras mamás, o hacer una{" "}
              <strong>consulta privada</strong> y que te respondamos por mail. 💙
            </p>
            <Link
              href="/"
              className="focus-cute mt-2 inline-block text-sm font-bold text-marca hover:underline dark:text-acento"
            >
              ← Volver a los consejos
            </Link>
          </div>
        </div>

        <ForoClient initial={consultas} />
      </section>
    </main>
  );
}
