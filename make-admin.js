const db = require('./db');

const email = process.argv[2];
if (!email) {
  console.log('Usage: node make-admin.js your@email.com');
  process.exit(1);
}

const result = db
  .prepare("UPDATE users SET role = 'admin' WHERE email = ?")
  .run(email.trim().toLowerCase());

if (result.changes === 1) {
  console.log('Done. ' + email + ' is now an admin.');
} else {
  console.log('No user with that email.');
}
