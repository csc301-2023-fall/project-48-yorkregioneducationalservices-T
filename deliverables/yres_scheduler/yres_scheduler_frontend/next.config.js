/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,  
        fs: false,
      };
      config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work
      return config;
    },
    experimental: {
      forceSwcTransforms: true,
    },
  };

module.exports = nextConfig
