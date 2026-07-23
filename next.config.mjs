/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fijamos la raíz del proyecto (hay otro lockfile en la carpeta padre).
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
