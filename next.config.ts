import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pandascore.co',
                port: '',
            },
        ]
    }
};

export default nextConfig;
