import { compose, isNil, last, replace, split, toUpper } from 'ramda';
import ejs from 'ejs';
import path from 'path';

export enum Frameworks {
  Jest = 'jest',
}

export interface GenerationUnit {
  importPath: string;
  importName?: string | null;
  testsData: { args: string; result: string }[];
}

// @ts-ignore
const toCamel: (string) => string = replace(/([-_][a-z])/gi, compose(toUpper, last));

const renderFile = (filePath: string, data: any) =>
  new Promise<string>((resolve) =>
    ejs.renderFile(path.resolve(__dirname, '../../', filePath), data, (err, result) => resolve(result))
  );

const implementationByFramework = {
  [Frameworks.Jest]: async ({ importPath, importName, testsData }: GenerationUnit) => {
    const isDefaultImport = isNil(importName);
    const functionName = isDefaultImport ? (compose(toCamel, last, split('/'))(importPath) as string) : importName;
    const testCases = testsData.map(({ args, result }) => ({
      args: args.substring(1, args.length - 1),
      result,
    }));

    // ToDo: add data mocking
    return await renderFile('./templates/unit-test.ejs', {
      functionName,
      importPath,
      isDefaultImport,
      testCases,
    });
  },
};

const generateUnitTest = async (unit: GenerationUnit, framework: Frameworks = Frameworks.Jest) =>
  implementationByFramework[framework](unit);

export default generateUnitTest;
