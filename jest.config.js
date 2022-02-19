/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/**
 * jest.config.js
 */

// Configurations for Jest testing
export default {
  preset: "ts-jest",
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/**/tests/**/*.test.ts",
    "**/tests/**/*.+(ts|tsx|js)"
  ],
};
