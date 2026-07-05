# Aai Bhavani Consultant

Ek CMS-powered website — Django backend + Next.js frontend.

📄 Planning docs:
- [Backend Plan](BACKEND_PLAN.md)
- [Website Plan](WEBSITE_PLAN.md)

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
- UV package manager

> **PostgreSQL, Cloudinary, Email — dev mein kuch nahi chahiye!**
> Development mode mein SQLite use hota hai aur sab kuch locally kaam karta hai.

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

# Virtual env activate
.venv\Scripts\activate          # Windows
source .venv/bin/activate       # Mac/Linux
```

### 3. Migrations run karo (no .env needed!)

```bash
uv run python manage.py makemigrations accounts
uv run python manage.py makemigrations cms
uv run python manage.py makemigrations services
uv run python manage.py makemigrations properties
uv run python manage.py makemigrations gallery
uv run python manage.py makemigrations testimonials
uv run python manage.py makemigrations team
uv run python manage.py makemigrations faqs
uv run python manage.py makemigrations inquiries
uv run python manage.py makemigrations referrals
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

---

### Production ke liye (.env setup)

Jab PostgreSQL + Cloudinary ready ho tab `.env` banao:

```bash
copy .env.example .env
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

## Available URLs

| URL | Description |
|-----|-------------|
| `http://localhost:8000/admin/` | Django Admin Panel |
| `http://localhost:8000/api/auth/login/` | JWT Login |
| `http://localhost:8000/api/cms/site-settings/` | Site settings |
| `http://localhost:8000/api/cms/page-layout/?page=home` | Page sections order |
| `http://localhost:8000/api/cms/hero/` | Hero section data |
| `http://localhost:8000/api/cms/navigation/` | Navbar items |
| `http://localhost:8000/api/services/` | Services list |
| `http://localhost:8000/api/properties/` | Properties list |
| `http://localhost:8000/api/gallery/` | Gallery items |
| `http://localhost:8000/api/testimonials/` | Testimonials |
| `http://localhost:8000/api/team/` | Team members |
| `http://localhost:8000/api/faqs/` | FAQs |
| `http://localhost:8000/api/inquiries/` | Submit inquiry (POST) |
| `http://localhost:8000/api/referrals/` | Submit referral (POST) |
| `http://localhost:8000/api/cms/dashboard/stats/` | Dashboard stats (admin) |

---

## Common UV Commands

```bash
uv sync                              # Dependencies install/update
uv add <package>                     # Naya package add karo
uv remove <package>                  # Package remove karo
uv run python manage.py runserver    # Dev server
uv run python manage.py makemigrations
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py shell        # Django shell
uv run pytest                        # Tests run karo
```

---

## Apps Overview

| App | Kya karta hai |
|-----|--------------|
| `accounts` | Custom User model, JWT auth |
| `cms` | SiteSettings, PageBuilder, Hero, Navigation, SEO, Theme |
| `services` | Service cards + Referral Program settings |
| `properties` | Property listings with images |
| `gallery` | Images + YouTube/Instagram videos |
| `testimonials` | Client reviews |
| `team` | Team member profiles |
| `faqs` | FAQ questions |
| `inquiries` | Contact form + email notification |
| `referrals` | Referral submissions + commission tracking |
