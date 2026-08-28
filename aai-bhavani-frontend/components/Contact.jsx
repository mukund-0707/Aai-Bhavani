'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES, CATEGORIES, SITE } from '../data/siteData';

function waUrl(number, message) {
  const clean = String(number).replace(/\D/g, '');
  const n = clean.length === 10 ? `91${clean}` : clean;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export default function Contact() {
  const [submitted, setSubmitted]   = useState(false);
  const [waLink,    setWaLink]      = useState('');
  const [errors,    setErrors]      = useState({});
  const [selService, setSelService] = useState(SERVICES[0]?.slug ?? '');
  const [form, setForm] = useState({
    name: '', phone: '', email: '', category: '', message: '',
  });

  const categories = CATEGORIES[selService] ?? [];
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Services ke Enquire button se custom event aata hai — real-time service select karo
  useEffect(() => {
    const handler = (e) => {
      const slug = e.detail;
      if (slug && SERVICES.find((s) => s.slug === slug)) {
        setSelService(slug);
        setForm((f) => ({ ...f, category: '' }));
      }
    };
    window.addEventListener('select-service', handler);
    return () => window.removeEventListener('select-service', handler);
  }, []);

  function validate() {
    const errs = {};
    if (!form.name.trim())  errs.name  = 'Required';
    if (!form.phone.trim()) errs.phone = 'Required';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const svcLabel = SERVICES.find((s) => s.slug === selService)?.title ?? selService;
    const msg = `Hi! I'd like to enquire about ${svcLabel}${form.category ? ` — ${form.category}` : ''}.\n\nName: ${form.name}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}${form.message ? `\n\nMessage: ${form.message}` : ''}`;
    setWaLink(waUrl(SITE.whatsapp, msg));
    setSubmitted(true);
  }

  function reset() {
    setSubmitted(false);
    setWaLink('');
    setForm({ name: '', phone: '', email: '', category: '', message: '' });
  }

  return (
    <section className="section section--dark" id="contact">
      <div className="shell contact">

        {/* Left — contact info */}
        <div className="contact__left reveal">
          <p className="eyebrow eyebrow--gold"><i />Get in Touch</p>
          <h2 className="h2">
            Let's start with<br />one call.
          </h2>
          <p className="sechead__lede">
            Fill in the form and our team will get back to you shortly. In a hurry? WhatsApp us directly.
          </p>

          <ul className="contact__list">
            <li>
              <span>Phone</span>
              <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
            </li>
            <li>
              <span>WhatsApp</span>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <span>Office</span>
              <address>{SITE.address}</address>
            </li>
            <li>
              <span>Hours</span>
              <address>{SITE.working_hours}</address>
            </li>
          </ul>
        </div>

        {/* Right — inquiry form */}
        <div className="contact__right reveal">
          <form className="card-form" id="inquiry-form" onSubmit={handleSubmit} noValidate>
            <h3 className="form__title">Send an Inquiry</h3>
            <p className="form__note">Choose a service and we'll take it from there.</p>

            {/* Service select */}
            <div className="field">
              <label htmlFor="i-service">Service <b>*</b></label>
              <select
                id="i-service"
                name="service"
                required
                value={selService}
                onChange={(e) => {
                  setSelService(e.target.value);
                  setForm((f) => ({ ...f, category: '' }));
                }}
              >
                {SERVICES.map((svc) => (
                  <option key={svc.id} value={svc.slug}>{svc.title}</option>
                ))}
              </select>
            </div>

            {/* Category (shown only when categories exist) */}
            {categories.length > 0 && (
              <div className="field">
                <label htmlFor="i-category">Category</label>
                <select
                  id="i-category"
                  name="category"
                  value={form.category}
                  onChange={set('category')}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="field-row">
              <div className={`field${errors.name ? ' has-error' : ''}`}>
                <label htmlFor="i-name">Name <b>*</b></label>
                <input
                  id="i-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Rahul Shah"
                  value={form.name}
                  onChange={set('name')}
                />
                {errors.name && <span className="field__err">{errors.name}</span>}
              </div>
              <div className={`field${errors.phone ? ' has-error' : ''}`}>
                <label htmlFor="i-phone">Mobile <b>*</b></label>
                <input
                  id="i-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={set('phone')}
                />
                {errors.phone && <span className="field__err">{errors.phone}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="i-email">Email</label>
              <input
                id="i-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="optional"
                value={form.email}
                onChange={set('email')}
              />
            </div>

            <div className="field">
              <label htmlFor="i-message">Message</label>
              <textarea
                id="i-message"
                name="message"
                rows={3}
                placeholder="I'm looking for a 2BHK in Adajan…"
                value={form.message}
                onChange={set('message')}
              />
            </div>

            <button className="btn btn--solid form__submit" type="submit">
              <span>Submit Inquiry</span>
              <span className="btn__icon">
                <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </button>
            <p className="form__demo">Demo site. Data is not saved.</p>

            {/* Success overlay */}
            {submitted && (
              <div className="form__success">
                <span className="form__tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M5 12.5 10 17.5 19 7" /></svg>
                </span>
                <h4>Inquiry submitted!</h4>
                <p className="form__successmsg">
                  We'll contact you the same working day. For urgent queries,
                  reach us on WhatsApp.
                </p>
                <a className="btn btn--wa" href={waLink} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.2 1.2-1.8 1.3-.5.1-1 .1-1.7-.1a13 13 0 0 1-6.9-6.1c-.5-.9-.8-1.7-.8-2.4 0-.8.4-1.4.9-1.8.2-.2.4-.2.6-.2h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a9 9 0 0 0 3.9 3.4c.3.1.5.1.6-.1l.7-.9c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3v.8Z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                <button className="form__again" type="button" onClick={reset}>
                  Submit another inquiry
                </button>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
