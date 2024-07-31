/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com"
      },
      {
        hostname: "localhost"
      },
      {
        hostname: "yt3.googleusercontent.com"
      }
    ]
  }
}

export default nextConfig
