import { FunctionType } from '@app/constants';

export interface Function {
  _id: string;
  name: string;
  fileId: string;
  type: FunctionType;
  contentChangedAt: Date | null;
}
