import { GenerationUnit } from '../index';

export const data: GenerationUnit = {
  importPath: '@app/src/utils/append-if',
  importName: 'appendIf',
  testsData: [
    {
      args: JSON.stringify([false, 'any', 'thing']),
      result: JSON.stringify('any'),
    },
    {
      args: JSON.stringify([true, 'any', 'thing']),
      result: JSON.stringify('anything'),
    },
    {
      args: JSON.stringify([true, 'any', undefined]),
      result: JSON.stringify('anyundefined'),
    },
  ],
};

export const expected = `import { appendIf } from '@app/src/utils/append-if';

describe('appendIf', () => {
  it('case 1', () => {
    expect(appendIf(false, 'any', 'thing')).toEqual('any');
  });

  it('case 2', () => {
    expect(appendIf(true, 'any', 'thing')).toEqual('anything');
  });

  it('case 3', () => {
    expect(appendIf(true, 'any', undefined)).toEqual('anyundefined');
  });
});
`;
