'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SITE } from '../data/siteData';

const VIDEO_SRC = '/hero.mp4';

const STATS = [
  { count: 500,  suffix: '+',    label: 'Families settled'  },
  { prefix: '₹', count: 120, suffix: ' Cr+', label: 'Deals closed' },
  { count: 12,   suffix: '+',    label: 'Years experience'  },
  { count: 50,   suffix: '%',    label: 'Referral share'    },
];

const rise = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: d, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

function useCountUp(target, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) { setValue(0); return; }
    let raf, id;
    id = setTimeout(() => {
      const dur = 1600, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(id); cancelAnimationFrame(raf); };
  }, [target, delay]);
  return value;
}

function Stat({ stat, index }) {
  const v = useCountUp(stat.count, 400 + index * 80);
  return (
    <motion.li className="stat" custom={0.85 + index * 0.08} variants={rise} initial="hidden" animate="visible" style={{ '--i': index }}>
      <span className="stat__num">{stat.prefix ?? ''}{v}{stat.suffix}</span>
      <span className="stat__label">{stat.label}</span>
    </motion.li>
  );
}

export default function Hero() {
  const videoRef   = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const copyFade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const copyY    = useTransform(scrollYProgress, [0, 1], [0, 70]);

  useEffect(() => { videoRef.current?.play().catch(() => {}); }, []);

  return (
    <section className="hero" id="home" ref={sectionRef}>

      {/* Aurora atmosphere */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div className="aurora-blob animate-drift" style={{ left:'5%', top:'-15%', width:600, height:600, background:'radial-gradient(circle, rgba(224,165,38,0.2), transparent 60%)' }} />
        <div className="aurora-blob animate-drift" style={{ right:'2%', top:'5%', width:420, height:420, background:'radial-gradient(circle, rgba(110,231,183,0.09), transparent 60%)', animationDelay:'-9s' }} />
        <div className="aurora-blob animate-drift" style={{ bottom:'10%', left:'38%', width:500, height:500, background:'radial-gradient(circle, rgba(245,194,76,0.11), transparent 65%)', animationDelay:'-16s' }} />
      </div>

      {/* Video BG */}
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/hero2.mp4" type="video/mp4" />
        </video>
        <div className="hero__scrim" style={{ position:'absolute', inset:0, zIndex:1 }} />
        <div className="grid-overlay" style={{ position:'absolute', inset:0, zIndex:2 }} />
        <div className="vignette"     style={{ position:'absolute', inset:0, zIndex:3 }} />
      </div>

      {/* Content */}
      <motion.div className="shell hero__inner" style={{ opacity: copyFade, y: copyY, marginInline: 'auto' }}>

        {/* Headline */}
        <h1 className="h1">
          <span className="h1__mask">
            <motion.span className="h1__rise" custom={0.16} variants={rise} initial="hidden" animate="visible">
              <span className="text-soft">Your property,</span>
            </motion.span>
          </span>
          <span className="h1__mask">
            <motion.span className="h1__rise" custom={0.28} variants={rise} initial="hidden" animate="visible">
              <span className="text-soft">loan &amp; interiors —</span>
            </motion.span>
          </span>
          <span className="h1__mask">
            <motion.span className="h1__rise h1__line" custom={0.42} variants={rise} initial="hidden" animate="visible">
              <span className="text-gold">one roof.</span>
            </motion.span>
          </span>
        </h1>

        {/* Sub-headline */}
        <motion.p className="hero__sub" custom={0.5} variants={rise} initial="hidden" animate="visible">
          Property · Loans · Interiors · Digital Marketing
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero__actions" custom={0.56} variants={rise} initial="hidden" animate="visible">
          <motion.a
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            href="#contact"
            onClick={e => {
              e.preventDefault();
              const el = document.getElementById('contact');
              const nav = document.querySelector('header');
              const navH = nav ? nav.getBoundingClientRect().height : 70;
              const pad = parseInt(getComputedStyle(el).paddingTop) || 56;
              window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH + pad, behavior:'smooth' });
            }}
            className="btn btn--solid"
          >
            <span>Book a Call</span>
            <span className="btn__icon">
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h10.2M10.4 5.6 15.2 10l-4.8 4.4" /></svg>
            </span>
          </motion.a>
          <motion.a
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            href="#services"
            onClick={e => {
              e.preventDefault();
              const el = document.getElementById('services');
              const nav = document.querySelector('header');
              const navH = nav ? nav.getBoundingClientRect().height : 70;
              const pad = parseInt(getComputedStyle(el).paddingTop) || 56;
              window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH + pad, behavior:'smooth' });
            }}
            className="btn btn--glass"
          >
            Explore Services
          </motion.a>
        </motion.div>

        {/* Lede + Stats */}
        <div className="hero__foot">
          <motion.p className="hero__lede" custom={0.68} variants={rise} initial="hidden" animate="visible">
            From finding the perfect home to loans, interiors, and digital marketing —
            AB Groups is with you at every step. Refer a client and earn commission too.
          </motion.p>
          <ul className="stats" aria-label="Key numbers">
            {STATS.map((s, i) => <Stat key={i} stat={s} index={i} />)}
          </ul>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a className="cue" href="#services" aria-label="Scroll to services" custom={1.2} variants={rise} initial="hidden" animate="visible">
        <span className="cue__line" />
        Scroll
      </motion.a>
    </section>
  );
}
