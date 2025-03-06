const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Define paths
const envPath = path.join(__dirname, '.env');

// Generate a random secret for NextAuth
const nextAuthSecret = crypto.randomBytes(32).toString('hex');

// Create or update .env file
try {
  const envContent = `DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="${nextAuthSecret}"
NEXTAUTH_URL="http://localhost:3000"`;

  // Write to the file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully');
} catch (error) {
  console.error('Error creating .env file:', error);
}
