/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/**
 * jest.config.js
 */

// Configurations for Jest testing
module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/**/tests/**/*.test.(ts|tsx|js)",
  ],
};
