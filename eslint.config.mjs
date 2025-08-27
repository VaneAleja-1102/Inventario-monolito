// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended, // reglas base de JS
  ...tseslint.configs.recommended, // reglas para TypeScript
  prettier, // desactiva reglas que chocan con Prettier

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
