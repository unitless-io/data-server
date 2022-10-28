import cases from './__fixtures__';
import generator from './index';

describe('Unit tests generator', () => {
  it.each(cases)('case %#', (data, expected) => {
    return expect(generator(data)).resolves.toBe(expected);
  });
});
