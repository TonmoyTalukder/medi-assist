/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Other configurations...
    env: {
        NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        NEXT_PUBLIC_HUGGINGFACE_TOKEN: process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN,
      },
  };
  
  export default nextConfig;
  