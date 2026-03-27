/**
 * UNLINK-GLOBAL | Core Type Definitions (v5.2)
 * -------------------------------------------------------------------------
 */

export type ServiceType = "content" | "interactive";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  description: string;
  url: string;
  ogImage: string;
  locale: string;
  language: string;
  founder: {
    name: string;
    nameTh: string;
    nickname: string;
    alias: string;
    role: string;
    roleTh: string;
    description: string;
    url: string;
    sameAs: string[];
  };
  company: {
    slogan: string;
    approach: string;
    positioning: string;
    legalName: string;
  };
  developer: {
    name: string;
    fullname: string;
    url: string;
    role: string;
  };
  seo: {
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
    github?: string;
  };
  footer: {
    disclaimer: string;
    trustNote: string;
    copyright: string;
    links: { title: string; href: string }[];
  };
  portfolio?: {
    badge: string;
    title: string;
    description: string;
    items: {
      title: string;
      category: string;
      image: string;
      aspect: string;
      span: string;
    }[];
  };
}

export interface ServicePrice {
  startingAt: string;
  unit: string;
  model: "Success-Based" | "Standard" | (string & {});
}

export interface ServiceMetadata {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  isInstant?: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  excerpt: string;
  image: string;
  thumbnail: string;
  date: string;
  priority: number;
  client: string;
  outcome: string;
  iconName: string;
  features: string[];
  legalReference: string;
  platform: string;
  verificationSteps: string[];
  auditLog: { date: string; action: string }[];
  priceInfo: ServicePrice;
  metadata: ServiceMetadata;
  content?: string;
}

export interface BlogPostFrontmatter {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  date: string;
  author: string;
  author_id?: string;
  iconName: string;
  features: string[];
  priceInfo: ServicePrice;
  metadata: ServiceMetadata;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  image?: string;
  category: string;
  features: string[];
  priceInfo: ServicePrice;
  metadata: ServiceMetadata;
  type: ServiceType;
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
  last_verified_at?: string;
  authority_score?: number;
  verified_badge_url?: string;
  metadata?: string;
  sameAs?: string[];
  created_at: string;
  updated_at: string;
}
