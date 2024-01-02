/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        { loader: 'babel-loader', options: {} },
        {
          loader: '@mdx-js/loader',
          options: {}
        }
      ]
    });

    return config;
  }
}

module.exports = nextConfig;