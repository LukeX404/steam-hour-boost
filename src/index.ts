import fs from 'fs';
import path from 'path';
import { Config } from './types';
import { login } from './steamFunctions';

const configPath = path.resolve(process.cwd(), 'config.json');

if (!fs.existsSync(configPath)) {
  console.error(`🔴 Configuration file not found at: ${configPath}`);
  console.error('👉 Please copy "config.example.json" to "config.json" and fill in your account details.');
  process.exit(1);
}

let config: Config;

try {
  const rawData = fs.readFileSync(configPath, 'utf-8');
  config = JSON.parse(rawData);
} catch (error) {
  console.error('🔴 Error reading or parsing "config.json":', error);
  process.exit(1);
}

if (!config.accounts || !Array.isArray(config.accounts) || config.accounts.length === 0) {
  console.error('🔴 No accounts configured in "config.json". Please add at least one account.');
  process.exit(1);
}

console.log(`🤖 Starting Steam Hour Boost for ${config.accounts.length} account(s)...`);
config.accounts.forEach(login);