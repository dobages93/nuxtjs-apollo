module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true
  },
  extends: [
    "airbnb-base",
    "prettier"
  ],
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {
    // "comma-dangle": ["error", "only-multiline"],
    // "function-paren-newline": ["error", "consistent"],
    "no-shadow": ["error", { "allow": ["state"] }],
    "no-param-reassign": ["error", { "ignorePropertyModificationsFor": ["state"] }],
    // "quotes": ["error", "double"]
  },
  globals: {}
};
