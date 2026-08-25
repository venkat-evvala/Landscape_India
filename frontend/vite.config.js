import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite is the tool that runs your React app locally with instant reload,
// and bundles it into optimized files when you're ready to deploy.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
