'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TEAM } from '../data/siteData';

function initials(name) {
  return name.trim().split(/\s+/).slice(0,2).map(w => w[0]).join('').toUpperCase();
}

export default function Team() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section section--ink2" id="about" ref={ref}>
      <div className="shell">
        <motion.div
          initial={{ opacity:0, y:22 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
          className="sechead sechead--row"
        >
          <div>
            <span className="eyebrow"><i />Our Team</span>
            <h2 className="h2">
              People who<br /><span className="text-gold">actually pick up.</span>
            </h2>
          </div>
          <p className="sechead__lede">
            Small team, direct communication. Every service has an owner and
            you never have to repeat your story to a different person.
          </p>
        </motion.div>

        <div className="team">
          {TEAM.map((member, i) => (
            <motion.article
              key={member.id}
              className="member"
              initial={{ opacity:0, y:28 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration:0.7, ease:[0.22,1,0.36,1] }}
            >
              <div className="avatar" aria-hidden="true">{initials(member.name)}</div>
              <div>
                <h3 className="member__name">{member.name}</h3>
                <p className="member__role">{member.designation}</p>
              </div>
              <p className="member__bio">{member.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
