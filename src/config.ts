export const DEV = process.env.NODE_ENV !== 'production';

export const PORT = process.env.PORT || '4000';

export const APP_HOST = process.env.APP_HOST || 'localhost:3000';
export const APP_PROTOCOL = process.env.APP_PROTOCOL || 'http';
export const APP_URL = `${APP_PROTOCOL}://${APP_HOST}`;

export const DB_HOST = process.env.DB_HOST || 'unitless.da3jv.mongodb.net';
export const DB_USER = process.env.DB_USER || 'unitless';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'KIbR0sZwGq9TPgJe';
export const DB_DATABASE = process.env.DB_DATABASE || 'unitless';
export const DB_CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;

export const SESSION_SECRET = process.env.SESSION_SECRET || 'dev';

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || '906330349516-hrgnb3vnkdldarmtge623p17pf9j915s.apps.googleusercontent.com';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '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';
export const GOOGLE_REDIRECT_DOMAIN = process.env.GOOGLE_REDIRECT_DOMAIN || 'http://localhost:4000';

export const PAYSERA_PROJECT_ID = process.env.PAYSERA_PROJECT_ID || '232201';
export const PAYSERA_SIGN_PASSWORD = process.env.PAYSERA_SIGN_PASSWORD || '582acb16fad542bca597ccb805629749';
