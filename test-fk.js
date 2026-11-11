const db = require('./db');

try {
  db.prepare(
    'INSERT INTO orders (customerId, bookTitle, author, totalPrice, status) VALUES (?, ?, ?, ?, ?)'
  ).run(999, 'The Hobbit', 'J.R.R. Tolkien', 450.00, 'Pending');
  console.log('Row was saved. The relationship is NOT protected.');
} catch (err) {
  console.log('Blocked:', err.message);
}
