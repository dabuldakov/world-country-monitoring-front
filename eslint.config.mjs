import { defineConfig } from 'eslint-define-config';
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  // Base ESLint recommended config
  js.configs.recommended,

  // React configuration
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: pluginReact
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        process: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off'
    }
  },

  // Custom rules
  {
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  }
]);