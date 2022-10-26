import { NextFunction, Request, Response } from 'express';
import { propIs } from 'ramda';

function queryValidationFactory<T>(params: (keyof T)[]) {
  return (req: Request<{}, any, any, Partial<T>>, res: Response, next: NextFunction) => {
    const missingQuery = params.reduce<(keyof T)[]>((acc, queryParameter) => {
      if (!propIs(String, queryParameter, req.query)) {
        acc.push(queryParameter);
      }

      return acc;
    }, []);

    if (missingQuery.length > 0) {
      throw new Error(`Query parameter(s) ${missingQuery.join(', ')} are required but not provided.`);
    }

    next();
  };
}

export default queryValidationFactory;
