import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser, // הגדרת globals לבחירת המודל הנכון
        module: "readonly", // מאפשר שימוש ב-ESModules
      },
      parserOptions: {
        ecmaVersion: 2018, // הגדרת הגרסה של ECMAScript
        sourceType: "module", // מאפשר שימוש ב-ESModules
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // מאפשר ל-ESLint לזהות את גרסת React
      },
    },
  },
];
