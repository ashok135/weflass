import './globals.css';

export const metadata = {
  title: 'WeFlass — Digital Growth Agency',
  description: 'WeFlass helps creators, businesses and personal brands grow through social media, content, influencer marketing and performance advertising.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: '#101114',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}
