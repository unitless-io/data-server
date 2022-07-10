import { GenerationUnit } from '../index';

export const data: GenerationUnit = {
  importPath: '@app/src/utils/append-if',
  importName: 'appendIf',
  testsData: [
    {
      args: JSON.stringify([false, 'any', 'thing']),
      result: JSON.stringify('any'),
    },
  ],
};

export const expected = `import { appendIf } from '@app/src/utils/append-if';

describe('appendIf', () => {
  it('case 1', () => {
    expect(appendIf(false, 'any', 'thing')).toEqual('any');
  });
});
`;
