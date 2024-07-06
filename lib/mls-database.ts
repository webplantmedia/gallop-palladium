import mysql from 'mysql2/promise';
import fs from 'fs';

function readFileContent(path) {
  if (!fs.existsSync(path)) {
    throw new Error(`File not found: ${path}`);
  }
  const content = fs.readFileSync(path, 'utf8');
  if (!content.startsWith('-----BEGIN')) {
    throw new Error(`Invalid PEM file: ${path}`);
  }
  return content;
}

const sslConfig = {
  ca: process.env.CA_FILE,
  // ca: readFileContent(process.env.ca),
  // key: readFileContent(process.env.key),
  // cert: readFileContent(process.env.cert),
  // rejectUnauthorized: false, // Ensure the server certificate is verified
};

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust according to your server's capability
  host: process.env.DOUGNEWBY_DB_HOST,
  user: process.env.DOUGNEWBY_DB_USER,
  password: process.env.DOUGNEWBY_DB_PASSWORD,
  database: process.env.DOUGNEWBY_DB_NAME,
  ssl: sslConfig,
});

export default pool;
