import Navbar        from '../components/Navbar';
import Hero          from '../components/Hero';
import Services      from '../components/Services';
import Referral      from '../components/Referral';
import Testimonials  from '../components/Testimonials';
import Team          from '../components/Team';
import FAQ           from '../components/FAQ';
import Contact       from '../components/Contact';
import Footer        from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ScrollReveal  from '../components/ScrollReveal';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home">
        <Hero />
        <Services />
        <Referral />
        <Testimonials />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      {/* Client-side scroll animation observer */}
      <ScrollReveal />
    </>
  );
}
