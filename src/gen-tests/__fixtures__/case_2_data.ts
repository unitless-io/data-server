import { GenerationUnit } from '@app/index';

export const data: GenerationUnit = {
  importPath: '@app/src/utils/append-if',
  importName: 'appendIf',
  testsData: [
    {
      args: [false, 'any', 'thing'],
      result: 'any',
    },
    {
      args: [true, 'any', 'thing'],
      result: 'anything',
    },
    {
      args: [true, 'any', undefined],
      result: 'anyundefined',
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
