import 'express-session';

import { UserSession } from './user';

declare module 'express-session' {
  interface SessionData extends UserSession {
    fulfilledBackUrl?: string | string[] | any;
  }
}
