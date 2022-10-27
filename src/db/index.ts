import { File, Function, Call } from '@app/types';
import { FunctionType } from '@app/constants';

export const filesByIdMap: Record<string, File> = {
  'some-hash-1': {
    _id: 'some-hash-1',
    path: 'src/utils/super-function.js',
  },
  'some-hash-2': {
    _id: 'some-hash-2',
    path: 'src/utils/for-test.js',
  },
};

export const functionsByFileMap: Record<string, Record<string, Function>> = {
  'some-hash-1': {
    superFunction: {
      type: FunctionType.Arrow,
      name: 'superFunction',
      contentChangedAt: new Date(),
    },
    getSuperType: {
      type: FunctionType.Arrow,
      name: 'getSuperType',
      contentChangedAt: new Date(),
    },
  },
  'some-hash-2': {
    forTest: {
      type: FunctionType.Arrow,
      name: 'forTest',
      contentChangedAt: new Date(),
    },
  },
};

export const getFunctionId = ({ fileId, funcName }: { fileId: string; funcName: string }) => `${fileId}:${funcName}`;

export const callsByFunctionMap: Record<string, Record<string, Call>> = {
  'some-hash-1:superFunction': {
    '01': {
      _id: '01',
      args: '[undefined,{"type":"@@redux\u002FPROBE_UNKNOWN_ACTION5.6.h.j.9.d"}]',
      result: '{"isOpen":[],"fontFamily":"\'Roboto\', sans-serif","borderRadius":12,"opened":true}',
      createdAt: new Date(),
    },
    '02': {
      _id: '02',
      args: '[{"isOpen":[],"fontFamily":"\'Roboto\', sans-serif","borderRadius":12,"opened":true},{"type":"@customization\u002FSET_FONT_FAMILY","fontFamily":"\'Poppins\', sans-serif"}]',
      result: '{"isOpen":[],"fontFamily":"\'Poppins\', sans-serif","borderRadius":12,"opened":true}',
      createdAt: new Date(),
    },
  },
};
