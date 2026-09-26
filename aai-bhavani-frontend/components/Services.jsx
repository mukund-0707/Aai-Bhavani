'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Home, Landmark, Palette, Users, Megaphone, ArrowRight } from 'lucide-react';
import { referralLabel } from '../data/siteData';

const ICON_MAP = { home: Home, bank: Landmark, palette: Palette, users: Users, megaphone: Megaphone };

function SvcCard({ svc, index, inView }) {
  const ref            = useRef(null);
  const prefersReduced = useReducedMotion();
  const Icon           = ICON_MAP[svc.icon] ?? Home;
  const lbl            = referralLabel(svc);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 26 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay: prefersReduced ? 0 : index * 0.08, duration: prefersReduced ? 0 : 0.7, ease:[0.22,1,0.36,1] }}
      className="svc"
    >
      <div className="svc__top">
        <div className="svc__icon" aria-hidden="true">
          <Icon size={20} strokeWidth={1.6} />
        </div>
        <span className="svc__n">{String(index+1).padStart(2,'0')}</span>
      </div>
      <h3 className="svc__title">{svc.title}</h3>
      <p className="svc__desc">{svc.short_description}</p>
      <div className="svc__tags">
        {(svc.tags ?? []).map(tag => <span key={tag} className="svc__tag">{tag}</span>)}
      </div>
      <div className="svc__foot">
        {lbl ? (
          <span className="svc__ref"><i aria-hidden="true" />{lbl}</span>
        ) : <span />}
        <a
          className="svc__link"
          href={`#contact`}
          aria-label={`Enquire about ${svc.title}`}
          onClick={(e) => {
            e.preventDefault();
            // Fire custom event — Contact component listens for this
            window.dispatchEvent(new CustomEvent('select-service', { detail: svc.slug }));
            // Form pe directly scroll karo (section heading skip)
            const form = document.getElementById('inquiry-form');
            const el   = form || document.getElementById('contact');
            if (!el) return;
            const nav  = document.querySelector('header');
            const navH = nav ? nav.getBoundingClientRect().height : 70;
            const rect = el.getBoundingClientRect();
            window.scrollTo({ top: rect.top + window.scrollY - navH - 16, behavior: 'smooth' });
          }}
        >
          Enquire <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Services({ services }) {
  const ref            = useRef(null);
  const inView         = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  // Calculate balanced layout
  const count = services.length;
  let layout = [];
  
  if (count <= 2) {
    layout = [count]; // [1] or [2]
  } else if (count === 3) {
    layout = [3]; // [3]
  } else if (count === 4) {
    layout = [2, 2]; // [2, 2]
  } else if (count === 5) {
    layout = [2, 3]; // [2, 3]
  } else if (count === 6) {
    layout = [2, 2, 2]; // [2, 2, 2]
  } else if (count === 7) {
    layout = [2, 2, 3]; // [2, 2, 3]
  } else if (count === 8) {
    layout = [2, 3, 3]; // [2, 3, 3]
  } else {
    // 9+ → rows of 3
    const rows = Math.ceil(count / 3);
    layout = Array(rows).fill(3);
    // adjust last row
    const remainder = count % 3;
    if (remainder > 0) layout[rows - 1] = remainder;
  }

  // Build rows array
  let idx = 0;
  const rows = layout.map(perRow => {
    const row = services.slice(idx, idx + perRow);
    idx += perRow;
    return row;
  });

  return (
    <section className="section section--dark" id="services" ref={ref}>
      {/* Gold glow top */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
        <div style={{ position:'absolute', left:'50%', top:'-60px', transform:'translateX(-50%)', width:800, height:300, background:'radial-gradient(ellipse, rgba(224,165,38,0.06), transparent 70%)', filter:'blur(30px)' }} />
      </div>

      <div className="shell" style={{ position:'relative', zIndex:1 }}>
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 22 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration: prefersReduced ? 0 : 0.75, ease:[0.22,1,0.36,1] }}
          className="sechead"
        >
          <span className="eyebrow"><i />Our Services</span>
          <h2 className="h2">
            Everything you need,<br /><span className="text-gold">one trusted team.</span>
          </h2>
          <p className="sechead__lede">
            From expert guidance to end-to-end execution, every service is handled by a dedicated specialist.
          </p>
        </motion.div>

        <div className="services">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="services__row" style={{ display: 'flex', gap: '1px' }}>
              {row.map((svc, colIdx) => {
                const globalIdx = services.findIndex(s => s.id === svc.id);
                return (
                  <div
                    key={svc.id}
                    style={{ flex: 1, minWidth: 0 }}
                  >
                    <SvcCard svc={svc} index={globalIdx} inView={inView} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
