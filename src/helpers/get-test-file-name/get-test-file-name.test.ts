import { getTestFilePath } from './index';

const casesForFormats = [
  ['src/utils/math.js', 'sum', 'math-sum.test.js', '.js'],
  ['src/utils/math.ts', 'sum', 'math-sum.test.ts', '.ts'],
  ['src/utils/math.jsx', 'sum', 'math-sum.test.jsx', '.jsx'],
  ['src/utils/math.tsx', 'sum', 'math-sum.test.tsx', '.tsx'],
];

describe('get test file path', () => {
  it.each(casesForFormats)('handles %1 files', (path, funcName, expected) => {
    expect(getTestFilePath(path, funcName)).toBe(expected);
  });
});

// TODO: add test cases after implementation
const casesForIndexFiles = [
  ['src/utils/math/index.js', 'sumIf', 'sum-if.test.js'],
  ['index.ts', 'sumIf', 'sum-if.test.ts'],
];
