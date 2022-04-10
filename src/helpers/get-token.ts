import { nanoid } from 'nanoid';

import { User } from '@app/db';

export const getToken = async (): Promise<string> => {
  const token = nanoid(48);

  if (await User.exists({ appToken: token }).exec()) {
    return await getToken();
  }

  return token;
};
