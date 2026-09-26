'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { referralLabel } from '../data/siteData';

const STEPS = [
  {
    n: '01',
    title: 'Submit a name',
    body: "Fill the form below. Just the client's name and number.",
  },
  {
    n: '02',
    title: 'We follow up',
    body: 'Our team contacts the client and handles the entire process.',
  },
  {
    n: '03',
    title: 'You earn commission',
    body: 'Once the deal closes, your profit share or flat commission is transferred.',
  },
];

/* WA icon SVG */
const WaIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 19, height: 19, fill: 'currentColor', flexShrink: 0 }}>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.2 1.2-1.8 1.3-.5.1-1 .1-1.7-.1a13 13 0 0 1-6.9-6.1c-.5-.9-.8-1.7-.8-2.4 0-.8.4-1.4.9-1.8.2-.2.4-.2.6-.2h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a9 9 0 0 0 3.9 3.4c.3.1.5.1.6-.1l.7-.9c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3v.8Z" />
  </svg>
);

export default function Referral({ services }) {
  const referralServices = services.filter((s) => s.is_referral_enabled);

  const [submitted, setSubmitted] = useState(false);
  const [waLink,    setWaLink]    = useState('');
  const [errors,    setErrors]    = useState({});
  const [loading,   setLoading]   = useState(false);
  const [serverError, setServerError] = useState('');
  const [form, setForm] = useState({
    referrer_name:  '',
    referrer_phone: '',
    referrer_email: '',
    client_name:    '',
    client_phone:   '',
    service:        referralServices[0]?.title ?? '',
  });

  /* Ref to the card wrapper — used to scroll into view after submit */
  const cardRef = useRef(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const errs = {};
    if (!form.referrer_name.trim())  errs.referrer_name  = 'Required';
    if (!form.referrer_phone.trim()) errs.referrer_phone = 'Required';
    if (!form.client_name.trim())    errs.client_name    = 'Required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setServerError('');

    setLoading(true);
    try {
      const selectedSvc = referralServices.find(s => s.title === form.service);
      
      const payload = {
        referrer_name:  form.referrer_name,
        referrer_phone: form.referrer_phone,
        client_name:    form.client_name,
        service:        selectedSvc?.id,
      };
      
      // Only add optional fields if they have values
      if (form.referrer_email.trim()) payload.referrer_email = form.referrer_email;
      if (form.client_phone.trim()) payload.client_phone = form.client_phone;

      console.log('Referral payload:', payload);
      
      const data = await apiFetch('/api/referrals/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      console.log('Referral response:', data);
      setWaLink(data.whatsapp_url);
      setSubmitted(true);
    } catch (err) {
      console.error('Referral error:', err);
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  /* After submitted → true, scroll so the success card sits comfortably
     below the navbar. Manual offset = navbar height + breathing room.  */
  useEffect(() => {
    if (!submitted) return;
    const id = setTimeout(() => {
      if (!cardRef.current) return;
      const navbar  = document.querySelector('header');
      const navH    = navbar ? navbar.getBoundingClientRect().height : 70;
      const cardTop = cardRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: cardTop - navH - 24, behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(id);
  }, [submitted]);

  function reset() {
    setSubmitted(false);
    setWaLink('');
    setServerError('');
    setForm({
      referrer_name: '', referrer_phone: '', referrer_email: '',
      client_name: '', client_phone: '', service: referralServices[0]?.title ?? '',
    });
  }

  return (
    <section className="section section--dark" id="referral">
      <div className="shell referral">

        {/* Left */}
        <div className="referral__left">
          <header className="sechead reveal">
            <p className="eyebrow eyebrow--gold"><i />Referral Program</p>
            <h2 className="h2">Refer someone.<br />They deal. You earn.</h2>
            <p className="sechead__lede">
              Know someone looking for a property or a loan? Share their name.
              We handle everything else.
            </p>
          </header>

          <ol className="steps reveal" aria-label="How it works">
            {STEPS.map((step) => (
              <li key={step.n} className="steps__item">
                <span className="steps__n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="refcards reveal">
            {referralServices.map((svc) => (
              <div key={svc.id} className="refcard">
                <p className="refcard__val">{referralLabel(svc)}</p>
                <p className="refcard__svc">{svc.title}</p>
                <p className="refcard__note">{svc.referral_note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — card wrapper with ref for scroll targeting */}
        <div className="referral__right reveal" ref={cardRef}>
          <AnimatePresence mode="wait">
            {submitted ? (

              /* ── Success card ── */
              <motion.div
                key="success"
                className="card-form card-form--success"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Tick icon */}
                <motion.div
                  className="success__icon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <CheckCircle2 size={44} strokeWidth={1.5} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  <h3 className="form__title">Referral submitted!</h3>
                  <p className="form__successmsg">
                    We'll reach out to your client shortly. Thank you for the referral.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{ delay: 0.42, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}
                >
                  <a className="btn btn--wa" href={waLink} target="_blank" rel="noopener noreferrer">
                    <WaIcon />
                    <span>Confirm on WhatsApp</span>
                  </a>
                  <button className="form__again" type="button" onClick={reset}>
                    Submit another referral
                  </button>
                </motion.div>
              </motion.div>

            ) : (

              /* ── Form ── */
              <motion.form
                key="form"
                className="card-form"
                id="referral-form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0   }}
                exit={{    opacity: 0, y: -8   }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="form__title">Submit a Referral</h3>
                <p className="form__note">Takes under 30 seconds.</p>

                <div className={`field${errors.referrer_name ? ' has-error' : ''}`}>
                  <label htmlFor="r-name">Your name <b>*</b></label>
                  <input
                    id="r-name" name="referrer_name" type="text"
                    autoComplete="name" required placeholder="Suresh Patel"
                    value={form.referrer_name} onChange={set('referrer_name')}
                  />
                  {errors.referrer_name && <span className="field__err">{errors.referrer_name}</span>}
                </div>

                <div className="field-row">
                  <div className={`field${errors.referrer_phone ? ' has-error' : ''}`}>
                    <label htmlFor="r-phone">Your mobile <b>*</b></label>
                    <input
                      id="r-phone" name="referrer_phone" type="tel"
                      inputMode="numeric" required placeholder="9123456789"
                      value={form.referrer_phone} onChange={set('referrer_phone')}
                    />
                    {errors.referrer_phone && <span className="field__err">{errors.referrer_phone}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="r-email">Email</label>
                    <input
                      id="r-email" name="referrer_email" type="email"
                      autoComplete="email" placeholder="optional"
                      value={form.referrer_email} onChange={set('referrer_email')}
                    />
                  </div>
                </div>

                <div className="field-row">
                  <div className={`field${errors.client_name ? ' has-error' : ''}`}>
                    <label htmlFor="r-client">Client's name <b>*</b></label>
                    <input
                      id="r-client" name="client_name" type="text"
                      required placeholder="Priya Joshi"
                      value={form.client_name} onChange={set('client_name')}
                    />
                    {errors.client_name && <span className="field__err">{errors.client_name}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="r-cphone">Client's mobile</label>
                    <input
                      id="r-cphone" name="client_phone" type="tel"
                      inputMode="numeric" placeholder="optional"
                      value={form.client_phone} onChange={set('client_phone')}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="r-service">Service</label>
                  <select id="r-service" name="service" value={form.service} onChange={set('service')}>
                    {referralServices.map((svc) => (
                      <option key={svc.id} value={svc.title}>{svc.title}</option>
                    ))}
                  </select>
                </div>

                {serverError && (
                  <p className="field__err" style={{ textAlign: 'center' }}>{serverError}</p>
                )}

                <button disabled={loading} className="btn btn--solid form__submit" type="submit">
                  <span>{loading ? 'Submitting…' : 'Submit Referral'}</span>
                  <span className="btn__icon">
                    <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </button>
              </motion.form>

            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
