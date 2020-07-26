module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:mithril/recommended'
    ],
    plugins: [
        'prettier',
        '@typescript-eslint'
    ],
    rules: {}
}