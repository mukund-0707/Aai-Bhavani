'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
// testimonials prop passed from page.js (API data)

function initials(name) {
  return name.trim().split(/\s+/).slice(0,2).map(w => w[0]).join('').toUpperCase();
}

export default function Testimonials({ testimonials }) {
  const ref            = useRef(null);
  const inView         = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  return (
    <section className="section section--dark" id="testimonials" ref={ref}>
      {/* Subtle glow behind section */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
        <div style={{ position:'absolute', left:'50%', top:0, transform:'translateX(-50%)', width:700, height:400, background:'radial-gradient(ellipse, rgba(224,165,38,0.07), transparent 70%)', filter:'blur(40px)' }} />
      </div>

      <div className="shell" style={{ position:'relative', zIndex:1 }}>
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 22 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration: prefersReduced ? 0 : 0.75, ease:[0.22,1,0.36,1] }}
          className="sechead sechead--center"
        >
          <span className="eyebrow"><i />What clients say</span>
          <h2 className="h2">
            Trust built one<br /><span className="text-gold">deal at a time.</span>
          </h2>
        </motion.div>

        <div className="quotes">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              className="quote"
              initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 30 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay: prefersReduced ? 0 : 0.1 + i * 0.12, duration: prefersReduced ? 0 : 0.7, ease:[0.22,1,0.36,1] }}
            >
              {/* Quote icon */}
              <Quote size={18} style={{ color:'var(--gold-400)', opacity:0.5 }} />

              {/* Stars */}
              <div className="quote__stars" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length:5 }).map((_,j) => (
                  <Star key={j} size={13} fill={j < t.rating ? 'currentColor' : 'none'} aria-hidden="true" />
                ))}
              </div>

              <blockquote className="quote__text">&ldquo;{t.review}&rdquo;</blockquote>

              <footer className="quote__who">
                <div className="avatar" aria-hidden="true">{initials(t.client_name)}</div>
                <div>
                  <span className="quote__name">{t.client_name}</span>
                  <span className="quote__loc">{t.location}</span>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
