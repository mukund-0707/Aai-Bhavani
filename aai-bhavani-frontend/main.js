/* ═══════════════════════════════════════════════════════════════════════
   AB Groups — static site logic.

   NOTE: yeh site abhi poori tarah static hai — koi API call nahi hoti.
   Neeche ka DATA object jaan-boojh kar backend ke API response ke shape
   mein rakha gaya hai (apps/services, apps/properties, apps/content …),
   taaki baad mein sirf fetch() lagana pade aur baaki code waisa hi chale.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── GET /api/site-settings/ ─────────────────────────────────────── */
  var SITE = {
    site_name: 'AB Groups',
    site_tagline: 'Aai Bhavani Consultant',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'info@aaibhavani.com',
    address: 'Pune, Maharashtra, India',
    working_hours: 'Mon-Sat: 9am - 7pm'
  };

  /* ── GET /api/services/ ──────────────────────────────────────────── */
  var SERVICES = [
    {
      id: 1, title: 'Property Consultant', slug: 'property-consultant', icon: 'home',
      short_description: 'Buy, sell ya rent — sahi property, sahi rate aur clean paperwork tak poori guidance.',
      tags: ['Site visits', 'Rate negotiation', 'Legal check'],
      order: 1,
      is_referral_enabled: true, referral_type: 'percent', referral_value: '50.00',
      referral_note: 'Deal close hone par 50% profit share'
    },
    {
      id: 2, title: 'Loan', slug: 'loan', icon: 'bank',
      short_description: 'Home loan, business loan ya balance transfer — best rate par sanction karvate hain.',
      tags: ['Eligibility check', 'Documentation', 'Fast sanction'],
      order: 2,
      is_referral_enabled: true, referral_type: 'flat', referral_value: '5000.00',
      referral_note: 'Loan disbursal par flat ₹5,000'
    },
    {
      id: 3, title: 'Interior Design', slug: 'interior-design', icon: 'palette',
      short_description: 'Ghar ho ya office — 3D design se lekar handover tak, budget ke andar.',
      tags: ['3D design', 'Modular kitchen', 'Turnkey'],
      order: 3,
      is_referral_enabled: false, referral_type: 'percent', referral_value: '0.00',
      referral_note: ''
    },
    {
      id: 4, title: 'Referral Programs', slug: 'referral-programs', icon: 'users',
      short_description: 'Client refer karo aur deal close hote hi profit share ya flat commission kamao.',
      tags: ['Profit share', 'Flat payout', 'Live status'],
      order: 4,
      is_referral_enabled: false, referral_type: 'percent', referral_value: '0.00',
      referral_note: ''
    },
    {
      id: 5, title: 'Digital Marketing', slug: 'digital-marketing', icon: 'megaphone',
      short_description: 'Builder ho ya local business — social media, SEO aur ads se leads laate hain.',
      tags: ['Social media', 'SEO', 'Paid ads'],
      order: 5,
      is_referral_enabled: false, referral_type: 'percent', referral_value: '0.00',
      referral_note: ''
    }
  ];

  /* ── GET /api/inquiries/categories/?service=<slug> ───────────────────
     Khaali array = us service ki koi category nahi → dropdown hide.   */
  var CATEGORIES = {
    'property-consultant': [
      { id: 1, name: 'Buy Property' },
      { id: 2, name: 'Sell Property' },
      { id: 3, name: 'Rent Property' },
      { id: 4, name: 'Investment Advisory' }
    ],
    'loan': [
      { id: 5, name: 'Home Loan' },
      { id: 6, name: 'Business Loan' },
      { id: 7, name: 'Loan Against Property' },
      { id: 8, name: 'Balance Transfer' }
    ],
    'interior-design': [
      { id: 9,  name: 'Home Interior' },
      { id: 10, name: 'Office Interior' },
      { id: 11, name: 'Modular Kitchen' },
      { id: 12, name: 'Renovation' }
    ],
    'referral-programs': [],
    'digital-marketing': [
      { id: 13, name: 'Social Media' },
      { id: 14, name: 'SEO' },
      { id: 15, name: 'Paid Ads' },
      { id: 16, name: 'Website' }
    ]
  };

  /* ── GET /api/properties/ ────────────────────────────────────────── */
  var PROPERTIES = [
    { id: 1, title: '3 BHK Flat in Kothrud', type: 'sell', category: 'residential',
      price: 8500000, city: 'Pune', area: 'Kothrud', builder_name: 'Shreeji Builders',
      amenities: ['Parking', 'Gym', 'Lift', '24x7 Security'], is_featured: true },
    { id: 2, title: '4 BHK Villa on NIBM Road', type: 'sell', category: 'residential',
      price: 34500000, city: 'Pune', area: 'NIBM Road', builder_name: 'Sanskruti Group',
      amenities: ['Private garden', 'Pool', 'Home theatre', 'Parking'], is_featured: true },
    { id: 3, title: 'Commercial Office, Hinjewadi Ph-2', type: 'sell', category: 'commercial',
      price: 21500000, city: 'Pune', area: 'Hinjewadi', builder_name: 'Panchshil',
      amenities: ['Lift', 'Cafeteria', 'Parking', 'Power backup'], is_featured: true },
    { id: 4, title: '2 BHK Apartment in Baner', type: 'rent', category: 'residential',
      price: 32000, city: 'Pune', area: 'Baner', builder_name: 'Kolte Patil',
      amenities: ['Parking', 'Power backup', 'Garden'], is_featured: false },
    { id: 5, title: 'NA Plot — 3,200 sqft, Wagholi', type: 'sell', category: 'plot',
      price: 4200000, city: 'Pune', area: 'Wagholi', builder_name: '',
      amenities: ['Corner plot', 'Road facing', 'Clear title'], is_featured: false },
    { id: 6, title: 'Showroom on FC Road', type: 'rent', category: 'commercial',
      price: 185000, city: 'Pune', area: 'FC Road', builder_name: '',
      amenities: ['Main road', 'Parking', 'Glass frontage'], is_featured: false }
  ];

  /* ── GET /api/testimonials/ ──────────────────────────────────────── */
  var TESTIMONIALS = [
    { id: 1, client_name: 'Amit Deshpande', rating: 5, location: 'Kothrud, Pune',
      review: 'Pehli baar ghar khareed raha tha, kuch samajh nahi aa raha tha. Team ne 4 site visits karvaye, rate bhi negotiate kiya aur loan bhi 8 din mein sanction ho gaya.' },
    { id: 2, client_name: 'Sneha Kulkarni', rating: 5, location: 'Baner, Pune',
      review: 'Interior ka kaam bilkul timeline par hua. 3D design pehle dikhaya tha, final result usse behtar nikla. Budget bhi nahi badha.' },
    { id: 3, client_name: 'Imran Shaikh', rating: 4, location: 'Hadapsar, Pune',
      review: 'Maine do clients refer kiye the. Dono deals close hui aur commission bina yaad dilaye time par mil gaya. Yehi sabse badi baat hai.' }
  ];

  /* ── GET /api/team/ ──────────────────────────────────────────────── */
  var TEAM = [
    { id: 1, name: 'Sagar Kadam', designation: 'Founder & Property Consultant',
      description: '12+ saal Pune real estate mein. Residential aur commercial dono handle karte hain.' },
    { id: 2, name: 'Priya Sharma', designation: 'Head — Interior Design',
      description: 'Turnkey home aur office interiors. 3D concept se handover tak ka poora ownership.' },
    { id: 3, name: 'Rohit Patil', designation: 'Loan & Finance Advisor',
      description: '14 banks ke saath tie-up. Eligibility se sanction tak sab paperwork sambhalte hain.' }
  ];

  /* ── GET /api/faqs/ ──────────────────────────────────────────────── */
  var FAQS = [
    { id: 1, question: 'Property dhundhne ki service ka charge kitna hai?',
      answer: 'Site visits, shortlisting aur rate negotiation ka koi advance charge nahi hai. Brokerage sirf deal final hone par lagti hai, aur woh rate pehle hi likhit mein bata diya jaata hai.' },
    { id: 2, question: 'Loan sanction hone mein kitna time lagta hai?',
      answer: 'Documents complete hon to salaried case mein aam taur par 7–10 working days. Hum 14 banks ke saath kaam karte hain, isliye jis bank mein aapki profile best fit hoti hai wahi apply karvate hain.' },
    { id: 3, question: 'Referral commission kaise aur kab milta hai?',
      answer: 'Jis service par referral chaalu hai, wahan deal close aur payment receive hone ke baad commission transfer hota hai — Property Consultant par 50% profit share, Loan par flat ₹5,000. Status aap kabhi bhi WhatsApp par pooch sakte hain.' },
    { id: 4, question: 'Kya aap Pune ke bahar bhi kaam karte hain?',
      answer: 'Abhi main focus Pune aur PCMC hai. Interior design aur digital marketing ke liye Mumbai aur Nashik ke projects bhi handle karte hain.' },
    { id: 5, question: 'Interior ka payment schedule kya rehta hai?',
      answer: 'Standard 3-stage: design approval par 30%, material procurement par 40%, aur handover par 30%. Har stage ka scope written quotation mein hota hai — koi hidden cost nahi.' }
  ];

  /* ═══ helpers ═══════════════════════════════════════════════════════ */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  };

  var inr = new Intl.NumberFormat('en-IN');

  function formatPrice(p) {
    if (p.type === 'rent') return '₹' + inr.format(p.price) + ' <small>/ month</small>';
    if (p.price >= 1e7)   return '₹' + trimZero(p.price / 1e7) + ' Cr';
    if (p.price >= 1e5)   return '₹' + trimZero(p.price / 1e5) + ' Lakh';
    return '₹' + inr.format(p.price);
  }
  function trimZero(n) { return n.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1'); }

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  function referralLabel(s) {
    if (!s.is_referral_enabled) return '';
    return s.referral_type === 'percent'
      ? trimZero(parseFloat(s.referral_value)) + '% profit share'
      : 'Flat ₹' + inr.format(parseFloat(s.referral_value));
  }

  /* Backend ke WhatsAppService.build_url ka same logic */
  function waUrl(number, message) {
    var clean = String(number).replace(/\D/g, '');
    if (clean.length === 10) clean = '91' + clean;
    return 'https://wa.me/' + clean + '?text=' + encodeURIComponent(message);
  }

  /* ═══ inline icons ══════════════════════════════════════════════════ */
  var ICONS = {
    home: '<path d="M3.4 9.4 12 3l8.6 6.4V20a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1Z"/><path d="M9.3 21v-6.4h5.4V21"/>',
    bank: '<path d="M3 9.6 12 4l9 5.6"/><path d="M5 10v8m4.6-8v8m4.8-8v8M19 10v8"/><path d="M3 21h18"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.7 1.7-1.7h2a4.6 4.6 0 0 0 4.6-4.6C21 6.4 17 3 12 3Z"/><circle cx="7.5" cy="11" r="1.1"/><circle cx="11" cy="7.5" r="1.1"/><circle cx="15.5" cy="8.6" r="1.1"/>',
    users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.6 20a6.4 6.4 0 0 1 12.8 0"/><path d="M16.4 5a3.4 3.4 0 0 1 0 6.6"/><path d="M17.6 14.4A6.4 6.4 0 0 1 21.4 20"/>',
    megaphone: '<path d="M3.5 10.4v3.2a1.6 1.6 0 0 0 1.6 1.6h1.7l7 4.3V4.5l-7 4.3H5.1a1.6 1.6 0 0 0-1.6 1.6Z"/><path d="M17.6 9a4.2 4.2 0 0 1 0 6"/><path d="M6.8 15.2 8 21"/>'
  };
  var arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h10.2M10.4 5.6 15.2 10l-4.8 4.4"/></svg>';
  var pin   = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  var star  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95Z"/></svg>';

  /* Property placeholder art — backend blank image field ka fallback */
  function propArt(cat) {
    var art = {
      residential: '<path d="M40 108 130 46l90 62v96H40Z"/><path d="M100 204v-52h60v52"/><rect x="62" y="124" width="30" height="26"/><rect x="168" y="124" width="30" height="26"/>',
      commercial:  '<path d="M56 204V54h84v150"/><path d="M140 204V96h64v108"/><path d="M74 74h20M74 100h20M74 126h20M74 152h20M110 74h14M110 100h14M110 126h14M110 152h14M158 116h14M186 116h6M158 146h14M186 146h6"/>',
      plot:        '<path d="M30 176 130 128l100 48-100 48Z"/><path d="M30 176v-28l100-48 100 48v28"/><path d="M96 118v-34M96 84l-14 8M96 84l14 8M172 140v-30M172 110l-13 8M172 110l13 8"/>'
    };
    return '<svg class="prop__art" viewBox="0 0 260 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="pg-' + cat + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#1d1f30"/><stop offset="1" stop-color="#0d0e17"/></linearGradient></defs>' +
      '<rect width="260" height="230" fill="url(#pg-' + cat + ')"/>' +
      '<g fill="none" stroke="#c8973b" stroke-opacity=".55" stroke-width="1.4" stroke-linejoin="round">' + art[cat] + '</g></svg>';
  }

  /* ═══ RENDER ════════════════════════════════════════════════════════ */

  // Services
  $('#services-grid').innerHTML = SERVICES.map(function (s, i) {
    var ref = referralLabel(s);
    return '<article class="svc stagger" style="--i:' + i + '">' +
      '<div class="svc__top">' +
        '<span class="svc__icon"><svg viewBox="0 0 24 24">' + ICONS[s.icon] + '</svg></span>' +
        '<span class="svc__n">0' + s.order + '</span>' +
      '</div>' +
      '<h3 class="svc__title">' + esc(s.title) + '</h3>' +
      '<p class="svc__desc">' + esc(s.short_description) + '</p>' +
      '<div class="svc__tags">' + s.tags.map(function (t) {
        return '<span class="svc__tag">' + esc(t) + '</span>';
      }).join('') + '</div>' +
      '<div class="svc__foot">' +
        (ref ? '<span class="svc__ref" title="' + esc(s.referral_note) + '"><i></i>' + esc(ref) + '</span>' : '<span></span>') +
        '<a class="svc__link" href="#contact" data-service="' + s.id + '">Inquiry bhejein ' + arrow + '</a>' +
      '</div>' +
    '</article>';
  }).join('');

  // Properties
  var grid = $('#properties-grid');
  var empty = $('#properties-empty');
  var filter = { type: '', category: '' };

  function renderProperties() {
    var list = PROPERTIES.filter(function (p) {
      return (!filter.type || p.type === filter.type) &&
             (!filter.category || p.category === filter.category);
    });
    empty.hidden = list.length > 0;
    grid.innerHTML = list.map(function (p, i) {
      var typeLabel = p.type === 'rent' ? 'For rent' : 'For sale';
      return '<article class="prop stagger" style="--i:' + i + '">' +
        '<div class="prop__media">' + propArt(p.category) +
          '<div class="prop__flags">' +
            '<span class="prop__flag">' + typeLabel + '</span>' +
            (p.is_featured ? '<span class="prop__flag prop__flag--gold">Featured</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="prop__body">' +
          '<p class="prop__price">' + formatPrice(p) + '</p>' +
          '<h3 class="prop__title">' + esc(p.title) + '</h3>' +
          '<p class="prop__loc">' + pin + esc(p.area ? p.area + ', ' + p.city : p.city) +
            (p.builder_name ? ' · ' + esc(p.builder_name) : '') + '</p>' +
          '<div class="prop__am">' + p.amenities.slice(0, 4).map(function (a) {
            return '<span>' + esc(a) + '</span>';
          }).join('') + '</div>' +
        '</div>' +
      '</article>';
    }).join('');
    $$('.prop', grid).forEach(watch);
  }

  $$('.filters__row').forEach(function (row) {
    var key = row.dataset.filter;
    row.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      $$('.chip', row).forEach(function (c) { c.classList.remove('is-on'); });
      chip.classList.add('is-on');
      filter[key] = chip.dataset.value;
      renderProperties();
    });
  });

  // Referral commission cards
  $('#refcards').innerHTML = SERVICES.filter(function (s) { return s.is_referral_enabled; })
    .map(function (s, i) {
      return '<div class="refcard stagger" style="--i:' + i + '">' +
        '<p class="refcard__val">' + esc(referralLabel(s)) + '</p>' +
        '<p class="refcard__svc">' + esc(s.title) + '</p>' +
        '<p class="refcard__note">' + esc(s.referral_note) + '</p>' +
      '</div>';
    }).join('');

  // Testimonials
  $('#quotes').innerHTML = TESTIMONIALS.map(function (t, i) {
    var stars = '';
    for (var n = 0; n < t.rating; n++) stars += star;
    return '<article class="quote stagger" style="--i:' + i + '">' +
      '<div class="quote__stars" aria-label="' + t.rating + ' out of 5">' + stars + '</div>' +
      '<p class="quote__text">“' + esc(t.review) + '”</p>' +
      '<div class="quote__who"><span class="avatar" aria-hidden="true">' + esc(initials(t.client_name)) + '</span>' +
        '<span><span class="quote__name">' + esc(t.client_name) + '</span>' +
        '<span class="quote__loc">' + esc(t.location) + '</span></span></div>' +
    '</article>';
  }).join('');

  // Team
  $('#team').innerHTML = TEAM.map(function (m, i) {
    return '<article class="member stagger" style="--i:' + i + '">' +
      '<span class="avatar" aria-hidden="true">' + esc(initials(m.name)) + '</span>' +
      '<div><h3 class="member__name">' + esc(m.name) + '</h3>' +
      '<p class="member__role">' + esc(m.designation) + '</p></div>' +
      '<p class="member__bio">' + esc(m.description) + '</p>' +
      '<div class="member__social">' +
        '<a href="#" aria-label="' + esc(m.name) + ' on LinkedIn"><svg viewBox="0 0 24 24"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.5h3.35V20H3.3Zm5.6 0h3.2v1.57h.05c.45-.84 1.54-1.73 3.17-1.73 3.39 0 4.02 2.2 4.02 5.07V20h-3.35v-5.46c0-1.3-.02-2.98-1.83-2.98-1.83 0-2.11 1.42-2.11 2.89V20H8.9Z"/></svg></a>' +
        '<a href="#" aria-label="' + esc(m.name) + ' on Instagram"><svg viewBox="0 0 24 24"><path d="M12 4.6c2.4 0 2.7 0 3.6.05 2.5.11 3.65 1.29 3.76 3.76.04.9.05 1.17.05 3.59s0 2.7-.05 3.59c-.11 2.46-1.26 3.65-3.76 3.76-.9.04-1.17.05-3.6.05s-2.7 0-3.59-.05c-2.5-.12-3.65-1.3-3.76-3.76C4.61 14.7 4.6 14.42 4.6 12s0-2.69.05-3.59C4.76 5.94 5.91 4.76 8.41 4.65 9.3 4.61 9.58 4.6 12 4.6ZM12 3c-2.45 0-2.75.01-3.71.05C4.93 3.2 3.2 4.93 3.05 8.29 3.01 9.25 3 9.55 3 12s.01 2.75.05 3.71c.15 3.36 1.88 5.09 5.24 5.24.96.04 1.26.05 3.71.05s2.75-.01 3.71-.05c3.35-.15 5.09-1.88 5.24-5.24.04-.96.05-1.26.05-3.71s-.01-2.75-.05-3.71c-.15-3.35-1.88-5.09-5.24-5.24C14.75 3.01 14.45 3 12 3Zm0 4.38a4.62 4.62 0 1 0 0 9.24 4.62 4.62 0 0 0 0-9.24ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.88a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16Z"/></svg></a>' +
      '</div></article>';
  }).join('');

  // FAQ
  $('#faq-list').innerHTML = FAQS.map(function (f, i) {
    return '<div class="faq__item">' +
      '<button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-' + f.id + '">' +
        '<span>' + esc(f.question) + '</span><span class="faq__sign" aria-hidden="true"></span>' +
      '</button>' +
      '<div class="faq__a" id="faq-a-' + f.id + '"><div><p>' + esc(f.answer) + '</p></div></div>' +
    '</div>';
  }).join('');

  $('#faq-list').addEventListener('click', function (e) {
    var btn = e.target.closest('.faq__q');
    if (!btn) return;
    var item = btn.parentElement;
    var open = item.classList.contains('is-open');
    $$('.faq__item', this).forEach(function (it) {
      it.classList.remove('is-open');
      $('.faq__q', it).setAttribute('aria-expanded', 'false');
    });
    if (!open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
  });

  // Footer services
  $('#footer-services').innerHTML = SERVICES.map(function (s) {
    return '<li><a href="#services">' + esc(s.title) + '</a></li>';
  }).join('');

  $('#year').textContent = new Date().getFullYear();

  /* ═══ FORMS ═════════════════════════════════════════════════════════ */

  function fillServiceSelect(sel, placeholder) {
    sel.innerHTML = '<option value="">' + placeholder + '</option>' +
      SERVICES.map(function (s) {
        return '<option value="' + s.id + '" data-slug="' + s.slug + '">' + esc(s.title) + '</option>';
      }).join('');
  }

  var inquiryForm  = $('#inquiry-form');
  var referralForm = $('#referral-form');
  var serviceSel   = $('#i-service');
  var catField     = $('#category-field');
  var catSel       = $('#i-category');

  fillServiceSelect(serviceSel, 'Service chuniye…');
  fillServiceSelect($('#r-service'), 'General (koi bhi service)');

  // service badla → us service ki categories load karo (khaali ho to hide)
  serviceSel.addEventListener('change', function () {
    var slug = serviceSel.selectedOptions[0] ? serviceSel.selectedOptions[0].dataset.slug : '';
    var cats = CATEGORIES[slug] || [];
    if (!cats.length) { catField.hidden = true; catSel.innerHTML = ''; return; }
    catSel.innerHTML = '<option value="">Category chuniye…</option>' +
      cats.map(function (c) { return '<option value="' + c.id + '">' + esc(c.name) + '</option>'; }).join('');
    catField.hidden = false;
  });

  // Service card ka "Inquiry bhejein" → contact form mein service pre-select
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-service]');
    if (!link) return;
    serviceSel.value = link.dataset.service;
    serviceSel.dispatchEvent(new Event('change'));
  });

  function setError(field, msg) {
    field.classList.add('has-error');
    if (!$('.field__err', field)) {
      var p = document.createElement('p');
      p.className = 'field__err';
      field.appendChild(p);
    }
    $('.field__err', field).textContent = msg;
  }
  function clearErrors(form) {
    $$('.field.has-error', form).forEach(function (f) {
      f.classList.remove('has-error');
      var e = $('.field__err', f); if (e) e.remove();
    });
  }
  function validate(form) {
    clearErrors(form);
    var ok = true, first = null;
    $$('[required]', form).forEach(function (el) {
      var field = el.closest('.field');
      var val = el.value.trim();
      if (!val) { setError(field, 'Yeh field zaroori hai.'); ok = false; first = first || el; return; }
      if (el.type === 'tel' && val.replace(/\D/g, '').replace(/^91/, '').length !== 10) {
        setError(field, '10 digit ka mobile number daaliye.'); ok = false; first = first || el;
      }
    });
    if (first) first.focus();
    return ok;
  }

  function showSuccess(form, message, waLink) {
    var box = $('.form__success', form);
    $('.form__successmsg', box).textContent = message;
    $('.btn--wa', box).href = waLink;
    box.hidden = false;
  }

  $$('.form__again').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var form = btn.closest('form');
      form.reset();
      clearErrors(form);
      if (form === inquiryForm) { catField.hidden = true; catSel.innerHTML = ''; }
      $('.form__success', form).hidden = true;
    });
  });

  inquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(inquiryForm)) return;
    var name    = $('#i-name').value.trim();
    var phone   = $('#i-phone').value.trim();
    var service = serviceSel.selectedOptions[0].textContent;
    var cat     = (!catField.hidden && catSel.value) ? catSel.selectedOptions[0].textContent : '';

    // Backend ka inquiry_customer_confirmation WhatsApp template
    var msg = 'Namaste ' + name + '!\n\n' + SITE.site_name + ' mein aapka swagat hai.\n' +
      'Aapki *' + (cat || service) + '* inquiry humne receive kar li hai.\n\n' +
      'Hum aapko jald contact karenge.';

    showSuccess(inquiryForm,
      'Dhanyawad ' + name + '! ' + service + ' ke liye aapki inquiry note kar li gayi. ' +
      'Hamari team ' + phone + ' par same working day contact karegi.',
      waUrl(SITE.whatsapp, msg));
  });

  referralForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate(referralForm)) return;
    var who    = $('#r-name').value.trim();
    var client = $('#r-client').value.trim();
    var svcSel = $('#r-service');
    var svc    = svcSel.value ? svcSel.selectedOptions[0].textContent : 'General';

    var msg = 'Namaste ' + who + '!\n\nAapka referral ' + SITE.site_name + ' mein receive ho gaya hai.\n' +
      'Service: *' + svc + '*\nClient: ' + client + '\n\nHum jald aapse contact karenge.';

    showSuccess(referralForm,
      'Shukriya ' + who + '! ' + client + ' ka referral note ho gaya. Deal close hote hi ' +
      'aapka commission process kar diya jaayega.',
      waUrl(SITE.whatsapp, msg));
  });

  /* ═══ NAV / MENU ════════════════════════════════════════════════════ */
  var nav    = $('#nav');
  var burger = $('#burger');
  var sheet  = $('#mobile-menu');

  var hero = $('.hero');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { rootMargin: '-88px 0px 0px 0px' }).observe(hero);
  }

  function setMenu(open) {
    sheet.hidden = !open;
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(sheet.hidden); });
  $$('.sheet__link, .sheet__foot a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !sheet.hidden) { setMenu(false); burger.focus(); }
  });

  /* ═══ REVEAL + COUNTERS ═════════════════════════════════════════════ */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      if (en.target.classList.contains('stat__num')) count(en.target);
      obs.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' }) : null;

  function watch(el) { if (io) io.observe(el); else el.classList.add('is-in'); }

  function count(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    var target = parseFloat(el.dataset.count);
    var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = pre + target + suf; return;
    }
    var t0 = null, dur = 1400, done = false;
    requestAnimationFrame(function step(ts) {
      if (done) return;
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(target * eased) + suf;
      if (p < 1) requestAnimationFrame(step);
    });
    // safety net — rAF na chale (background tab) to bhi final value dikhe
    setTimeout(function () { done = true; el.textContent = pre + target + suf; }, dur + 60);
  }

  $$('.reveal, .stagger, .stat__num').forEach(watch);

  // Failsafe: agar kisi wajah se IntersectionObserver fire na ho, to jo cheezein
  // pehle se screen par hain unhe waise hi dikha do — content kabhi chhupa na rahe.
  setTimeout(function () {
    $$('.reveal:not(.is-in), .stagger:not(.is-in), .stat__num').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('is-in');
        if (el.classList.contains('stat__num')) count(el);
      }
    });
  }, 1200);

  renderProperties();
})();
