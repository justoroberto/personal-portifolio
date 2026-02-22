import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FirebaseAnalytics from '@/components/FirebaseAnalytics/FirebaseAnalytics';
import { ThemeProvider } from '@/context/ThemeContext';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon.svg',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <body>
        <FirebaseAnalytics />
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="page-content">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
