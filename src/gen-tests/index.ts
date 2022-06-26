import { compose, isNil, last, replace, split, toUpper } from 'ramda';
import ejs from 'ejs';

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

const renderFile = (path: string, data: any) =>
  new Promise<string>((resolve) => ejs.renderFile(path, data, (err, result) => resolve(result)));

const implementationByFramework = {
  [Frameworks.Jest]: async ({ importPath, importName, testsData }: GenerationUnit) => {
    const isDefaultImport = isNil(importName);
    const functionName = isDefaultImport ? (compose(toCamel, last, split('/'))(importPath) as string) : importName;
    const testCases = testsData.map(({ args, result }) => ({
      args: args.replace(/"/g, "'"),
      result: result.replace(/"/g, "'"),
    }));

    // TODO: add data mocking
    return await renderFile('./src/gen-tests/templates/unit-test.ejs', { functionName, importPath, isDefaultImport, testCases });
  },
};

const generateUnitTest = async (unit: GenerationUnit, framework: Frameworks = Frameworks.Jest) =>
  implementationByFramework[framework](unit);

export default generateUnitTest;
