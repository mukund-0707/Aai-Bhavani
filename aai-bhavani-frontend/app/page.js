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

export default async function Home() {
  const [siteSettings, services, testimonials, team, faqs] = await Promise.all([
    apiFetch('/api/site-settings/'),
    apiFetch('/api/services/'),
    apiFetch('/api/testimonials/'),
    apiFetch('/api/team/'),
    apiFetch('/api/faqs/'),
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
