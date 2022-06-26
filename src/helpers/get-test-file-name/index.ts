import compose from 'ramda/src/compose';
import split from 'ramda/src/split';
import replace from 'ramda/src/replace';
import last from 'ramda/src/last';
// import

export const getTestFileName = (filePath: string, functionName: string) => compose(
  replace(/\.([jt]sx?)$/g, `-${functionName}.test.$1`),
  last,
  split('/'),
)(filePath);
