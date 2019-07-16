module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/strongly-recommended',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    rules: {
        'class-methods-use-this': 0,
        'func-names': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'implicit-arrow-linebreak': 'off',
        'operator-linebreak': ['error', 'before'],
        'no-use-before-define': ['error', { functions: false }],
        'no-param-reassign': ['error', { props: false }],
        'lines-between-class-members': 'off',
        'space-before-function-paren': 'off',
        'max-len': [2, { code: 120 }],
        'no-bitwise': 'off',
        'vue/script-indent': ['error', 4, { baseIndent: 1 }],
        'vue/html-indent': ['error', 4],
        'vue/html-closing-bracket-newline': ['error', {
            multiline: 'never',
        }],
        'vue/max-attributes-per-line': ['error', {
            multiline: {
                max: 1,
                allowFirstLine: true,
            },
        }],
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
        {
            files: ['*.d.ts'],
            rules: {
                'import/export': 'off',
            },
        },
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            jsx: false,
        },
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: require.resolve('@vue/cli-service/webpack.config.js'),
            },
        },
    },
};
