/** @format */

import { siteConfig } from "@/constants/site-config";
import {
  WithContext,
  Person,
  Organization,
  WebSite,
  BreadcrumbList,
  Service,
  BlogPosting,
  LocalBusiness,
  FAQPage,
} from "schema-dts";

/**
 * 👤 Enhanced Person Identity Schema (E-E-A-T Optimized)
 */
export const getIdentityPersonSchema = (data: {
  name: string;
  jobTitle?: string;
  description?: string;
  url: string;
  externalUrls?: string[];
  image?: string;
}): WithContext<Person> => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle || "Verified Specialist",
    description: data.description,
    url: data.url,
    image: data.image || `${siteConfig.url}/branding/icon.png`,
    sameAs: data.externalUrls || [],
    brand: {
      "@type": "Brand",
      name: "Vifily Intelligence OS",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Vifily-ID",
      value: data.url.split("/").pop()?.toUpperCase(),
    },
    knowsAbout: [
      data.jobTitle || "Strategic Consultant",
      "Identity Management",
      "Global Mobility",
      "Strategic Reputation",
    ],
    memberOf: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
};

/**
 * 🏢 Enhanced Organization Identity Schema (E-E-A-T Optimized)
 */
export const getIdentityOrganizationSchema = (data: {
  name: string;
  description?: string;
  url: string;
  externalUrl?: string[];
  logo?: string;
}): WithContext<Organization> => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo || `${siteConfig.url}/branding/logo.svg`,
    sameAs: data.externalUrl || [],
    identifier: {
      "@type": "PropertyValue",
      name: "Corporate-Vifily-ID",
      value: data.url.split("/").pop()?.toUpperCase(),
    },
    knowsAbout: ["Strategic Alignment", "Corporate Reputation", "Global Trust"],
    legalName: data.name,
    brand: {
      "@type": "Brand",
      name: "UNLINK Strategic Unit",
    },
  };
};

/**
 * 🧬 Global Trust Node Schema (Breadcrumb)
 */
export const getBreadcrumbSchema = (
  items: { name: string; item: string }[],
): WithContext<BreadcrumbList> => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.item}`,
    })),
  };
};

/**
 * 🛡️ Service Protocol Schema
 */
export const getServiceSchema = (service: any): WithContext<Service> => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description || service.shortDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Operational Protocols",
      itemListElement: (service.features || []).map((f: string) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f,
        },
      })),
    },
  };
};

/**
 * 📝 Legacy & Compatibility Schemas
 */
export const getPersonSchema = (): WithContext<Person> => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder.nameTh,
    jobTitle: siteConfig.founder.role,
    url: siteConfig.founder.url,
  };
};

export const getOrganizationSchema = (): WithContext<Organization> => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/branding/logo.svg`,
  };
};

export const getWebSiteSchema = (): WithContext<WebSite> => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
};

export const getLocalBusinessSchema = (): WithContext<LocalBusiness> => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "TH",
    },
  };
};

export const getBlogPostingSchema = (post: any): WithContext<BlogPosting> => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.founder.nameTh,
    },
  };
};

export const getCaseStudySchema = (study: any): WithContext<BlogPosting> => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: study.title,
    description: study.excerpt || study.description,
    datePublished: study.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
};

export const getFaqSchema = (
  faqs: { question: string; answer: string }[],
): WithContext<FAQPage> => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
};
