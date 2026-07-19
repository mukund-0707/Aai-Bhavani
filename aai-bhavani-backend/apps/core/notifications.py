"""
Notification Service — Aai Bhavani

Email aur WhatsApp notifications yahan se fire hoti hain.

Dev/Prod switching:
    settings.WHATSAPP_BACKEND = 'wame'   → wa.me URL (development, free)
    settings.WHATSAPP_BACKEND = 'twilio' → Twilio API (production)

    settings.EMAIL_BACKEND = console     → terminal print (development)
    settings.EMAIL_BACKEND = smtp        → actual Gmail (production)
"""
import urllib.parse
import logging

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


# ── Placeholder renderer ──────────────────────────────────────────────────────

def render_template(template_str: str, context: dict) -> str:
    """{{key}} placeholders ko context values se replace karo."""
    result = template_str
    for key, value in context.items():
        result = result.replace(f'{{{{{key}}}}}', str(value))
    return result


# ── WhatsApp Service ──────────────────────────────────────────────────────────

class WhatsAppService:

    @staticmethod
    def build_url(to_number: str, message: str) -> str | None:
        """
        wa.me redirect URL banao.
        Frontend is URL se button dikhayega — user click kare to WhatsApp khulega.
        """
        if not to_number:
            return None
        # Number clean karo — sirf digits
        clean = ''.join(filter(str.isdigit, to_number))
        # India prefix add karo agar nahi hai
        if len(clean) == 10:
            clean = '91' + clean
        encoded = urllib.parse.quote(message)
        return f"https://wa.me/{clean}?text={encoded}"

    @classmethod
    def send(cls, to_number: str, message: str) -> str | None:
        """
        WHATSAPP_BACKEND setting ke hisaab se send karo.
        Returns: wa.me URL (wame backend) ya None (failure/missing)
        """
        if not to_number:
            return None

        backend = getattr(settings, 'WHATSAPP_BACKEND', 'wame')

        try:
            if backend == 'wame':
                return cls.build_url(to_number, message)
            elif backend == 'twilio':
                return cls._send_twilio(to_number, message)
        except Exception as e:
            logger.warning(f"WhatsApp send failed: {e}")
        return None

    @staticmethod
    def _send_twilio(to_number: str, message: str) -> None:
        """
        Production: Twilio WhatsApp API.
        Ye tab implement karo jab production pe jaana ho.
        Settings chahiye: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM
        """
        # from twilio.rest import Client
        # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        # client.messages.create(
        #     from_=f'whatsapp:{settings.TWILIO_WHATSAPP_FROM}',
        #     to=f'whatsapp:+{to_number}',
        #     body=message
        # )
        logger.info(f"Twilio not configured yet. Would send to {to_number}: {message[:50]}")
        return None


# ── Email Service ─────────────────────────────────────────────────────────────

class EmailService:

    @staticmethod
    def send(to_emails: list[str], subject: str, body: str, html_body: str = '') -> bool:
        """
        Email bhejo. Fail hone pe crash nahi karta — sirf log karta hai.
        Dev mein: console pe print hoga.
        Prod mein: actual Gmail se jaayega.
        """
        if not to_emails:
            return False

        # Empty emails filter karo
        valid_emails = [e for e in to_emails if e and e.strip()]
        if not valid_emails:
            return False

        try:
            send_mail(
                subject=subject,
                message=body,
                from_email=getattr(settings, 'EMAIL_HOST_USER', None) or 'noreply@aaibhavani.com',
                recipient_list=valid_emails,
                html_message=html_body or None,
                fail_silently=False,
            )
            return True
        except Exception as e:
            logger.warning(f"Email send failed to {valid_emails}: {e}")
            return False


# ── Notification Dispatcher ───────────────────────────────────────────────────

