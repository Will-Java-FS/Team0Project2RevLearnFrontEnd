import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	// Base JavaScript Configuration
	js.configs.recommended,

	// TypeScript Configuration
	{
		files: ["**/*.{ts,tsx}"],
		ignores: ["dist"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: "module",
			globals: globals.browser,
			parserOptions: {
				project: "./tsconfig.app.json" // Use the correct path to your TypeScript configuration
			}
		},
		settings: {
			react: { version: "detect" }
		},
		plugins: {
			"@typescript-eslint": tseslint,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			react
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true }
			],
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...tseslint.configs.recommended.rules,
			...tseslint.configs["recommended-requiring-type-checking"].rules
		}
	}
];
