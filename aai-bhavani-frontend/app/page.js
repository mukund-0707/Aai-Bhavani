import { apiFetch }   from '../lib/api';
import Navbar         from '../components/Navbar';
import Hero           from '../components/Hero';
import Services       from '../components/Services';
import Referral       from '../components/Referral';
import Testimonials   from '../components/Testimonials';
import Team           from '../components/Team';
import FAQ            from '../components/FAQ';
import Contact        from '../components/Contact';
import Footer         from '../components/Footer';
import WhatsAppFloat  from '../components/WhatsAppFloat';
import ScrollReveal   from '../components/ScrollReveal';

// Safe fetch — never throws, returns fallback on error
async function safeFetch(path, fallback) {
  try {
    const data = await apiFetch(path);
    // Paginated responses come as { results: [...] }
    if (data && Array.isArray(data.results)) return data.results;
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

const DEFAULT_SITE = {
  site_name: 'Aai Bhavani Consultant',
  site_tagline: '',
  phone: '', whatsapp: '', email: '', address: '', working_hours: '',
  facebook_url: '', instagram_url: '', linkedin_url: '', youtube_url: '',
  hero_title: '', hero_subtitle: '', hero_description: '',
  hero_button_text: '', hero_button_link: '',
};

export default async function Home() {
  const [siteSettings, services, testimonials, team, faqs] = await Promise.all([
    safeFetch('/api/site-settings/', DEFAULT_SITE),
    safeFetch('/api/services/',      []),
    safeFetch('/api/testimonials/',  []),
    safeFetch('/api/team/',          []),
    safeFetch('/api/faqs/',          []),
  ]);

  return (
    <>
      <Navbar site={siteSettings} />
      <main id="home">
        <Hero site={siteSettings} />
        <Services services={services} />
        <Referral services={services} />
        <Testimonials testimonials={testimonials} />
        <Team team={team} />
        <FAQ faqs={faqs} />
        <Contact services={services} site={siteSettings} />
      </main>
      <Footer site={siteSettings} services={services} />
      <WhatsAppFloat whatsapp={siteSettings.whatsapp} />
      {/* Client-side scroll animation observer */}
      <ScrollReveal />
    </>
  );
}
