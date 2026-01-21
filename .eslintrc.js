module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },

      parserOptions: {
        sourceType: 'script'
      },
      files: ['*.tsx', '*.ts']
    }
    // {
    //   files: [
    //     "src/components/PdfViewer/**/*.ts",
    //     "src/components/PdfViewer/**/*.tsx",
    //     "src/components/DocumentEditor/**/*.ts",
    //     "src/components/DocumentEditor/**/*.tsx",
    //   ],
    //   rules: {
    //     "no-unused-vars": "off",
    //     "@typescript-eslint/no-unused-vars": "off",
    //   },
    // },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.ts', '.d.ts', '.tsx'] }
    },

    react: {
      version: 'detect'
    },

    'import/ignore': ['node_modules', '.eslintrc']
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  ignorePatterns: [
    'vite.config.js',
    'commitlint.config.js',
    'tailwind.config.js',
    '**/vendor/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/public/**',
    '**/src/components/PdfViewer/**',
    '**/src/components/DocumentEditor/**',
    '.eslintrc.js'
  ],
  rules: {
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // any
    'no-debugger': 'error',
    'react/prop-types': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // setup()
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: true,
        trailingComma: 'none',
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true,
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ]
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_'
    //   }
    // ]
  }
};
