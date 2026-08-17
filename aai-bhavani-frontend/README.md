# AB Groups — Frontend (static)

Aai Bhavani Consultant ka single-page marketing site. **Poori tarah static hai —
backend se koi connection nahi.** Sirf 3 files, koi framework nahi, koi build step nahi.

```
index.html    markup
styles.css    design tokens + saara layout
main.js       demo data + rendering + interactions
```

Chalane ke liye `index.html` browser mein khol do. Bas.

---

## Design

| Token | Value | Kahan se |
|---|---|---|
| `--gold` | `#c8973b` | backend `cms.sitesettings.primary_color` |
| `--ink` / `--navy` | `#12131f` / `#1a1a2e` | backend `secondary_color` |
| Font | Inter 300–700 (Google Fonts) | — |

Sections: hero (background video) → services → properties → referral →
testimonials → team → FAQ → contact → footer.

Hero ka video wahi CloudFront URL hai jo reference prompts mein tha.

---

## Backend mapping

`main.js` ke upar ka `DATA` jaan-boojh kar **backend ke API response ke same shape**
mein likha hai, taaki baad mein jodna aasan ho:

| JS constant | Backend endpoint |
|---|---|
| `SITE` | `GET /api/site-settings/` |
| `SERVICES` | `GET /api/services/` |
| `CATEGORIES` | `GET /api/inquiries/categories/?service=<slug>` |
| `PROPERTIES` | `GET /api/properties/` |
| `TESTIMONIALS` | `GET /api/testimonials/` |
| `TEAM` | `GET /api/team/` |
| `FAQS` | `GET /api/faqs/` |

Behaviour bhi backend ke rules follow karta hai:

- Service par `is_referral_enabled: true` ho to hi commission badge dikhta hai,
  aur `referral_type` ke hisaab se `50% profit share` ya `Flat ₹5,000`.
- Inquiry form mein service select karte hi us service ki categories aati hain.
  Category list khaali ho (jaise Referral Programs) to dropdown hide ho jaata hai —
  bilkul jaise API `[]` return karti hai.
- Form submit hone par jo WhatsApp link banta hai, wahi logic hai jo backend ke
  `WhatsAppService.build_url()` mein hai (digits clean, 10-digit par `91` prefix).
- Property filters `?type=` aur `?category=` ke query params mirror karte hain.
- Property images ki jagah SVG blueprint placeholder hai — backend bhi blank
  image field par placeholder dikhane ko kehta hai.

### Baad mein backend jodna ho to

`main.js` mein `DATA` constants ko `fetch` se replace kar do, baaki render code
waisa hi chalega:

```js
const SERVICES = await (await fetch('http://localhost:8000/api/services/')).json();
const PROPERTIES = (await (await fetch('.../api/properties/')).json()).results; // paginated
```

Forms ke `submit` handlers mein `showSuccess(...)` se pehle
`POST /api/inquiries/` ya `POST /api/referrals/` call karna hoga, aur response ka
`whatsapp_url` seedha use kar lena (abhi wo client-side ban raha hai).

---

## ⚠️ Demo content — badalna zaroori hai

Ye sab **placeholder** hai, real data nahi:

- Stats: 500+ families, ₹120 Cr+ deals, 12+ years, 50% referral share
- 6 properties (titles, prices, builder names)
- 3 testimonials aur 3 team members (naam, designation, bio)
- Phone `+91 98765 43210`, email `info@aaibhavani.com`, social links `#`

Live karne se pehle inhe asli values se replace karein. Dono forms par
"Demo site — data kahin save nahi hota" likha hua hai; backend jodte waqt
wo line hata dena.

---

## Accessibility / behaviour

- Mobile menu: burger → full-screen sheet, Escape se band, body scroll lock
- FAQ accordion `aria-expanded` + `aria-controls` ke saath
- `prefers-reduced-motion: reduce` par saari animations off
- Scroll reveal ka failsafe hai — content kabhi chhupa nahi rehta
