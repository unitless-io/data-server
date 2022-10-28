/* eslint-disable */
import { GenerationUnit } from '../index';

export const data: GenerationUnit = {
  importPath: '@app/src/utils/something-cool',
  testsData: [
    {
      args: "[true, 43, { 'forSure': 'some' }]",
      result: "undefined",
    },
    {
      args: "[false, null, ['or not null']]",
      result: "'anything'",
    },
  ],
};

export const expected = `import somethingCool from '@app/src/utils/something-cool';

describe('somethingCool', () => {
  it('case 1', () => {
    expect(somethingCool(true, 43, { 'forSure': 'some' })).toEqual(undefined);
  });

  it('case 2', () => {
    expect(somethingCool(false, null, ['or not null'])).toEqual('anything');
  });
});
`;
