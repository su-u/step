module.exports = {
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|ts)$'],
    watchPathIgnorePatterns: ['node_modules'],
    moduleNameMapper: {
        '^@/(.+)': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'js'],
    moduleDirectories: ['node_modules'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json',
        },
    },
    testMatch: [
        '**/src/__tests__/**/*.test.ts'
    ],
    collectCoverageFrom: [
        "*src/**/*.ts",
    ]
};