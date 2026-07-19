# Aai Bhavani — Frontend Developer API Reference

> Backend: Django + DRF | Base URL: `http://localhost:8000` (dev)
> Frontend: Next.js (tumhara kaam)

---

## Setup

### Backend locally chalao

```bash
cd aai-bhavani-backend
uv sync
uv run python manage.py migrate
uv run python manage.py loaddata fixtures/initial_data.json
uv run python manage.py createsuperuser
uv run python manage.py runserver
```

- API Base: `http://localhost:8000/api/`
- Admin Panel: `http://localhost:8000/admin/`

### CORS

Dev mein `http://localhost:3000` already allowed hai. Production mein `.env` mein `CORS_ALLOWED_ORIGINS` set karo.

---

## Authentication

JWT based auth — sirf admin panel ke liye. Public pages ko auth ki zarurat nahi.

### Login

```
POST /api/auth/login/
```

**Request:**
```json
{
  "username": "admin",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "access": "eyJ...",
  "refresh": "eyJ...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@aaibhavani.com",
    "is_staff": true
  }
}
```

### Token Refresh

```
POST /api/auth/token/refresh/
```
```json
{ "refresh": "eyJ..." }
```

### Authenticated Requests

```
Authorization: Bearer <access_token>
```

---

## Public APIs (No Auth Required)

---

### 1. Site Settings

```
GET /api/site-settings/
```

**Response:**
```json
{
  "site_name": "Aai Bhavani Consultant",
  "site_tagline": "Aapka Vishwasneey Property Partner",
  "logo": "https://res.cloudinary.com/.../logo.png",
  "favicon": "https://...",
  "phone": "+91 98765 43210",
  "whatsapp": "919876543210",
  "email": "info@aaibhavani.com",
  "address": "Pune, Maharashtra, India",
  "google_map_url": "",
  "working_hours": "Mon-Sat: 9am - 7pm",
  "facebook_url": "",
  "instagram_url": "",
  "linkedin_url": "",
  "youtube_url": "",
  "hero_title": "Aapka Sapna, Hamari Zimmedari",
  "hero_subtitle": "Property Consulting | Interior Design | Home Loan",
  "hero_description": "...",
  "hero_image": "https://...",
  "hero_button_text": "Services Dekhein",
  "hero_button_link": "/services",
  "updated_at": "2026-07-19T10:00:00Z"
}
```

> Navbar, footer, hero section — sab yahan se populate karo.

---

### 2. Services

```
GET /api/services/
GET /api/services/<slug>/
```

**List Response:**
```json
[
  {
    "id": 1,
    "title": "Property Consulting",
    "slug": "property-consulting",
    "icon": "home",
    "banner_image": "https://...",
    "short_description": "Buy, sell ya rent karne mein expert guidance.",
    "order": 1,
    "is_referral_enabled": true,
    "referral_type": "percent",
    "referral_value": "50.00",
    "referral_note": "Deal close hone par 50% profit share"
  },
  {
    "id": 3,
    "title": "Interior Design",
    "slug": "interior-design",
    "icon": "palette",
    "banner_image": "https://...",
    "short_description": "Aapke ghar ko sundar banana hamara kaam.",
    "order": 3,
    "is_referral_enabled": false,
    "referral_type": "percent",
    "referral_value": "50.00",
    "referral_note": ""
  }
]
```

**Detail Response** (GET /api/services/property-consulting/):
```json
{
  "id": 1,
  "title": "Property Consulting",
  "slug": "property-consulting",
  "icon": "home",
  "banner_image": "https://...",
  "short_description": "...",
  "long_description": "Full HTML ya text description...",
  "order": 1,
  "is_active": true,
  "is_referral_enabled": true,
  "referral_type": "percent",
  "referral_value": "50.00",
  "referral_note": "Deal close hone par 50% profit share",
  "created_at": "2026-01-01T00:00:00Z"
}
```

> `is_referral_enabled: true` wali services pe referral CTA dikhao.

---

### 3. Properties

```
GET /api/properties/
GET /api/properties/<id>/
```

**Filters (query params):**
```
?type=sell              → sell / rent / both
?category=residential   → residential / commercial / plot
?city=Pune
?is_featured=true
?min_price=5000000
?max_price=15000000
?search=3BHK            → title, city, area, builder_name mein search
?ordering=-price        → price, -price, created_at, -created_at
```

**Response:**
```json
{
  "count": 12,
  "next": "http://localhost:8000/api/properties/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "3BHK Flat in Kothrud",
      "description": "...",
      "type": "sell",
      "category": "residential",
      "price": "8500000.00",
      "city": "Pune",
      "area": "Kothrud",
      "address": "...",
      "builder_name": "XYZ Builders",
      "amenities": ["parking", "gym", "security"],
      "is_featured": true,
      "is_active": true,
      "created_at": "2026-07-01T00:00:00Z",
      "images": [
        {
          "id": 1,
          "image": "https://...",
          "alt_text": "Front view",
          "is_primary": true,
          "order": 0
        }
      ]
    }
  ]
}
```

> Pagination: default 10 per page. `?page=2` se next page.

---

