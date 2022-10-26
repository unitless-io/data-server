import { FunctionType } from '@app/constants';

export interface Function {
  name: string;
  fileId: string;
  type: FunctionType;
  contentChangedAt: Date | null;
}
