import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // needed for React testing
    globals: true,         // enables describe/test/expect without imports
    setupFiles: "./src/setupTests.js", // optional
    coverage: {
      provider: 'istanbul',     // Use Istanbul for coverage
      reporter: ['text', 'html'], // Text in console + HTML report
      reportsDirectory: './coverage', // Output folder for HTML report
    },
  },
})
