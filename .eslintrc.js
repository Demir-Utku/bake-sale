// eslint-disable-next-line no-undef
module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            ecmaVersion: 8,
            experimentalObjectRestSpread: true,
            jsx: true,
            tsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react', 'react-native'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'no-undef': ['error'],
        'no-console': ['off'],
        'no-unused-vars': ['warn'],
        'react/prop-types': ['warn'],
        'react-native/no-unused-styles': ['warn'],
        'react-native/split-platform-components': ['warn'],
        'react-native/no-inline-styles': ['warn'],
        'react-native/no-color-literals': ['off'],
        'max-len': ['error', { code: 80, tabWidth: 4 }],
        'object-curly-newline': ['off', 'never'],
    },
    settings: {
        react: {
            version: 'latest',
        },
    },
};
