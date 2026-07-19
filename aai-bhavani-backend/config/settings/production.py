from .base import *

DEBUG = False

# Production mein actual Gmail se email jaayegi
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Production mein Twilio se WhatsApp jaayega
# WHATSAPP_BACKEND = 'twilio'  # uncomment when Twilio is configured
WHATSAPP_BACKEND = 'wame'  # wa.me tab tak jab tak Twilio setup na ho
