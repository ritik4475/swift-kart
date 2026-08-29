import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable');
  process.exit(1);
}

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  process.exit(1);
}

// Extract host from Supabase URL
const urlObj = new URL(supabaseUrl);
const host = urlObj.hostname;
const projectRef = host.split('.')[0];

// Create PostgreSQL connection
const client = new pg.Client({
  host: `db.${projectRef}.supabase.co`,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: serviceRoleKey,
  ssl: { rejectUnauthorized: false },
  family: 4 // Force IPv4
});

async function runMigrations() {
  try {
    console.log('Connecting to Supabase database...');
    await client.connect();
    console.log('✓ Connected to database');

    // Read migration file
    const migrationPath = path.join(__dirname, 'supabase/migrations/20260829060509_create_ecommerce_schema.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('Running migration: 20260829060509_create_ecommerce_schema.sql');
    
    // Execute the migration
    await client.query(migrationSQL);

    console.log('✓ Migration completed successfully');
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Failed to run migrations:', error.message);
    if (client) {
      await client.end();
    }
    process.exit(1);
  }
}

runMigrations();
