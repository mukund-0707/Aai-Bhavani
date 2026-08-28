import './globals.css';

export const metadata = {
  title: 'AB Groups — Property, Loan, Interiors & Digital Marketing | Surat',
  description:
    'AB Groups (Aai Bhavani Consultant) — Surat trusted partner for property consulting, home loans, interior design, digital marketing and referral programs.',
  keywords:
    'property consultant surat, home loan surat, interior design surat, digital marketing surat, AB Groups, Aai Bhavani Consultant',
  authors: [{ name: 'AB Groups' }],
  openGraph: {
    title: 'AB Groups — Property, Loan, Interiors & Digital Marketing',
    description:
      'Your property dreams, our responsibility. From finding the perfect home to loans, interiors, and digital marketing — AB Groups is with you every step.',
    url: 'https://abgroups.in',
    siteName: 'AB Groups',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AB Groups — Surat Property & Services',
    description:
      'Property consulting, home loans, interior design and digital marketing in Surat, Gujarat.',
  },
  metadataBase: new URL('https://abgroups.in'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/logo-mark-dark.png" />
        <link rel="apple-touch-icon" href="/logo-mark-dark.png" />
        <meta name="theme-color" content="#030305" />
      </head>
      <body>
        {/* Film grain overlay — gives cinematic depth over all sections */}
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