### 4. Inquiry Categories

```
GET /api/inquiries/categories/
GET /api/inquiries/categories/?service=<slug>
```

**?service=property-consulting:**
```json
[
  { "id": 1, "name": "Buy Property", "order": 1 },
  { "id": 2, "name": "Sell Property", "order": 2 },
  { "id": 3, "name": "Rent Property", "order": 3 }
]
```

**?service=interior-design:**
```json
[]
```
> Empty array = is service mein koi category nahi. Category dropdown hide karo.

---

### 5. Submit Inquiry

```
POST /api/inquiries/
Content-Type: application/json
```

**Request:**
```json
{
  "service": 1,
  "category": 2,
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "message": "Mujhe 2BHK chahiye Kothrud mein."
}
```

> `service` — required (ID)
> `category` — optional (ID), sirf tab bhejo jab service mein categories hon
> `email` — optional
> `message` — optional

**Success Response (201):**
```json
{
  "success": true,
  "message": "Inquiry submit ho gayi! Hum jald contact karenge.",
  "whatsapp_url": "https://wa.me/919876543210?text=Namaste+Rahul..."
}
```

> `whatsapp_url` — success screen pe "WhatsApp pe Chat Karo" button dikhao.
> User click kare to pre-filled message ke saath WhatsApp khulega.

**Validation Error (400):**
```json
{
  "phone": ["This field is required."],
  "category": ["Yeh category is service se belong nahi karti."]
}
```

---

### 6. Submit Referral

```
POST /api/referrals/
Content-Type: application/json
```

**Request:**
```json
{
  "referrer_name": "Suresh Patil",
  "referrer_phone": "9123456789",
  "referrer_email": "suresh@example.com",
  "client_name": "Priya Joshi",
  "client_phone": "9876001234",
  "service": 1
}
```

> `referrer_email` — optional
> `client_phone` — optional
> `service` — optional (ID)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Referral submit ho gaya! Hum jald contact karenge.",
  "whatsapp_url": "https://wa.me/919123456789?text=Namaste+Suresh..."
}
```

---

### 7. Testimonials

```
GET /api/testimonials/
```

```json
[
  {
    "id": 1,
    "client_name": "Amit Desai",
    "photo": "https://...",
    "rating": 5,
    "review": "Bahut achha experience raha...",
    "location": "Pune",
    "order": 1
  }
]
```

---

### 8. Team Members

```
GET /api/team/
```

```json
[
  {
    "id": 1,
    "photo": "https://...",
    "name": "Priya Sharma",
    "designation": "Property Consultant",
    "description": "10+ years experience...",
    "facebook": "",
    "instagram": "https://instagram.com/...",
    "linkedin": "",
    "order": 1
  }
]
```

---

### 9. FAQs

```
GET /api/faqs/
```

```json
[
  {
    "id": 1,
    "question": "Property buying process kya hai?",
    "answer": "Pehle budget decide karo...",
    "order": 1
  }
]
```

---

## Inquiry Form — Complete Flow

```
Step 1: Services load karo
        GET /api/services/
        → Dropdown banao

Step 2: User service select kare to categories load karo
        GET /api/inquiries/categories/?service=<slug>
        → [] empty   = category dropdown mat dikhao
        → [...]       = category dropdown dikhao

Step 3: Form submit karo
        POST /api/inquiries/
        → success.whatsapp_url se WhatsApp button dikhao
```

---

## Referral Section — Logic

```javascript
// Service card pe referral badge/CTA
if (service.is_referral_enabled) {
  if (service.referral_type === 'percent') {
    show(`${service.referral_value}% Profit Share`)
  } else {
    show(`Flat ₹${service.referral_value} Commission`)
  }
  if (service.referral_note) {
    show(service.referral_note)  // "Festival Offer - Limited Time"
  }
}
```

---

## Pages — Suggested Structure

| Page | API Calls |
|------|-----------|
| `/` (Home) | site-settings, services, testimonials, faqs |
| `/services` | services list |
| `/services/[slug]` | service detail |
| `/properties` | properties list (with filters) |
| `/properties/[id]` | property detail |
| `/contact` | POST /api/inquiries/ |
| `/referral` | services (for dropdown), POST /api/referrals/ |
| `/about` | team, testimonials |

---

## Error Handling

| Status | Matlab |
|--------|--------|
| 200 | Success |
| 201 | Created (inquiry/referral submit) |
| 400 | Validation error — `response.data` mein field errors hain |
| 401 | Unauthorized — admin token chahiye |
| 404 | Not found |
| 500 | Server error |

---

## Image URLs

- Development: Local media files — `http://localhost:8000/media/...`
- Production: Cloudinary URLs — `https://res.cloudinary.com/...`

Blank image fields `""` aate hain — fallback placeholder dikhao.

---

## Notes

- Saari list APIs sirf `is_active: true` records return karti hain
- Pagination default 10 per page — `?page=<n>` se navigate karo
- `whatsapp` field mein number without `+` aata hai (e.g., `919876543210`) — wa.me links already backend se bante hain
- Admin panel: `http://localhost:8000/admin/` — content yahan se manage hoga