class NotificationService:
    """
    Inquiry aur Referral notifications dispatch karta hai.
    Inquiry hamesha save hogi — notifications best-effort hain.
    """

    @staticmethod
    def _get_template(trigger: str, model_class):
        """DB se active template fetch karo — None return karo agar nahi mila."""
        try:
            return model_class.objects.filter(trigger=trigger, is_active=True).first()
        except Exception:
            return None

    @staticmethod
    def _get_site_settings():
        """SiteSettings singleton fetch karo."""
        try:
            from apps.core.models import SiteSettings
            return SiteSettings.get()
        except Exception:
            return None

    @staticmethod
    def _get_admin_emails() -> list[str]:
        """Saare is_staff=True, is_active=True users ke emails."""
        try:
            from apps.accounts.models import User
            return list(
                User.objects.filter(is_staff=True, is_active=True)
                .exclude(email='')
                .values_list('email', flat=True)
            )
        except Exception:
            return []

    @classmethod
    def send_inquiry_notifications(cls, inquiry) -> str | None:
        """
        Inquiry submit hone par teen notifications:
        1. User ko confirmation email (agar email diya ho)
        2. User ko WhatsApp wa.me URL (phone mandatory)
        3. Saare admins ko notification email

        Returns: whatsapp_url (frontend use karega) ya None
        """
        from apps.core.models import EmailTemplate, WhatsAppTemplate

        site    = cls._get_site_settings()
        company = site.site_name if site else 'Aai Bhavani Consultant'
        wa_num  = site.whatsapp if site else ''

        service_name  = inquiry.service.title  if inquiry.service  else 'General'
        category_name = inquiry.category.name  if inquiry.category else ''
        display_cat   = category_name or service_name

        context = {
            'customer_name':  inquiry.name,
            'mobile':         inquiry.phone,
            'email':          inquiry.email or 'N/A',
            'service':        service_name,
            'category':       display_cat,
            'message':        inquiry.message or 'N/A',
            'company_name':   company,
            'whatsapp_number': wa_num,
            'date':           inquiry.created_at.strftime('%d %b %Y, %I:%M %p'),
        }

        whatsapp_url = None

        # 1. User ko confirmation email
        if inquiry.email:
            try:
                tmpl = cls._get_template(
                    EmailTemplate.Trigger.INQUIRY_CUSTOMER_CONFIRMATION, EmailTemplate
                )
                if tmpl:
                    subject = render_template(tmpl.subject, context)
                    body    = render_template(tmpl.body_text, context)
                    html    = render_template(tmpl.body_html, context) if tmpl.body_html else ''
                else:
                    subject = f"Thank You for Your Inquiry — {company}"
                    body    = (
                        f"Dear {inquiry.name},\n\n"
                        f"Thank you for reaching out to {company}!\n"
                        f"We have received your inquiry for: {display_cat}\n\n"
                        f"Our team will contact you shortly on {inquiry.phone}.\n\n"
                        f"Regards,\n{company}"
                    )
                    html = ''
                EmailService.send([inquiry.email], subject, body, html)
            except Exception as e:
                logger.warning(f"Inquiry customer email failed: {e}")

        # 2. User ko WhatsApp URL
        try:
            tmpl = cls._get_template(
                WhatsAppTemplate.Trigger.INQUIRY_CUSTOMER_CONFIRMATION, WhatsAppTemplate
            )
            if tmpl:
                message = render_template(tmpl.template_body, context)
            else:
                message = (
                    f"Namaste {inquiry.name}! 🙏\n"
                    f"{company} mein aapka swagat hai.\n"
                    f"Aapki {display_cat} inquiry humne receive kar li hai.\n"
                    f"Hum aapko jald contact karenge.\n"
                    f"Dhanyawad! 😊"
                )
            whatsapp_url = WhatsAppService.send(inquiry.phone, message)
        except Exception as e:
            logger.warning(f"Inquiry WhatsApp URL generation failed: {e}")

        # 3. Admins ko notification email
        try:
            admin_emails = cls._get_admin_emails()
            if admin_emails:
                tmpl = cls._get_template(
                    EmailTemplate.Trigger.INQUIRY_ADMIN_NOTIFICATION, EmailTemplate
                )
                if tmpl:
                    subject = render_template(tmpl.subject, context)
                    body    = render_template(tmpl.body_text, context)
                    html    = render_template(tmpl.body_html, context) if tmpl.body_html else ''
                else:
                    subject = f"New Inquiry: {display_cat} — {inquiry.name}"
                    body    = (
                        f"New inquiry received!\n\n"
                        f"Name    : {inquiry.name}\n"
                        f"Phone   : {inquiry.phone}\n"
                        f"Email   : {inquiry.email or 'N/A'}\n"
                        f"Service : {service_name}\n"
                        f"Category: {category_name or 'N/A'}\n"
                        f"Message : {inquiry.message or 'N/A'}\n"
                        f"Date    : {context['date']}"
                    )
                    html = ''
                EmailService.send(admin_emails, subject, body, html)
        except Exception as e:
            logger.warning(f"Inquiry admin notification failed: {e}")

        return whatsapp_url

    @classmethod
    def send_referral_notifications(cls, referral) -> str | None:
        """
        Referral submit hone par teen notifications:
        1. Referrer ko confirmation email (agar email diya ho)
        2. Referrer ko WhatsApp wa.me URL
        3. Saare admins ko notification email

        Returns: whatsapp_url ya None
        """
        from apps.core.models import EmailTemplate, WhatsAppTemplate

        site    = cls._get_site_settings()
        company = site.site_name if site else 'Aai Bhavani Consultant'
        wa_num  = site.whatsapp  if site else ''

        service_name = referral.service.title if referral.service else 'General'

        context = {
            'customer_name':  referral.referrer_name,
            'mobile':         referral.referrer_phone,
            'email':          referral.referrer_email or 'N/A',
            'service':        service_name,
            'category':       service_name,
            'client_name':    referral.client_name,
            'client_phone':   referral.client_phone or 'N/A',
            'company_name':   company,
            'whatsapp_number': wa_num,
            'date':           referral.created_at.strftime('%d %b %Y, %I:%M %p'),
        }

        whatsapp_url = None

        # 1. Referrer ko confirmation email
        if referral.referrer_email:
            try:
                tmpl = cls._get_template(
                    EmailTemplate.Trigger.REFERRAL_CUSTOMER_CONFIRMATION, EmailTemplate
                )
                if tmpl:
                    subject = render_template(tmpl.subject, context)
                    body    = render_template(tmpl.body_text, context)
                    html    = render_template(tmpl.body_html, context) if tmpl.body_html else ''
                else:
                    subject = f"Thank You for Your Referral — {company}"
                    body    = (
                        f"Dear {referral.referrer_name},\n\n"
                        f"Thank you for referring {referral.client_name} to {company}!\n"
                        f"Service: {service_name}\n\n"
                        f"Our team will review your referral and contact you shortly.\n\n"
                        f"Regards,\n{company}"
                    )
                    html = ''
                EmailService.send([referral.referrer_email], subject, body, html)
            except Exception as e:
                logger.warning(f"Referral customer email failed: {e}")

        # 2. Referrer ko WhatsApp URL
        try:
            tmpl = cls._get_template(
                WhatsAppTemplate.Trigger.REFERRAL_CUSTOMER_CONFIRMATION, WhatsAppTemplate
            )
            if tmpl:
                message = render_template(tmpl.template_body, context)
            else:
                message = (
                    f"Namaste {referral.referrer_name}! 🙏\n"
                    f"Aapka referral {company} mein receive ho gaya hai.\n"
                    f"Client: {referral.client_name}\n"
                    f"Service: {service_name}\n"
                    f"Hum jald aapse contact karenge. Dhanyawad! 😊"
                )
            whatsapp_url = WhatsAppService.send(referral.referrer_phone, message)
        except Exception as e:
            logger.warning(f"Referral WhatsApp URL generation failed: {e}")

        # 3. Admins ko notification
        try:
            admin_emails = cls._get_admin_emails()
            if admin_emails:
                tmpl = cls._get_template(
                    EmailTemplate.Trigger.REFERRAL_ADMIN_NOTIFICATION, EmailTemplate
                )
                if tmpl:
                    subject = render_template(tmpl.subject, context)
                    body    = render_template(tmpl.body_text, context)
                    html    = render_template(tmpl.body_html, context) if tmpl.body_html else ''
                else:
                    subject = f"New Referral: {service_name} — {referral.referrer_name}"
                    body    = (
                        f"New referral received!\n\n"
                        f"Referrer : {referral.referrer_name}\n"
                        f"Phone    : {referral.referrer_phone}\n"
                        f"Email    : {referral.referrer_email or 'N/A'}\n"
                        f"Client   : {referral.client_name}\n"
                        f"Client Ph: {referral.client_phone or 'N/A'}\n"
                        f"Service  : {service_name}\n"
                        f"Date     : {context['date']}"
                    )
                    html = ''
                EmailService.send(admin_emails, subject, body, html)
        except Exception as e:
            logger.warning(f"Referral admin notification failed: {e}")

        return whatsapp_url
