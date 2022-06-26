import { data as data1, expected as expected1 } from './case_1_data';
import { data as data2, expected as expected2 } from './case_2_data';
import { data as data3, expected as expected3 } from './case_3_data';
import { GenerationUnit } from '../index';

export default [
  [data1, expected1],
  [data2, expected2],
  [data3, expected3],
] as [GenerationUnit, string][];
