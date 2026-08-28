'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, BedDouble, Maximize2, ArrowUpRight } from 'lucide-react';
import { PROPERTIES, formatPrice } from '../data/siteData';

const TYPE_FILTERS = [
  { value: '',     label: 'All'      },
  { value: 'sell', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];
const CAT_FILTERS = [
  { value: '',            label: 'All'         },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial',  label: 'Commercial'  },
  { value: 'plot',        label: 'Plot'        },
];

/* Curated Unsplash images per property category — real estate photos */
const PROP_IMAGES = {
  1: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop',
  2: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop',
  3: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
  4: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop',
  5: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80&auto=format&fit=crop',
  6: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop',
};

function PropCard({ prop, index, inView }) {
  const priceStr = formatPrice(prop);
  const img      = PROP_IMAGES[prop.id] ?? PROP_IMAGES[1];

  return (
    <motion.article
      className="prop"
      initial={{ opacity:0, y:32 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay: 0.15 + index * 0.09, duration:0.7, ease:[0.22,1,0.36,1] }}
      style={{ cursor:'pointer', borderRadius:'var(--r-md)', overflow:'hidden' }}
    >
      {/* Image */}
      <div className="prop__media">
        <div className="prop__art" style={{ background:'var(--bg-3)' }}>
          <img
            src={img}
            alt={prop.title}
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
            loading="lazy"
          />
        </div>
        {/* Gradient overlay on image */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(180deg, transparent 40%, rgba(3,3,5,0.75) 100%)',
          pointerEvents:'none',
        }} />
        <div className="prop__flags">
          <span className="prop__flag">{prop.type==='sell' ? 'For Sale' : 'For Rent'}</span>
          {prop.is_featured && <span className="prop__flag prop__flag--gold">Featured</span>}
        </div>
        {/* Price overlay on image bottom */}
        <div style={{
          position:'absolute', bottom:14, left:14,
          fontSize:'1.2rem', fontWeight:800, letterSpacing:'-0.03em',
          color:'#fff',
          textShadow:'0 2px 8px rgba(0,0,0,0.6)',
        }}>
          {priceStr}{prop.type==='rent' && <span style={{ fontSize:'0.72rem', fontWeight:400, opacity:0.75 }}>/mo</span>}
        </div>
      </div>

      {/* Body */}
      <div className="prop__body">
        <h3 className="prop__title">{prop.title}</h3>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, flexWrap:'wrap' }}>
          <p className="prop__loc">
            <MapPin size={12} strokeWidth={1.8} aria-hidden="true" />
            {prop.area}, {prop.city}
          </p>
          {prop.builder_name && (
            <span style={{ fontSize:'0.7rem', color:'var(--txt-4)', whiteSpace:'nowrap' }}>
              {prop.builder_name}
            </span>
          )}
        </div>

        {/* Amenities */}
        <div className="prop__am">
          {prop.amenities.slice(0,4).map(am => <span key={am}>{am}</span>)}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            marginTop:'auto', paddingTop:14,
            display:'flex', alignItems:'center', justifyContent:'space-between',
            borderTop:'1px solid var(--border)',
            fontSize:'0.82rem', fontWeight:600,
            color:'var(--gold-400)',
            transition:'gap 0.3s',
            minHeight:'44px',
          }}
        >
          View Details
          <ArrowUpRight size={15} />
        </a>
      </div>
    </motion.article>
  );
}

export default function Properties() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [typeFilter, setType] = useState('');
  const [catFilter,  setCat]  = useState('');

  const filtered = PROPERTIES.filter(p =>
    (!typeFilter || p.type     === typeFilter) &&
    (!catFilter  || p.category === catFilter)
  );

  return (
    <section className="section section--ink2" id="properties" ref={ref}>
      <div className="shell">
        <motion.div
          initial={{ opacity:0, y:22 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
          className="sechead sechead--row"
        >
          <div>
            <span className="eyebrow"><i />Listings</span>
            <h2 className="h2">Featured <span className="text-gold">properties</span></h2>
          </div>
          <p className="sechead__lede">
            Sale, rent, commercial and plots — all in one place. Use filters to find what fits your budget.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="filters" role="group" aria-label="Property filters"
          initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.15, duration:0.6, ease:[0.22,1,0.36,1] }}
        >
          <div className="filters__row">
            {TYPE_FILTERS.map(f => (
              <button key={f.value} className={`chip${typeFilter===f.value?' is-on':''}`}
                onClick={() => setType(f.value)}>{f.label}</button>
            ))}
          </div>
          <div className="filters__row">
            {CAT_FILTERS.map(f => (
              <button key={f.value} className={`chip${catFilter===f.value?' is-on':''}`}
                onClick={() => setCat(f.value)}>{f.label}</button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="properties">
            {filtered.map((prop, i) => (
              <PropCard key={prop.id} prop={prop} index={i} inView={inView} />
            ))}
          </div>
        ) : (
          <p className="properties__empty">No properties found. Try adjusting the filters.</p>
        )}
      </div>
    </section>
  );
}
