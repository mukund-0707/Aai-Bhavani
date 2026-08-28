import { SITE } from '../data/siteData';

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.2 1.2-1.8 1.3-.5.1-1 .1-1.7-.1a13 13 0 0 1-6.9-6.1c-.5-.9-.8-1.7-.8-2.4 0-.8.4-1.4.9-1.8.2-.2.4-.2.6-.2h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a9 9 0 0 0 3.9 3.4c.3.1.5.1.6-.1l.7-.9c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3v.8Z" />
      </svg>
    </a>
  );
}
