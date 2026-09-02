/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "verde-profundo": "#1A2E1A",
        "verde-musgo": "#2E4A2E",
        "dourado-metalico": "#C9A24B",
        "dourado-claro": "#E8CC8A",
        "vermelho-destaque": "#C0392B",
        "vermelho-suave": "#E74C3C",
        "branco-gelo": "#F0F4F0",
        "off-white": "#F5F1E8"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
}
