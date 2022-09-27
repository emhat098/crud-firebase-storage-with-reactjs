/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_API_KEY: 'AIzaSyAI9aGz205_8MaNHUHedfWnAtZpJtSDI9k',
    GOOGLE_AUTH_DOMAIN: 'fir-c396a.firebaseapp.com',
    GOOGLE_PROJECT_ID: 'fir-c396a',
    GOOGLE_STORAGE_BUCKET: 'fir-c396a.appspot.com',
    MESSAGING_SENDER_ID: '323956991408',
    GOOGLE_APP_ID: '1:323956991408:web:af29bca4db26df9970e275',
    GOOGLE_MEASUREMENT_ID: 'G-GF6DEG49XV',
  },
};

module.exports = nextConfig;
