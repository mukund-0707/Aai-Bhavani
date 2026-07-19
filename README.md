# Aai Bhavani Consultant

Property consulting, home loan, interior design aur digital marketing services — Django backend + Next.js frontend.

---

## Project Structure

```
Aai-Bhavani/
├── aai-bhavani-backend/    ← Django + DRF (Python)
├── aai-bhavani-frontend/   ← Next.js (coming soon)
└── docs/
    ├── analysis.md         ← Architecture decisions
    └── planning.md         ← Implementation plan
```

---

## Backend Setup (Django + UV)

### Prerequisites
- Python 3.11+
- [UV package manager](https://docs.astral.sh/uv/)

> **Dev mein kuch extra setup nahi chahiye!**
> SQLite use hota hai, email console pe print hoti hai, Cloudinary ki zarurat nahi.

### 1. UV Install karo (ek baar)

```bash
# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. Project setup

```bash
cd aai-bhavani-backend
uv sync
```

### 3. Migrate + Initial data

```bash
uv run python manage.py migrate
uv run python manage.py loaddata fixtures/initial_data.json
```

### 4. Superuser banao

```bash
uv run python manage.py createsuperuser
```

### 5. Server start karo

```bash
uv run python manage.py runserver
```

Server: `http://localhost:8000`
Admin panel: `http://localhost:8000/admin/`

---

## Production Setup (.env)

```bash
copy aai-bhavani-backend\.env.example aai-bhavani-backend\.env
```

`.env` mein ye values daalo:

```env
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=postgresql://postgres:password@localhost:5432/aai_bhavani
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
WHATSAPP_BACKEND=wame
```

---

## Apps Overview

| App | Kya karta hai |
|-----|--------------|
| `accounts` | Custom User model, JWT auth |
| `core` | SiteSettings (logo, contact, hero), Email + WhatsApp templates |
| `services` | Service listings + inline referral settings |
| `properties` | Property listings with images, filtering |
| `inquiries` | Service-linked categories, inquiry form, notifications |
| `referrals` | Referral submissions + commission tracking |
| `content` | Testimonials, Team members, FAQs |

---

## API Endpoints

### Auth
| URL | Method | Description |
|-----|--------|-------------|
| `/api/auth/login/` | POST | JWT login |
| `/api/auth/token/refresh/` | POST | Token refresh |
| `/api/auth/me/` | GET | Current user info |

### Core (Public GET / Admin PATCH)
| URL | Method | Description |
|-----|--------|-------------|
| `/api/site-settings/` | GET | Logo, contact, social, hero content |
| `/api/site-settings/` | PATCH | Update settings (admin only) |
| `/api/core/email-templates/` | GET / PATCH | Email templates (admin only) |
| `/api/core/whatsapp-templates/` | GET / PATCH | WhatsApp templates (admin only) |

### Services
| URL | Method | Description |
|-----|--------|-------------|
| `/api/services/` | GET | Active services list (with referral info) |
| `/api/services/<slug>/` | GET | Single service detail |
| `/api/services/` | POST / PATCH / DELETE | Admin CRUD |

### Properties
| URL | Method | Description |
|-----|--------|-------------|
| `/api/properties/` | GET | Properties list (filterable) |
| `/api/properties/<id>/` | GET | Single property detail |
| `/api/properties/` | POST / PATCH / DELETE | Admin CRUD |

### Inquiries
| URL | Method | Description |
|-----|--------|-------------|
| `/api/inquiries/categories/` | GET | Saari active categories |
| `/api/inquiries/categories/?service=<slug>` | GET | Us service ki categories |
| `/api/inquiries/` | POST | Submit inquiry (public) |
| `/api/inquiries/` | GET | All inquiries (admin only) |
| `/api/inquiries/<id>/` | PATCH | Status + notes update (admin only) |

### Referrals
| URL | Method | Description |
|-----|--------|-------------|
| `/api/referrals/` | POST | Submit referral (public) |
| `/api/referrals/` | GET | All referrals (admin only) |
| `/api/referrals/<id>/` | PATCH | Status + commission update (admin only) |

### Content
| URL | Method | Description |
|-----|--------|-------------|
| `/api/testimonials/` | GET | Active testimonials |
| `/api/team/` | GET | Active team members |
| `/api/faqs/` | GET | Active FAQs |

### Property Filters
```
GET /api/properties/?type=sell&category=residential&city=Pune
GET /api/properties/?min_price=5000000&max_price=10000000
GET /api/properties/?search=3BHK&ordering=-price
GET /api/properties/?is_featured=true
```

---

## Inquiry Form Flow

```
1. GET /api/services/                          → Service dropdown
2. GET /api/inquiries/categories/?service=<slug> → Us service ki categories
   └── Categories hain → dropdown dikhao
   └── [] empty → dropdown hide karo (direct inquiry)
3. POST /api/inquiries/                        → Submit karo
```

**Response mein `whatsapp_url` aata hai** — frontend success screen pe "WhatsApp pe contact karo" button dikhao.

---

## Notification System

Inquiry ya referral submit hone par automatically fire hota hai:

```
1. User ko confirmation EMAIL      (agar email diya ho)
   FROM: Aai Bhavani Gmail

2. User ko WhatsApp confirmation   (hamesha — phone mandatory hai)
   Dev:  wa.me redirect URL (free, no API)
   Prod: Twilio (WHATSAPP_BACKEND=twilio)

3. Saare admin users ko notification EMAIL
   TO: is_staff=True users
```

**Dev/Prod switch — sirf ek line:**
```env
WHATSAPP_BACKEND=wame    # development (default)
WHATSAPP_BACKEND=twilio  # production
```

---

## Email & WhatsApp Templates

Admin panel se templates edit karo — `{{placeholders}}` support hai:

| Placeholder | Value |
|-------------|-------|
| `{{customer_name}}` | User ka naam |
| `{{mobile}}` | Phone number |
| `{{email}}` | Email address |
| `{{service}}` | Service name |
| `{{category}}` | Category (e.g., Buy Property) |
| `{{message}}` | User ka message |
| `{{company_name}}` | Aai Bhavani Consultant |
| `{{whatsapp_number}}` | Company WhatsApp number |
| `{{date}}` | Submission date & time |

**4 Templates hain:**
- `inquiry_customer_confirmation` — User ko thank you
- `inquiry_admin_notification` — Admins ko new inquiry alert
- `referral_customer_confirmation` — Referrer ko thank you
- `referral_admin_notification` — Admins ko new referral alert

---

## Referral Settings

Har service ke andar referral settings hain — admin se manage karo:

| Field | Description |
|-------|-------------|
| `is_referral_enabled` | Is service ke liye referral on/off |
| `referral_type` | `percent` ya `flat` |
| `referral_value` | 50 (50%) ya 10000 (₹10,000) |
| `referral_note` | "Festival Offer", "Limited Time" etc. |

---

## Common UV Commands

```bash
uv sync                                        # Dependencies install/update
uv add <package>                               # Naya package add karo
uv run python manage.py runserver              # Dev server
uv run python manage.py migrate                # Migrations apply karo
uv run python manage.py makemigrations         # Naye migrations banao
uv run python manage.py createsuperuser        # Admin user banao
uv run python manage.py loaddata fixtures/initial_data.json  # Sample data load karo
uv run python manage.py shell                  # Django shell
```

---

## Intentionally Not Built (Future)

| Feature | Kab add karna |
|---------|--------------|
| SEO Management | Jab client specifically mange |
| Gallery Module | Jab 50+ photos manage karne padein |
| Service Categories | Jab 20+ services ho jaayein |
| WhatsApp Auto-send (Twilio) | Production pe jaane ke baad |
| Redis Caching | Real traffic aane par |
