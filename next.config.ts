import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  // Use empty fallback if REPLIT_DOMAINS isn't defined
  allowedDevOrigins: [(env.REPLIT_DOMAINS || '').split(',')[0]],
};

module.exports = nextConfig;
