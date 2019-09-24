module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier', 'vue'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'prefer-template': 'error',
    'key-spacing': ['error', { mode: 'minimum' }],
    'eol-last': ['error', 'always'],
  },
  globals: {
    jest: true,
    expect: true,
    mockFn: true,
    config: true,
    afterEach: true,
    beforeEach: true,
    afterAll: true,
    beforeAll: true,
    describe: true,
    it: true,
    xdescribe: true,
    xit: true,
  },
}
