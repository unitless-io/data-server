import mongoose, { DocumentDefinition, UpdateQuery, AnyKeys } from 'mongoose';

export type Controller<T> = {
  findAll(query?: mongoose.FilterQuery<T>, properties?: string[], include?: boolean): Promise<DocumentDefinition<T>[]>;
  findOne(
    query: string | mongoose.FilterQuery<T> | mongoose.Types.ObjectId,
    properties?: string[],
    include?: boolean
  ): Promise<DocumentDefinition<T> | null>;
  create(doc: AnyKeys<T>): Promise<T>;
  upsert(
    query: string | mongoose.FilterQuery<T> | mongoose.Types.ObjectId,
    updateProperties: UpdateQuery<T>
  ): Promise<DocumentDefinition<T> | null>;
  update(
    query: string | mongoose.FilterQuery<T> | mongoose.Types.ObjectId,
    updateProperties: UpdateQuery<T>
  ): Promise<DocumentDefinition<T> | null>;
  remove(id: string | mongoose.Types.ObjectId): Promise<T | null>;
  getCount(criteria?: mongoose.FilterQuery<T>): Promise<number>;
  exists(query: string | mongoose.FilterQuery<T> | mongoose.Types.ObjectId): Promise<boolean>;
};
