export interface Identity {
  id: string;
  type: "person" | "organization";
  name: string;
  gender?: string;
  expertise?: string;
  bio?: string;
  industry?: string;
  key_person_id?: string;
  assets_summary?: string;
  trust_level: number;
  last_checked: string;
  created_at: string;
  updated_at: string;
  metadata?: string;
  sameAs?: string[];
}

export interface AuditLog {
  id: string;
  domain: string;
  action: string;
  actor_id?: string;
  status: string;
  metadata?: string;
  ip_address?: string;
  created_at: string;
}
