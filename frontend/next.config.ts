import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "export",
    reactCompiler: true,
    allowedDevOrigins: ["wails.localhost"]
};

export default nextConfig;
