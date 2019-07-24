module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  // verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/**'],
  roots: ['<rootDir>/test/'],
  testMatch: ['<rootDir>/test/**/*.(test|base).(js|ts)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [], // 不能忽略
};
