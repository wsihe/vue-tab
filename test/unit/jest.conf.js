const path = require('path')
module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: ['js', 'json', 'vue'],
  // 支持源代码中相同的 `@` -> `src` 别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^api(.*)$': '<rootDir>/src/api$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',  // 用 `babel-jest` 处理 js
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
};
