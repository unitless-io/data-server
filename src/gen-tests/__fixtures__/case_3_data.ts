import { GenerationUnit } from '../index';

export const data: GenerationUnit = {
  importPath: '@app/src/utils/something-cool',
  testsData: [
    {
      args: JSON.stringify([true, 43, { forSure: 'some' }]),
      result: JSON.stringify(undefined),
    },
    {
      args: JSON.stringify([false, null, ['or not null']]),
      result: JSON.stringify('anything'),
    },
  ],
};

export const expected = `import somethingCool from '@app/src/utils/something-cool';

describe('somethingCool', () => {
  it('case 1', () => {
    expect(somethingCool(true, 43, {'forSure': 'some'})).toEqual(undefined);
  });

  it('case 2', () => {
    expect(somethingCool(false, null, ['or not null'])).toEqual('anything');
  });
});
`;
