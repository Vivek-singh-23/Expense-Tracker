import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://neondb_owner:cIXEfA8iV1WU@ep-withered-feather-a53vs94y.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require');
const db = drizzle(sql, {schema});