export function PDPAGenerator({ caseData }: { caseData: any }) {
  const generateLetter = () => {
    return `
INSTITUTIONAL NOTICE OF PDPA VIOLATION & DEMAND FOR REMOVAL
UNLINK ECOSYSTEM | LEGAL ENFORCEMENT DIVISION

Date: ${new Date().toLocaleDateString()}
Subject: FORMAL DEMAND FOR DATA ERASURE (Reference ID: ${caseData.id})

TO WHOM IT MAY CONCERN,

We are writing on behalf of our client to formally address a violation of the Personal Data Protection Act (PDPA). Specifically, we refer to the "Right to be Forgotten" and the "Right to Erasure" as stipulated under global data protection standards.

TARGET IDENTIFIER: ${caseData.target_url || "N/A"}
CURRENT STATUS: Documented & Validated Violation

Our institutional audit has confirmed that the personal data associated with this identifier is being processed without sufficient legal grounds or is no longer necessary for the purposes for which it was originally collected.

DEMAND FOR ACTION:
1. Immediate removal of the specified personal data within seven (7) business days.
2. Written confirmation of erasure sent to the UNLINK Registry.
3. Cessation of all future processing of this data.

Failure to comply with this demand within the specified timeframe will result in formal escalation, including potential legal proceedings and reporting to the relevant Regulatory Authorities.

Regards,

UNLINK AUDIT TEAM
Legal Enforcement Unit
    `;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm font-serif">
      <div className="mb-6 flex justify-between items-center border-b border-slate-100 pb-4 font-sans">
        <h3 className="text-lg font-bold text-slate-900">PDPA Letter Template</h3>
        <span className="text-xs font-semibold px-2 py-1 bg-slate-900 text-white rounded">OFFICIAL DRAFT</span>
      </div>
      
      <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed bg-slate-50 p-6 rounded-lg border border-slate-100 italic">
        {generateLetter()}
      </pre>
      
      <div className="mt-8 flex space-x-4 font-sans">
        <button className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all shadow-sm">
          Download PDF Document
        </button>
        <button className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-all">
          Print Preview
        </button>
      </div>
    </div>
  );
}
