import { supabase } from "@/lib/supabase";
import { CaseCard } from "@/components/case-card";

export default async function CasesPage() {
  const { data: cases, error } = await supabase
    .from('service_cases')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Case Management</h1>
          <p className="text-slate-500 mt-2 text-lg">Institutional Reputation Repair & PDPA Enforcement Records</p>
        </header>

        {error ? (
          <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-1">Database Connection Error</h2>
            <p>{error.message}</p>
          </div>
        ) : cases && cases.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {cases.map((c) => (
              <CaseCard key={c.id} caseData={c} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="text-slate-400 text-6xl mb-4">📂</div>
            <h2 className="text-xl font-medium text-slate-600">No active cases found</h2>
            <p className="text-slate-400 mt-2">All institutional records are currently up to date.</p>
          </div>
        )}
      </div>
    </main>
  );
}
