const prettierOptions = require("./.prettierrc.js")
delete prettierOptions.plugins
module.exports = {
  root: true,
  plugins: ["@tanstack/query"],
  extends: [
    "next/core-web-vitals",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ],
  rules: {
    "prettier/prettier": ["warn", prettierOptions],
    "react-hooks/rules-of-hooks": "off",
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", ".jsx"],
      parser: "@typescript-eslint/parser"
    }
  ]
}
