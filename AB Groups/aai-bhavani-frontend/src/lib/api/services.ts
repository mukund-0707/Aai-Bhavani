import { apiClient } from "./client";

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post("/api/auth/login/", credentials),

  refresh: (refresh: string) =>
    apiClient.post("/api/auth/token/refresh/", { refresh }),

  me: () => apiClient.get("/api/auth/me/"),
};

// ─── CMS ─────────────────────────────────────────────────────────────────────
export const cmsApi = {
  siteSettings: () => apiClient.get("/api/cms/site-settings/"),
  hero: () => apiClient.get("/api/cms/hero/"),
  navigation: () => apiClient.get("/api/cms/navigation/"),
  pageLayout: (page: string) => apiClient.get(`/api/cms/page-layout/?page=${page}`),
  seo: (page: string) => apiClient.get(`/api/cms/seo/?page=${page}`),
  dashboardStats: () => apiClient.get("/api/cms/dashboard/stats/"),
  updateSiteSettings: (data: Record<string, unknown>) =>
    apiClient.patch("/api/cms/site-settings/", data),
};

// ─── Business ────────────────────────────────────────────────────────────────
export const servicesApi = {
  list: () => apiClient.get("/api/services/"),
};

export const propertiesApi = {
  list: (params?: Record<string, string | number | boolean>) =>
    apiClient.get("/api/properties/", { params }),
  detail: (id: number) => apiClient.get(`/api/properties/${id}/`),
};

export const galleryApi = {
  list: () => apiClient.get("/api/gallery/"),
};

export const testimonialsApi = {
  list: () => apiClient.get("/api/testimonials/"),
};

export const teamApi = {
  list: () => apiClient.get("/api/team/"),
};

export const faqsApi = {
  list: () => apiClient.get("/api/faqs/"),
};

export const referralApi = {
  getProgramInfo: () => apiClient.get("/api/referral-program/"),
};

// ─── Inquiries ───────────────────────────────────────────────────────────────
export const inquiriesApi = {
  categories: () => apiClient.get("/api/inquiries/categories/"),

  submit: (data: {
    name: string;
    email?: string;
    mobile: string;
    category: number;
    message?: string;
  }) => apiClient.post("/api/inquiries/", data),

  list: () => apiClient.get("/api/inquiries/"),
};

// ─── Referrals ───────────────────────────────────────────────────────────────
export const referralsApi = {
  submit: (data: {
    referrer_name: string;
    referrer_mobile: string;
    client_name: string;
    client_mobile: string;
    service_type?: string;
    message?: string;
  }) => apiClient.post("/api/referrals/", data),

  list: () => apiClient.get("/api/referrals/"),
};
