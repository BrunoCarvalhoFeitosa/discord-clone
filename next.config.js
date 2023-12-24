/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        })

        return config
    },
    images: {
        domains: [
            "uploadthing.com",
            "utfs.io"
        ]
    }
}
  
module.exports = nextConfig