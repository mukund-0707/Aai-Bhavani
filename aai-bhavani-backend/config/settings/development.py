"""
Development settings — uses SQLite, no Postgres required.
Emails are printed to the console, Cloudinary is not required.
"""
from .base import *

DEBUG = True

# SQLite — no database setup needed
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME':   BASE_DIR / 'db.sqlite3',
    }
}

# Local media files — overrides Cloudinary
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
MEDIA_URL  = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Emails are printed to the console in development
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Allow all origins in development
CORS_ALLOW_ALL_ORIGINS = True

# cloudinary_storage models are loaded but storage is not used in dev
# Keeping CLOUDINARY_STORAGE with dummy values to avoid errors
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dev',
    'API_KEY':    '000000000000000',
    'API_SECRET': 'dev_secret',
}
