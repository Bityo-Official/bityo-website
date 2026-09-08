import next from 'eslint-config-next/core-web-vitals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...next,
];
