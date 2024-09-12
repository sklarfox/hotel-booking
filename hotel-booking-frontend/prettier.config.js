/** @type {import('prettier').Config} */
export default {
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss'],
  // tailwindcss
  tailwindAttributes: ['theme'],
  tailwindFunctions: ['twMerge', 'createTheme'],
}
