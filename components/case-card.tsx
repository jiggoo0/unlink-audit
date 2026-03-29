import { format } from "date-fns";

interface CaseData {
  id: string;
  client_id?: string;
  service_type: "reputation_repair" | "reputation_protection" | "pdpa_enforcement";
  status: string;
  description: string;
  created_at: string;
  target_url?: string;
}

export function CaseCard({ caseData }: { caseData: CaseData }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${
            caseData.service_type === 'pdpa_enforcement' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
          }`}>
            {caseData.service_type.replace('_', ' ')}
          </span>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 leading-tight">Case ID: {caseData.id.slice(0, 8)}...</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block mb-1">REGISTERED ON</span>
          <time className="text-sm font-medium text-slate-600">{format(new Date(caseData.created_at), 'PPP')}</time>
        </div>
      </div>
      
      <p className="text-slate-600 line-clamp-2 mb-4 text-sm leading-relaxed">{caseData.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${caseData.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wide">{caseData.status}</span>
        </div>
        <button className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
          View Details & Generate Legal Documents →
        </button>
      </div>
    </div>
  );
}
