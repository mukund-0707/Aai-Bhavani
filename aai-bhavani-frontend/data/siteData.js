/* ═══════════════════════════════════════════════════════════════════════
   AB Groups — Static site data
   All content in English. Location: Surat, Gujarat.
   Shaped to mirror API response format for easy migration later.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── GET /api/site-settings/ ───────────────────────────────────────── */
export const SITE = {
  site_name: 'AB Groups',
  site_tagline: 'Aai Bhavani Consultant',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'info@aaibhavani.com',
  address: 'Surat, Gujarat, India',
  working_hours: 'Mon–Sat: 9am – 7pm',
};

/* ── GET /api/services/ ─────────────────────────────────────────────── */
export const SERVICES = [
  {
    id: 1,
    title: 'Property Consultant',
    slug: 'property-consultant',
    icon: 'home',
    short_description:
      'Buy, sell or rent. Expert guidance from property search to paperwork and legal checks.',
    tags: ['Site visits', 'Rate negotiation', 'Legal check'],
    order: 1,
    is_referral_enabled: true,
    referral_type: 'percent',
    referral_value: '50.00',
    referral_note: '50% profit share on deal close',
  },
  {
    id: 2,
    title: 'Loan',
    slug: 'loan',
    icon: 'bank',
    short_description:
      'Home loan, business loan or balance transfer. Best rate, quick sanction.',
    tags: ['Eligibility check', 'Documentation', 'Fast sanction'],
    order: 2,
    is_referral_enabled: true,
    referral_type: 'flat',
    referral_value: '5000.00',
    referral_note: 'Flat ₹5,000 on loan disbursal',
  },
  {
    id: 3,
    title: 'Interior Design',
    slug: 'interior-design',
    icon: 'palette',
    short_description:
      'Home or office. 3D design to handover, within budget and on schedule.',
    tags: ['3D design', 'Modular kitchen', 'Turnkey'],
    order: 3,
    is_referral_enabled: false,
    referral_type: 'percent',
    referral_value: '0.00',
    referral_note: '',
  },
  {
    id: 4,
    title: 'Referral Programs',
    slug: 'referral-programs',
    icon: 'users',
    short_description:
      'Refer a client and earn commission when the deal closes. Profit share or flat payout.',
    tags: ['Profit share', 'Flat payout', 'Live status'],
    order: 4,
    is_referral_enabled: false,
    referral_type: 'percent',
    referral_value: '0.00',
    referral_note: '',
  },
  {
    id: 5,
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'megaphone',
    short_description:
      'Builder or local business. Grow leads through social media, SEO and paid ads.',
    tags: ['Social media', 'SEO', 'Paid ads'],
    order: 5,
    is_referral_enabled: false,
    referral_type: 'percent',
    referral_value: '0.00',
    referral_note: '',
  },
];

/* ── GET /api/inquiries/categories/?service=<slug> ──────────────────
   Empty array = no categories for this service → hide dropdown.      */
export const CATEGORIES = {
  'property-consultant': [
    { id: 1, name: 'Buy Property' },
    { id: 2, name: 'Sell Property' },
    { id: 3, name: 'Rent Property' },
    { id: 4, name: 'Investment Advisory' },
  ],
  loan: [
    { id: 5, name: 'Home Loan' },
    { id: 6, name: 'Business Loan' },
    { id: 7, name: 'Loan Against Property' },
    { id: 8, name: 'Balance Transfer' },
  ],
  'interior-design': [
    { id: 9, name: 'Home Interior' },
    { id: 10, name: 'Office Interior' },
    { id: 11, name: 'Modular Kitchen' },
    { id: 12, name: 'Renovation' },
  ],
  'referral-programs': [],
  'digital-marketing': [
    { id: 13, name: 'Social Media' },
    { id: 14, name: 'SEO' },
    { id: 15, name: 'Paid Ads' },
    { id: 16, name: 'Website' },
  ],
};

/* ── GET /api/properties/ ───────────────────────────────────────────── */
export const PROPERTIES = [
  {
    id: 1,
    title: '3 BHK Apartment in Adajan',
    type: 'sell',
    category: 'residential',
    price: 8500000,
    city: 'Surat',
    area: 'Adajan',
    builder_name: 'Shreenath Developers',
    amenities: ['Parking', 'Gym', 'Lift', '24×7 Security'],
    is_featured: true,
  },
  {
    id: 2,
    title: '4 BHK Villa in Vesu',
    type: 'sell',
    category: 'residential',
    price: 34500000,
    city: 'Surat',
    area: 'Vesu',
    builder_name: 'Shivalik Group',
    amenities: ['Private garden', 'Pool', 'Home theatre', 'Parking'],
    is_featured: true,
  },
  {
    id: 3,
    title: 'Commercial Office, Piplod',
    type: 'sell',
    category: 'commercial',
    price: 21500000,
    city: 'Surat',
    area: 'Piplod',
    builder_name: 'Udhna Realty',
    amenities: ['Lift', 'Cafeteria', 'Parking', 'Power backup'],
    is_featured: true,
  },
  {
    id: 4,
    title: '2 BHK Flat in Pal',
    type: 'rent',
    category: 'residential',
    price: 18000,
    city: 'Surat',
    area: 'Pal',
    builder_name: 'Riddhi Siddhi Builders',
    amenities: ['Parking', 'Power backup', 'Garden'],
    is_featured: false,
  },
  {
    id: 5,
    title: 'NA Plot — 3,200 sqft, Althan',
    type: 'sell',
    category: 'plot',
    price: 4200000,
    city: 'Surat',
    area: 'Althan',
    builder_name: '',
    amenities: ['Corner plot', 'Road facing', 'Clear title'],
    is_featured: false,
  },
  {
    id: 6,
    title: 'Showroom on Ring Road',
    type: 'rent',
    category: 'commercial',
    price: 85000,
    city: 'Surat',
    area: 'Ring Road',
    builder_name: '',
    amenities: ['Main road', 'Parking', 'Glass frontage'],
    is_featured: false,
  },
];

