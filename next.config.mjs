/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "lh3.googleusercontent.com" },
            {protocol: "https", hostname: "utfs.io"},
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
