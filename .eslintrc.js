module.exports = {
  extends: ["next/core-web-vitals", "plugin:prettier/recommended"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error", { singleQuote: true, semi: false }],
  },
};
