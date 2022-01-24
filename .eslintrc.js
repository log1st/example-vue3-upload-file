module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: [
    "vue",
    "@typescript-eslint",
    "json5",
  ],
  rules: {
    "import/no-unresolved": [0],
    "import/no-extraneous-dependencies": [0],
    "import/prefer-default-export": [0],
    "import/extensions": [0],
    quotes: [1, "double"],
    "vue/multi-word-component-names": [0],
    "vue/require-default-prop": [0],
  },
};
