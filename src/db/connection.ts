import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const databaseUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;


const client = createClient({ 
  url: databaseUrl!,
  authToken: authToken!,
});

export const db = drizzle({ client });
