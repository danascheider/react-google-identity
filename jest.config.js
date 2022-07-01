export default {
  clearMocks: true,
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    './test-utils/jsdom-setup.js'
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^.+\\.css$': __dirname + '/test-utils/style-mock.js',
  },
}