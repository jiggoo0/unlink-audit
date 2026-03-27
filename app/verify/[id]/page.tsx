/** @format */
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Script from "next/script";
import { getIdentityById } from "@/lib/identities";
import { db } from "@/lib/shared-source/db";
import { Person, WithContext } from "schema-dts";

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * 🏛️ Institutional Identity Verification Portal
 * -------------------------------------------------------------------------
 * หน้าแสดงใบรับรองตัวตนสถาบัน (Institutional Certificate)
 */
export default async function VerificationPage({ params }: Props) {
  const { id } = await params;
  const identity = getIdentityById(id);

  if (!identity) {
    notFound();
  }

  let latestAudit: any = {};
  let eeatScore: string | number = "N/A";

  try {
    // 📜 ดึงประวัติการตรวจสอบล่าสุด (E-E-A-T & Sync)
    const auditHistory = await db.execute({
      sql: `SELECT * FROM identities_audit 
            WHERE identity_id = ? 
            ORDER BY created_at DESC 
            LIMIT 1`,
      args: [identity.id],
    });
    latestAudit = auditHistory.rows[0] || {};
    const notesString = String(latestAudit.notes || "");
    const match = notesString.match(/Score: (\d+)/);
    eeatScore = match ? match[1] : "N/A";
  } catch (e) {
    console.error("Verification Page DB Fetch Error:", e);
  }

  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://audit.unlink-th.com/verify/${identity.id}`,
    name: identity.name,
    description: identity.bio,
    jobTitle: identity.expertise,
    url: `https://audit.unlink-th.com/verify/${identity.id}`,
    sameAs: identity.sameAs,
    brand: {
      "@type": "Brand",
      name: "UNLINK-GLOBAL",
    },
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white font-sans p-4 md:p-12">
      <Script
        id="verification-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- Certificate Container --- */}
      <div className="max-w-4xl mx-auto bg-black border-4 border-green-800 shadow-2xl shadow-green-900/50">
        {/* Header */}
        <header className="p-8 border-b-2 border-green-900 bg-zinc-950 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tighter uppercase text-green-400">
              UNLINK-GLOBAL
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-widest">
              INSTITUTIONAL IDENTITY VERIFICATION
            </p>
          </div>
          <div className="text-green-500 text-xs uppercase">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)] mx-auto mb-2"></div>
            Verified
          </div>
        </header>

        {/* Body */}
        <section className="p-8 md:p-12">
          {/* Subject Details */}
          <div className="text-center mb-10">
            <p className="text-sm text-zinc-400 uppercase tracking-widest">
              Certificate of Compliance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-green-300">
              {identity.name}
            </h2>
            <p className="text-lg mt-1 text-zinc-300">{identity.expertise}</p>
          </div>

          {/* Verification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-t border-b border-zinc-800 py-8">
            <div>
              <p className="text-xs text-zinc-500">TRUST LEVEL</p>
              <p className="text-4xl font-bold text-white">
                {identity.trust_level}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">E-E-A-T SCORE</p>
              <p className="text-4xl font-bold text-white">
                {String(eeatScore).replace("Score: ", "")}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">SHIELD STATUS</p>
              <p className="text-4xl font-bold text-green-500">ACTIVE</p>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="mt-10">
            <h3 className="text-xs text-zinc-500 uppercase mb-3">
              Immutable Audit Trail
            </h3>
            <div className="p-4 bg-zinc-950 border border-zinc-800 text-xs">
              <p>
                <span className="font-bold text-green-600">ID:</span>{" "}
                {identity.id}
              </p>
              <p>
                <span className="font-bold text-green-600">LAST CHECK:</span>{" "}
                {new Date(
                  String(latestAudit.created_at || identity.last_checked),
                ).toLocaleString()}
              </p>
              <p>
                <span className="font-bold text-green-600">RESULT:</span>{" "}
                <span className="text-green-400">
                  {String(latestAudit.result || "VERIFIED")}
                </span>
              </p>
              <p className="mt-2 text-zinc-500 text-[10px] break-words">
                <span className="font-bold text-green-700">NOTES:</span>{" "}
                {String(
                  latestAudit.notes || "Identity passed foundational sync.",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Footer & Seal */}
        <footer className="p-8 border-t-2 border-green-900 bg-zinc-950 flex justify-between items-end">
          <div className="text-[10px] text-zinc-600">
            <p>
              VERIFIED BY:{" "}
              <a href="https://www.aemdevweb.com" className="text-green-700">
                AEMDEVWEB / UNLINK-AUDIT NODE
              </a>
            </p>
            <p>
              AUTHORITY OWNER:{" "}
              <a href="https://me.aemdevweb.com" className="text-green-700">
                ALONGKORN YOMKERD (9MZA)
              </a>
            </p>
            <p className="mt-2">
              RECORD ID: {latestAudit.id ? String(latestAudit.id) : "N/A"}
            </p>
          </div>
          <div className="text-center">
            <p className="font-mono text-5xl text-green-900 opacity-50">9MZA</p>
            <p className="text-[8px] text-green-900 opacity-50 tracking-widest">
              DIGITAL SIGNATURE
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
