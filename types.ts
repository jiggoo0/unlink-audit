export interface SiteConfig {
  name: string;
  fullName?: string;
  description: string;
  url: string;
  ogImage: string;
  adsense?: {
    publisherId: string;
    clientId: string;
  };
  locale?: string;
  language?: string;
  founder: {
    name?: string;
    nameTh: string;
    nameEn?: string;
    nickname?: string;
    alias: string;
    role: string;
    roleTh?: string;
    description?: string;
    url: string;
    sameAs?: string[];
  };
  company?: {
    slogan: string;
    approach: string;
    positioning: string;
    legalName: string;
  };
  developer?: {
    name: string;
    fullname: string;
    url: string;
    role: string;
  };
  seo?: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
  };
  contact: {
    primaryChannel: string;
    lineUrl: string;
    lineId: string;
    phone: string;
    email: string;
    qrImage: string;
    note: string;
  };
  links: {
    facebook: string;
    twitter: string;
    line: string;
  };
  footer?: {
    disclaimer: string;
    trustNote: string;
    copyright: string;
    links: { title: string; href: string }[];
  };
}

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
