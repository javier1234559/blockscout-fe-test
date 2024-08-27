const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['vi', 'en'],
    localeDetection: false
  },
  defaultNS: 'common',
  reloadOnPrerender: process.env.NEXT_PUBLIC_APP_ENV === 'development',
  localePath: path.resolve('./public/locales'),
  fallbackLng: ['en'],
  reactStrictMode: true,
  debug: process.env.NEXT_PUBLIC_APP_ENV === 'development',
};