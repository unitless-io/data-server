import { compose, split, replace, last } from 'ramda';

export const getTestFileName = (filePath: string, functionName: string) =>
  compose(replace(/\.([jt]sx?)$/g, `-${functionName}.test.$1`), last, split('/'))(filePath);
