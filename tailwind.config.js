/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: 'var(--gt-primary-color-rgb)',
      },
      boxShadow: {
        'sd-b': '0px 1px 5px #394056',
        'my-unique-shadow': '5px 5px 10px rgba(100, 0, 200, 0.3)',
        // Thêm các đổ bóng tùy chỉnh khác của bạn ở đây
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
};
