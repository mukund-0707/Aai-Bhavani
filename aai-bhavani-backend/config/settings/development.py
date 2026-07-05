"""
Development settings — SQLite use karta hai, Postgres ki zarurat nahi.
Email console pe print hogi, Cloudinary ki zarurat nahi.
"""
from .base import *

DEBUG = True

# SQLite — koi database setup nahi chahiye
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME':   BASE_DIR / 'db.sqlite3',
    }
}

# Local media files — Cloudinary override karo
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
MEDIA_URL  = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Email console pe print hogi
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Dev mein sab CORS allow
CORS_ALLOW_ALL_ORIGINS = True

# Dev mein cloudinary_storage models load hoti hain but storage nahi use hota
# Isliye CLOUDINARY_STORAGE ko empty rakhte hain — koi error nahi aayega
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dev',
    'API_KEY':    '000000000000000',
    'API_SECRET': 'dev_secret',
}