/* ── GET /api/testimonials/ ─────────────────────────────────────────── */
export const TESTIMONIALS = [
  {
    id: 1,
    client_name: 'Rajesh Mehta',
    rating: 5,
    location: 'Adajan, Surat',
    review:
      'First-time home buyer here. The team arranged 4 site visits, negotiated the rate, and got my loan sanctioned in 8 days. Outstanding support throughout.',
  },
  {
    id: 2,
    client_name: 'Pooja Desai',
    rating: 5,
    location: 'Vesu, Surat',
    review:
      'Interior work was delivered exactly on schedule. The 3D design was shown in advance and the final result exceeded expectations — budget was not exceeded either.',
  },
  {
    id: 3,
    client_name: 'Farhan Shaikh',
    rating: 4,
    location: 'Piplod, Surat',
    review:
      'I referred two clients. Both deals closed and commission was transferred on time without any follow-up needed. That kind of reliability is rare.',
  },
];

/* ── GET /api/team/ ─────────────────────────────────────────────────── */
export const TEAM = [
  {
    id: 1,
    name: 'Dhaval Mahajan',
    designation: 'Founder',
    description:
      'Leads property consulting and business strategy. Passionate about matching the right property to the right family.',
  },
  {
    id: 2,
    name: 'Mukund Patil',
    designation: 'Co-Founder',
    description:
      'Drives operations and client relationships. Ensures every inquiry gets a prompt, personal response.',
  },
  {
    id: 3,
    name: 'Disha Patil',
    designation: 'Interior Design Lead',
    description:
      'Turnkey home and office interiors. Owns the project from 3D concept to final handover.',
  },
  {
    id: 4,
    name: 'Disha Mahajan',
    designation: 'Loan & Finance Advisor',
    description:
      'Tie-ups with 14 banks. Handles all documentation from eligibility check to sanction.',
  },
  {
    id: 5,
    name: 'Prem Tompe',
    designation: 'Digital Marketing Manager',
    description:
      'Grows leads for builders and local businesses through social media, SEO and paid campaigns.',
  },
];

/* ── GET /api/faqs/ ─────────────────────────────────────────────────── */
export const FAQS = [
  {
    id: 1,
    question: 'Is there any charge for the property search service?',
    answer:
      'No advance charge for site visits, shortlisting or rate negotiation. Brokerage applies only when the deal is finalised and the rate is disclosed upfront in writing.',
  },
  {
    id: 2,
    question: 'How long does loan sanction take?',
    answer:
      'With complete documents, a salaried case typically takes 7–10 working days. We work with 14 banks and apply through whichever best fits your profile.',
  },
  {
    id: 3,
    question: 'How and when is referral commission paid?',
    answer:
      'Commission is transferred once the deal closes and payment is received. 50% profit share for Property Consulting and flat ₹5,000 for Loan. You can check the status anytime on WhatsApp.',
  },
  {
    id: 4,
    question: 'Do you operate outside Surat?',
    answer:
      'Our primary focus is Surat and South Gujarat. For Interior Design and Digital Marketing we also handle projects in Ahmedabad and Vadodara.',
  },
  {
    id: 5,
    question: 'What is the payment schedule for interior projects?',
    answer:
      'Standard 3-stage: 30% on design approval, 40% on material procurement, 30% on handover. Each stage scope is defined in a written quotation with no hidden costs.',
  },
];

/* ── Helper: referral label ─────────────────────────────────────────── */
export function referralLabel(service) {
  if (!service.is_referral_enabled) return '';
  const val = parseFloat(service.referral_value);
  return service.referral_type === 'percent'
    ? `${val % 1 === 0 ? val : val.toFixed(2)}% profit share`
    : `Flat ₹${val.toLocaleString('en-IN')}`;
}

/* ── Helper: format property price ─────────────────────────────────── */
export function formatPrice(prop) {
  const { price, type } = prop;
  const fmt = (n) => {
    if (n >= 1e7) return `₹${+(n / 1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `₹${+(n / 1e5).toFixed(2)} Lakh`;
    return `₹${n.toLocaleString('en-IN')}`;
  };
  return type === 'rent' ? `${fmt(price)} / mo` : fmt(price);
}
