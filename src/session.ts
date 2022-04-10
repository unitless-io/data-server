import session from 'express-session';
import MongoStore from 'connect-mongo';

import { DEV, SESSION_SECRET, DB_CONNECTION_URL } from '@app/config';

const sessionParser = session({
  secret: SESSION_SECRET,
  store: new MongoStore({ mongoUrl: DB_CONNECTION_URL }),
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: { secure: !DEV },
});

export const getSessionParser = () => sessionParser;
