/** @format */

const nextConfig = {
  reactStrictMode: true,

  // 🛡️ TERMUX & WASM OPTIMIZATIONS
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    memoryBasedWorkersCount: true,
    cpus: 1,
    workerThreads: false,
  },

  // 🔧 WEBPACK CUSTOMIZATION
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
