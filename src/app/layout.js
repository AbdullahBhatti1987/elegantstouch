import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { Toaster } from 'react-hot-toast';

import { connectDB } from '@/lib/mongodb';
import Setting from '@/models/Setting';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata = {
//   title: 'Elegant Touch',
//   description: '...',
// };

// GET SETTINGS FROM DATABASE
async function getSettings() {
  try {
    await connectDB();

    const settings = await Setting.findOne().lean();

    return settings || {};
  } catch (error) {
    console.log('Settings Error:', error);

    return {};
  }
}

// DYNAMIC SEO

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  const settings = await getSettings();

  return {
    title: settings.metaTitle || 'Elegant Touch',

    description:
      settings.metaDescription ||
      'Premium Hair & Jewellery Accessories',

    keywords: settings.metaKeywords || '',

    icons: {
      icon: settings.favicon || '/favicon.ico',
    },

    openGraph: {
      title: settings.metaTitle || 'Elegant Touch',

      description: settings.metaDescription || '',

      images: [settings.logo || '/logo.png'],
    },

    metadataBase: new URL('http://localhost:3000'),
    // metadataBase: new URL('https://www.elegantstouch.com')

    title: {
      default: 'Elegant Touch',
      template: '%s | Elegant Touch',
    },

    description:
      'Premium hair accessories and jewellery for girls and kids.',
  };
}
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// export const metadata = {
//   title: 'Elegant Touch',
//   description: 'Premium Hair & Jewellery Accessories',
// };

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning={true}
      // type={
      //   typeof window === 'undefined'
      //     ? 'text/javascript'
      //     : 'text/plain'
      // }
      // hydrationWarning={false}
      // name="google-site-verification"
      // content="xxxxxxxxxxx"
    >
      <head>
        {/* Google Verification */}

        {settings.googleVerificationCode && (
          <meta
            name="google-site-verification"
            content={settings.googleVerificationCode}
          />
        )}

        {/* Bing Verification */}

        {settings.bingVerificationCode && (
          <meta
            name="msvalidate.01"
            content={settings.bingVerificationCode}
          />
        )}

        {/* Google Analytics */}

        {settings.googleAnalyticsId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
          />
        )}

        {settings.googleAnalyticsId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `

                window.dataLayer = window.dataLayer || [];

                function gtag(){
                  dataLayer.push(arguments);
                }

                gtag(
                  'js',
                  new Date()
                );


                gtag(
                  'config',
                  '${settings.googleAnalyticsId}'
                );

                `,
            }}
          />
        )}

        {/* Google Tag Manager */}

        {settings.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `

                (function(w,d,s,l,i){

                w[l]=w[l]||[];

                w[l].push({
                  'gtm.start':
                  new Date().getTime(),
                  event:'gtm.js'
                });

                var f=d.getElementsByTagName(s)[0],

                j=d.createElement(s),

                dl=l!='dataLayer&l='+l:'';

                j.async=true;

                j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;

                f.parentNode.insertBefore(j,f);

                })(window,document,'script','dataLayer','${settings.googleTagManagerId}');

                `,
            }}
          />
        )}
      </head>

      <body
        className="text-textcolor min-h-screen"
        cz-shortcut-listen="true"
      >
        <CartProvider>
          <WishlistProvider>
            <MainLayout>{children}</MainLayout>
            <Toaster
              position="top-right"
              reverseOrder={false}
              containerStyle={{
                top: '80px',
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
