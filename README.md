# Aai Bhavani Consultant

CMS-powered website — Django backend + Next.js frontend.

---

## Project Structure

```
Aai-Bhavani/
├── aai-bhavani-backend/    ← Django + DRF (Python)
└── aai-bhavani-frontend/   ← Next.js (coming soon)
```

---

## Backend Setup (Django + UV)

### Prerequisites
- Python 3.11+
- [UV package manager](https://docs.astral.sh/uv/)

> **Dev mein kuch extra setup nahi chahiye!**
> SQLite use hota hai, email console pe print hoti hai, Cloudinary ki zarurat nahi.

---

### 1. UV Install karo (ek baar)

```bash
# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. Project setup

```bash
cd aai-bhavani-backend

# Virtual environment + dependencies install
uv sync
```

### 3. Migrate karo

```bash
uv run python manage.py migrate
```

### 4. Superuser banao

```bash
uv run python manage.py createsuperuser
```

### 5. Server start karo

```bash
uv run python manage.py runserver
```

Server chalega: `http://localhost:8000`
Admin panel: `http://localhost:8000/admin/`

---

## Production Setup (.env)

```bash
copy aai-bhavani-backend\.env.example aai-bhavani-backend\.env
```

`.env` mein ye values daalo:

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://postgres:password@localhost:5432/aai_bhavani
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
ADMIN_EMAIL=admin@aaibhavani.com
```

---

## API Endpoints

### Auth
| URL | Method | Description |
|-----|--------|-------------|
| `/api/auth/login/` | POST | JWT login |
| `/api/auth/token/refresh/` | POST | Token refresh |
| `/api/auth/me/` | GET | Current user info |

### CMS (Admin managed)
| URL | Method | Description |
|-----|--------|-------------|
| `/api/cms/site-settings/` | GET / PATCH | Logo, colors, contact, social links |
| `/api/cms/hero/` | GET / PUT | Hero banner content |
| `/api/cms/navigation/` | GET | Navbar items (nested) |
| `/api/cms/page-layout/?page=home` | GET | Page sections order |
| `/api/cms/page-layout/reorder/` | PATCH | Drag & drop reorder (admin) |
| `/api/cms/sections/<id>/` | PATCH | Show/hide section (admin) |
| `/api/cms/seo/?page=home` | GET | SEO meta tags |
| `/api/cms/dashboard/stats/` | GET | Dashboard summary (admin) |
| `/api/cms/email-templates/` | GET / POST / PATCH | Email templates (admin) |
| `/api/cms/whatsapp-templates/` | GET / POST / PATCH | WhatsApp templates (admin) |

### Business
| URL | Method | Description |
|-----|--------|-------------|
| `/api/services/` | GET | Services list |
| `/api/referral-program/` | GET | Referral program info |
| `/api/properties/` | GET | Properties list (filterable) |
| `/api/gallery/` | GET | Gallery items |
| `/api/testimonials/` | GET | Client reviews |
| `/api/team/` | GET | Team members |
| `/api/faqs/` | GET | FAQs |

### Inquiries & Referrals
| URL | Method | Description |
|-----|--------|-------------|
| `/api/inquiries/categories/` | GET | Active inquiry categories (for form dropdown) |
| `/api/inquiries/` | POST | Submit inquiry (public) |
| `/api/inquiries/` | GET | All inquiries (admin only) |
| `/api/referrals/` | POST | Submit referral (public) |
| `/api/referrals/` | GET | All referrals (admin only) |

### Property Filters
```
GET /api/properties/?type=sell&category=residential&city=Pune
GET /api/properties/?min_price=5000000&max_price=10000000
GET /api/properties/?search=3BHK&ordering=-price
GET /api/properties/?is_featured=true
```

---

## Apps Overview

| App | Kya karta hai |
|-----|--------------|
| `accounts` | Custom User model, JWT auth (admin only) |
| `cms` | SiteSettings, PageBuilder, Hero, Navigation, SEO, Email/WhatsApp Templates |
| `services` | Service cards + Referral Program info |
| `properties` | Property listings with images, rich filtering |
| `gallery` | Images + YouTube/Instagram videos |
| `testimonials` | Client reviews |
| `team` | Team member profiles |
| `faqs` | FAQ questions |
| `inquiries` | Dynamic categories, contact form, email notification |
| `referrals` | Referral submissions + commission tracking |

---

## Email & WhatsApp Templates

Admin panel se templates edit karo — `{{placeholders}}` support hai:

| Placeholder | Value |
|-------------|-------|
| `{{customer_name}}` | Inquiry submitter ka naam |
| `{{mobile}}` | Phone number |
| `{{email}}` | Email address |
| `{{category}}` | Inquiry category (e.g., Buy Property) |
| `{{message}}` | Customer ka message |
| `{{company_name}}` | Aai Bhavani Consultant |
| `{{date}}` | Submission date & time |

---

## Common UV Commands

```bash
uv sync                              # Dependencies install/update
uv add <package>                     # Naya package add karo
uv run python manage.py runserver    # Dev server
uv run python manage.py migrate      # Migrations apply karo
uv run python manage.py createsuperuser
uv run python manage.py shell        # Django shell
uv run pytest                        # Tests run karo
```

---

## API Tester

Project mein ek built-in API tester hai:

```
aai-bhavani-backend/test_frontend.html
```

Browser mein directly open karo — sab endpoints test ho jaate hain.
