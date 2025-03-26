/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/a/**'
            },
            {
                protocol: 'https',
                hostname: 'timelyapp-prod.s3.us-west-2.amazonaws.com',
                port: '',
                pathname: '/images/**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/a/**'
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb'
        }
    },
    // Explicitly exclude _not-found path from static generation
    skipTrailingSlashRedirect: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    // This custom rewrites configuration helps avoid issues with _not-found page
    async rewrites() {
        return {
            beforeFiles: [
                // Handle any remaining _not-found references by redirecting to the root not-found
                {
                    source: '/_not-found',
                    destination: '/404'
                }
            ]
        };
    }
};

module.exports = nextConfig;
