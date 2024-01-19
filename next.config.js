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
  },
  
  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  }
}

module.exports = nextConfig;