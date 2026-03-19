import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub project Pages: set BASE_PATH=/<repo-name>/ in CI (see .github/workflows/pages.yml).
const base = process.env.BASE_PATH?.replace(/\/?$/, '/') ?? '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
