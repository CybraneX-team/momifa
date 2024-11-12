module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms', 'prettier'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/no-implicit-any-catch': ['warn'],
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}