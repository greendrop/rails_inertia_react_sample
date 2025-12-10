import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import ViteRails from "vite-plugin-rails"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteRails({
      envVars: {
        RAILS_ENV: process.env.RAILS_ENV || "development",
      },
      fullReload: {
        additionalPaths: [
          "app/frontend/**/*",
          "app/views/**/*",
          "config/routes.rb",
        ],
        delay: 300,
      },
    }),
  ],
})
