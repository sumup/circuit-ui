module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Node', 'Browser'],
    frameworks: ['React', 'Emotion', 'Jest'],
    openSource: true,
  },
  {
    overrides: [
      {
        files: ['**/*.{ts,tsx}'],
        parserOptions: {
          project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
          tsconfigRootDir: __dirname,
        },
      },
      {
        files: ['packages/circuit-ui/**/*'],
        rules: {
          // The custom JSX pragma is required to make Emotion's css prop
          // work with TypeScript.
          'emotion/jsx-import': 'error',
        },
      },
      {
        files: [
          'packages/circuit-ui/cli/migrate/__testfixtures__/**/*.{input,output}.*',
        ],
        rules: {
          'react/prop-types': 'off',
          'no-unused-vars': 'off',
          'import/no-unresolved': 'off',
          'import/no-extraneous-dependencies': 'off',
          'notice/notice': 'off',
          '@typescript-eslint/no-unused-vars': 'off',
          'prettier/prettier': 'off',
        },
      },
      {
        files: [
          'packages/circuit-ui/cli/migrate/*.ts',
          'packages/circuit-ui/cli/migrate/utils/*.ts',
        ],
        rules: {
          // jscodeshift expects no return value for files
          // that should not be transformed.
          'consistent-return': 'off',
          'no-console': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-explicit-any': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
        },
      },
      {
        files: ['packages/icons/scripts/**/*'],
        rules: {
          'import/no-extraneous-dependencies': 'off',
          'node/no-unpublished-require': 'off',
        },
      },
    ],
  },
);
