'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, Landmark, Palette, Users, Megaphone, ArrowRight } from 'lucide-react';
import { SERVICES, referralLabel } from '../data/siteData';

const ICON_MAP = { home: Home, bank: Landmark, palette: Palette, users: Users, megaphone: Megaphone };

function SvcCard({ svc, index, inView }) {
  const ref  = useRef(null);
  const Icon = ICON_MAP[svc.icon] ?? Home;
  const lbl  = referralLabel(svc);

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
      initial={{ opacity:0, y:26 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay: index * 0.08, duration:0.7, ease:[0.22,1,0.36,1] }}
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
        {svc.tags.map(tag => <span key={tag} className="svc__tag">{tag}</span>)}
      </div>
      <div className="svc__foot">
        {lbl ? (
          <span className="svc__ref"><i aria-hidden="true" />{lbl}</span>
        ) : <span />}
        <a className="svc__link" href="#contact" aria-label={`Enquire about ${svc.title}`}>
          Enquire <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section section--dark" id="services" ref={ref}>
      {/* Gold glow top */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
        <div style={{ position:'absolute', left:'50%', top:'-60px', transform:'translateX(-50%)', width:800, height:300, background:'radial-gradient(ellipse, rgba(224,165,38,0.06), transparent 70%)', filter:'blur(30px)' }} />
      </div>

      <div className="shell" style={{ position:'relative', zIndex:1 }}>
        <motion.div
          initial={{ opacity:0, y:22 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
          className="sechead"
        >
          <span className="eyebrow"><i />Our Services</span>
          <h2 className="h2">
            Everything you need,<br /><span className="text-gold">one trusted team.</span>
          </h2>
          <p className="sechead__lede">
            Property, loans, interiors, referrals and digital marketing — each service has a dedicated specialist working for you.
          </p>
        </motion.div>

        <div className="services">
          {SERVICES.map((svc, i) => <SvcCard key={svc.id} svc={svc} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
