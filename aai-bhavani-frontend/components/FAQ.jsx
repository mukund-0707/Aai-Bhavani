'use client';

import { useState } from 'react';
import { FAQS } from '../data/siteData';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="section section--dark" id="faq">
      <div className="shell faq-wrap">
        {/* Sticky heading */}
        <header className="sechead reveal">
          <p className="eyebrow"><i />FAQ</p>
          <h2 className="h2">
            Frequently<br />asked questions.
          </h2>
          <p className="sechead__lede">
            Still have questions? WhatsApp us directly and our team will help.
          </p>
        </header>

        {/* Accordion */}
        <div className="faq reveal" role="list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq__item${isOpen ? ' is-open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq__q"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${faq.id}`}
                  id={`faq-q-${faq.id}`}
                  onClick={() => toggle(faq.id)}
                >
                  {faq.question}
                  <span className="faq__sign" aria-hidden="true" />
                </button>
                <div
                  className="faq__a"
                  id={`faq-a-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${faq.id}`}
                >
                  <div>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
