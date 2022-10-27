import { FunctionType } from '@app/constants';

export interface Function {
  name: string;
  type: FunctionType;
  contentChangedAt: Date;
}
