import { SITE, SERVICES } from '../data/siteData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__inner">

          {/* Brand */}
          <div className="footer__brand">
            <a href="#home" aria-label="Aai Bhavani Group" style={{ display:'inline-flex', alignItems:'center', gap:10, flexWrap:'nowrap' }}>
              <img
                src="/logo-mark-dark.png"
                alt="Aai Bhavani Group"
                style={{ height:48, width:'auto', userSelect:'none', flexShrink:0 }}
              />
              <span style={{ display:'flex', flexDirection:'column', gap:3, lineHeight:1, minWidth:0 }}>
                <span style={{
                  fontSize:'clamp(0.88rem, 2.2vw, 1rem)', fontWeight:700, letterSpacing:'0.04em',
                  textTransform:'uppercase', color:'#fff',
                  whiteSpace:'nowrap',
                }}>
                  Aai Bhavani
                </span>
                <span style={{
                  fontSize:'0.56rem', letterSpacing:'0.22em',
                  textTransform:'uppercase', color:'rgba(255,255,255,0.35)',
                }}>
                  Group
                </span>
              </span>
            </a>
            <p>Trusted solutions across property, finance, interiors and more. Surat and beyond.</p>
            <div className="socials" aria-label="Social media">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8Z" /></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.6c2.4 0 2.7 0 3.6.05 2.5.11 3.65 1.29 3.76 3.76.04.9.05 1.17.05 3.59s0 2.7-.05 3.59c-.11 2.46-1.26 3.65-3.76 3.76-.9.04-1.17.05-3.6.05s-2.7 0-3.59-.05c-2.5-.12-3.65-1.3-3.76-3.76C4.61 14.7 4.6 14.42 4.6 12s0-2.69.05-3.59C4.76 5.94 5.91 4.76 8.41 4.65 9.3 4.61 9.58 4.6 12 4.6ZM12 3c-2.45 0-2.75.01-3.71.05C4.93 3.2 3.2 4.93 3.05 8.29 3.01 9.25 3 9.55 3 12s.01 2.75.05 3.71c.15 3.36 1.88 5.09 5.24 5.24.96.04 1.26.05 3.71.05s2.75-.01 3.71-.05c3.35-.15 5.09-1.88 5.24-5.24.04-.96.05-1.26.05-3.71s-.01-2.75-.05-3.71c-.15-3.35-1.88-5.09-5.24-5.24C14.75 3.01 14.45 3 12 3Zm0 4.38a4.62 4.62 0 1 0 0 9.24 4.62 4.62 0 0 0 0-9.24ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.88a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16Z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.5h3.35V20H3.3Zm5.6 0h3.2v1.57h.05c.45-.84 1.54-1.73 3.17-1.73 3.39 0 4.02 2.2 4.02 5.07V20h-3.35v-5.46c0-1.3-.02-2.98-1.83-2.98-1.83 0-2.11 1.42-2.11 2.89V20H8.9Z" /></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.02V8.98L15.2 12Z" /></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <nav className="footer__col" aria-label="Services">
            <h4>Services</h4>
            <ul>{SERVICES.map(s => <li key={s.id}><a href="#services">{s.title}</a></li>)}</ul>
          </nav>

          {/* Company */}
          <nav className="footer__col" aria-label="Company">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About us</a></li>
              <li><a href="#properties">Properties</a></li>
              <li><a href="#referral">Referral</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>{SITE.address}</li>
              <li>{SITE.working_hours}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <p>© {year} AB Groups · Aai Bhavani Consultant. All rights reserved.</p>
          <p>Made with ♥ in Surat 🇮🇳</p>
        </div>
      </div>

      {/* Oversized wordmark — clipped at baseline, overflow-safe */}
      <div
        aria-hidden="true"
        className="footer__wordmark"
        style={{
          pointerEvents:'none',
          height:'clamp(40px, 7vw, 90px)',
          overflow:'hidden',
          paddingInline:'clamp(18px,4vw,60px)',
          width:'100%',
        }}
      >
        <p style={{
          fontFamily:'var(--font)',
          fontSize:'clamp(60px, 13vw, 180px)',
          fontWeight:800,
          lineHeight:0.78,
          letterSpacing:'-0.055em',
          textAlign:'center',
          background:'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))',
          WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent',
          userSelect:'none',
          whiteSpace:'nowrap',
          width:'100%',
        }}>
          AAI BHAVANI
        </p>
      </div>
    </footer>
  );
}
