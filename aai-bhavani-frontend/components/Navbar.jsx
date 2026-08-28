'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/siteData';

const NAV_LINKS = [
  { label: 'Services',   href: '#services'   },
  { label: 'Properties', href: '#properties' },
  { label: 'Referral',   href: '#referral'   },
  { label: 'About',      href: '#about'      },
  { label: 'FAQ',        href: '#faq'        },
];

/* ── Logo mark — actual AB Groups image ── */
function LogoMark({ size = 36 }) {
  return (
    <img
      src="/logo-mark-dark.png"
      alt=""
      aria-hidden="true"
      height={size}
      style={{ height: size, width: 'auto' }}
      className="select-none transition-transform duration-300 group-hover:scale-105"
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState('home');

  /* scroll → glass pill */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* active section via IntersectionObserver */
  useEffect(() => {
    const ids = ['home', ...NAV_LINKS.map(l => l.href.slice(1)), 'contact'];
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  /* Smooth scroll — eyebrow aligns with navbar */
  const scrollTo = (href) => {
    close();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const navbar = document.querySelector('header');
    const navH   = navbar ? navbar.getBoundingClientRect().height : 70;
    // Subtract navH + section padding so eyebrow lines up with navbar
    const sectionPad = parseInt(getComputedStyle(el).paddingTop) || 56;
    const top = el.getBoundingClientRect().top + window.scrollY - navH + sectionPad;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Header ── */}
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', inset: '0 0 auto', zIndex: 50,
          padding: scrolled ? '8px 12px' : '12px 12px',
          transition: 'padding 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Floating pill nav container */}
        <nav
          style={{
            maxWidth: scrolled ? 820 : 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 999,
            padding: scrolled ? '8px 10px 8px 16px' : '10px 12px 10px 18px',
            background: scrolled
              ? 'rgba(5,5,10,0.75)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
            boxShadow: scrolled ? '0 20px 60px -20px rgba(0,0,0,0.9)' : 'none',
            transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            className="group"
            aria-label="Aai Bhavani Group — home"
            onClick={close}
            style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0, marginRight:'auto' }}
          >
            <LogoMark size={scrolled ? 34 : 38} />
            <span style={{ display:'flex', flexDirection:'column', gap:3, lineHeight:1 }}>
              <span style={{
                fontSize: scrolled ? '0.9rem' : '0.98rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#fff',
                transition: 'font-size 0.4s',
              }}>
                Aai&nbsp;<span style={{
                  background:'linear-gradient(135deg,#fdf0c8,#f5c24c,#e0a526)',
                  WebkitBackgroundClip:'text', backgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                }}>Bhavani</span>
              </span>
              <span style={{
                fontSize:'0.54rem', letterSpacing:'0.2em',
                textTransform:'uppercase', color:'rgba(255,255,255,0.32)',
              }}>
                Group
              </span>
            </span>
          </a>

          {/* Desktop links — sliding active pill */}
          <ul style={{ display:'flex', alignItems:'center', gap:2, listStyle:'none', margin:'0 8px' }} className="nav-desktop">
            {NAV_LINKS.map(link => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href} style={{ position:'relative' }}>
                  <a
                    href={link.href}
                    onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                    style={{
                      position:'relative', zIndex:1,
                      display:'block',
                      padding:'8px 16px',
                      borderRadius:999,
                      fontSize:'0.82rem', fontWeight:500,
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                      transition:'color 0.2s',
                      whiteSpace:'nowrap',
                      cursor:'pointer',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type:'spring', stiffness:380, damping:32 }}
                      style={{
                        position:'absolute', inset:0, borderRadius:999,
                        background:'rgba(255,255,255,0.07)',
                        boxShadow:'inset 0 0 0 1px rgba(255,255,255,0.1)',
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA — desktop only */}
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, marginLeft:16 }} className="nav-desktop">
            <motion.a
              whileHover={{ scale:1.04 }}
              whileTap={{ scale:0.97 }}
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'8px 10px 8px 18px',
                borderRadius:999,
                background:'linear-gradient(135deg,#fbe08c,#f5c24c 45%,#e0a526)',
                color:'#0a0807',
                fontSize:'0.8rem', fontWeight:700,
                boxShadow:'0 6px 22px -8px rgba(224,165,38,0.6)',
                whiteSpace:'nowrap',
              }}
            >
              Book a call
              <span style={{
                width:30, height:30, borderRadius:999,
                background:'rgba(0,0,0,0.15)',
                display:'grid', placeItems:'center', flexShrink:0,
              }}>
                <ArrowUpRight size={13} />
              </span>
            </motion.a>
          </div>

          {/* Burger — mobile only */}
          <motion.button
            whileTap={{ scale:0.9 }}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="nav-mobile-only"
            style={{
              width:40, height:40, borderRadius:999, flexShrink:0, marginLeft:10,
              display:'flex', alignItems:'center', justifyContent:'center',
              background:'rgba(255,255,255,0.06)',
              color: open ? 'var(--gold-400, #f5c24c)' : 'rgba(255,255,255,0.7)',
              border:'1px solid rgba(255,255,255,0.08)',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate:-90, opacity:0, scale:0.8 }}
                animate={{ rotate:0,   opacity:1, scale:1 }}
                exit={{   rotate:90,  opacity:0, scale:0.8 }}
                transition={{ duration:0.18 }}
                style={{ display:'flex' }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* ── Mobile sheet ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            initial={{ opacity:0, y:-16 }}
            animate={{ opacity:1, y:0 }}
            exit={{   opacity:0, y:-16 }}
            transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
            style={{
              position:'fixed', inset:0, zIndex:45,
              background:'rgba(3,3,5,0.97)',
              backdropFilter:'blur(28px)',
              WebkitBackdropFilter:'blur(28px)',
              color:'#fff',
              display:'flex', flexDirection:'column',
              justifyContent:'center', gap:32,
              padding:'100px clamp(18px,4vw,60px) 48px',
            }}
            role="dialog" aria-modal="true" aria-label="Navigation"
          >
            {/* Links */}
            <nav>
              {[...NAV_LINKS, { label:'Contact', href:'#contact' }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.06 + i*0.055, duration:0.4, ease:[0.22,1,0.36,1] }}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'14px 0',
                    borderBottom:'1px solid rgba(255,255,255,0.07)',
                    fontSize:'clamp(1.7rem,7vw,2.5rem)',
                    fontWeight:700, letterSpacing:'-0.035em',
                    color:'rgba(255,255,255,0.75)',
                    transition:'color 0.2s',
                    cursor:'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f5c24c'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                >
                  {link.label}
                  <span style={{ fontSize:'0.7rem', letterSpacing:'0.12em', color:'rgba(255,255,255,0.2)', fontWeight:400 }}>
                    0{i+1}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity:0, y:18 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.42, duration:0.4 }}
              style={{ display:'flex', flexDirection:'column', gap:12 }}
            >
              <motion.a
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
                style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                  padding:'16px 24px', borderRadius:16,
                  background:'linear-gradient(135deg,#fbe08c,#f5c24c 45%,#e0a526)',
                  color:'#0a0807', fontWeight:700, fontSize:'0.95rem',
                  boxShadow:'0 8px 28px -8px rgba(224,165,38,0.65)',
                }}
              >
                Book a call
                <ArrowUpRight size={16} />
              </motion.a>

              <div style={{ display:'flex', gap:16, alignItems:'center', paddingTop:8 }}>
                <a href={`tel:${SITE.phone}`} style={{ fontSize:'0.9rem', color:'rgba(255,255,255,0.45)', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#f5c24c'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.45)'}
                >{SITE.phone}</a>
              </div>

              {/* Mini logo at bottom */}
              <div style={{ display:'flex', alignItems:'center', gap:10, opacity:0.35, marginTop:8 }}>
                <LogoMark size={32} />
                <span style={{ fontSize:'0.6rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)' }}>
                  Building Trust. Creating Possibilities.
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}
