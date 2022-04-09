import 'passport';

import { UserDocument } from './user';

// WORKAROUND TODO: Remove when the connect-mongo types are updated
declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
