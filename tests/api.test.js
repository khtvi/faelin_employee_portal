process.env.DB_FILE = ':memory:';
process.env.JWT_SECRET = 'test-secret-only-for-tests';
process.env.WEATHER_KEY = '';
process.env.DEMO_EMAIL = 'admin@faelinbooks.com';
process.env.DEMO_PASSWORD = 'test-admin-password-only';

const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../server');

let server;
let base;
let staffToken;
let adminToken;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  base = 'http://localhost:' + server.address().port;
});

after(() => {
  server.closeAllConnections();
  server.close();
});

async function call(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (options.token) {
    headers.Authorization = 'Bearer ' + options.token;
  }
  const res = await fetch(base + path, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    // response had no json body
  }
  return { status: res.status, data };
}

test('1. health route answers ok', async () => {
  const { status, data } = await call('/health');
  assert.strictEqual(status, 200);
  assert.strictEqual(data.status, 'ok');
  assert.strictEqual(data.message, 'Faelin Bookshop API is running');
});

test('2. customers list returns rows', async () => {
  const { status, data } = await call('/customers');
  assert.strictEqual(status, 200);
  assert.ok(Array.isArray(data));
  assert.ok(data.length >= 1);
});

test('3. get customer by id returns correct customer', async () => {
  const { status, data } = await call('/customers/1');
  assert.strictEqual(status, 200);
  assert.strictEqual(data.id, 1);
  assert.ok(data.name);
});

test('4. unknown customer gives 404', async () => {
  const { status, data } = await call('/customers/9999');
  assert.strictEqual(status, 404);
  assert.strictEqual(data.error, 'Customer not found');
});

test('5. unknown route gives a JSON 404', async () => {
  const { status, data } = await call('/nothing-here');
  assert.strictEqual(status, 404);
  assert.strictEqual(data.error, 'Route not found');
});

test('6. creating a customer without a token gives 401', async () => {
  const { status, data } = await call('/customers', {
    method: 'POST',
    body: { name: 'Unauthorized Tester', phone: '0900' },
  });
  assert.strictEqual(status, 401);
  assert.strictEqual(data.error, 'Please log in first');
});

test('7. register works and never returns the password', async () => {
  const { status, data } = await call('/auth/register', {
    method: 'POST',
    body: { name: 'Book Clerk', email: 'clerk@faelinbooks.com', password: 'clerkPassword123' },
  });
  assert.strictEqual(status, 201);
  assert.strictEqual(data.email, 'clerk@faelinbooks.com');
  assert.strictEqual(data.passwordHash, undefined);
  assert.strictEqual(data.password, undefined);
});

test('8. registering the same email again gives 409', async () => {
  const { status, data } = await call('/auth/register', {
    method: 'POST',
    body: { name: 'Book Clerk Duplicate', email: 'clerk@faelinbooks.com', password: 'clerkPassword123' },
  });
  assert.strictEqual(status, 409);
  assert.strictEqual(data.error, 'That email is already registered');
});

test('9. a short password gives 400', async () => {
  const { status, data } = await call('/auth/register', {
    method: 'POST',
    body: { name: 'Shorty', email: 'short@faelinbooks.com', password: '123' },
  });
  assert.strictEqual(status, 400);
  assert.strictEqual(data.error, 'password must be at least 8 characters');
});

test('10. bad email gives 400', async () => {
  const { status, data } = await call('/auth/register', {
    method: 'POST',
    body: { name: 'Bad Email', email: 'not-an-email', password: 'password123' },
  });
  assert.strictEqual(status, 400);
  assert.strictEqual(data.error, 'a valid email is required');
});

test('11. wrong password gives 401', async () => {
  const { status, data } = await call('/auth/login', {
    method: 'POST',
    body: { email: 'clerk@faelinbooks.com', password: 'incorrectPassword' },
  });
  assert.strictEqual(status, 401);
  assert.strictEqual(data.error, 'Wrong email or password');
});

test('12. login gives a valid token and user payload', async () => {
  const { status, data } = await call('/auth/login', {
    method: 'POST',
    body: { email: 'clerk@faelinbooks.com', password: 'clerkPassword123' },
  });
  assert.strictEqual(status, 200);
  assert.ok(data.token);
  assert.strictEqual(data.user.email, 'clerk@faelinbooks.com');
  assert.strictEqual(data.user.role, 'staff');
  staffToken = data.token;
});

test('13. logged in staff can create a customer', async () => {
  const { status, data } = await call('/customers', {
    method: 'POST',
    token: staffToken,
    body: { name: 'Oliver Twist', phone: '0912-333-4455', email: 'oliver@twist.org' },
  });
  assert.strictEqual(status, 201);
  assert.strictEqual(data.name, 'Oliver Twist');
});

test('14. logged in staff can create a book order', async () => {
  const { status, data } = await call('/orders', {
    method: 'POST',
    token: staffToken,
    body: { customerId: 1, bookTitle: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Classic Fiction', quantity: 1, totalPrice: 580.00 },
  });
  assert.strictEqual(status, 201);
  assert.strictEqual(data.bookTitle, 'Crime and Punishment');
});

test('15. an order for a missing customer gives 400', async () => {
  const { status, data } = await call('/orders', {
    method: 'POST',
    token: staffToken,
    body: { customerId: 9999, bookTitle: 'Ghost Book', author: 'Nobody' },
  });
  assert.strictEqual(status, 400);
  assert.strictEqual(data.error, 'customerId does not match any customer');
});

test('16. page size above 50 gives 400', async () => {
  const { status, data } = await call('/orders?limit=500');
  assert.strictEqual(status, 400);
  assert.strictEqual(data.error, 'limit must be a whole number from 1 to 50');
});

test('17. details route shows customer names', async () => {
  const { status, data } = await call('/orders/details');
  assert.strictEqual(status, 200);
  assert.ok(Array.isArray(data));
  assert.ok(data[0].customerName);
  assert.ok(data[0].bookTitle);
});

test('18. weather without a key gives 503', async () => {
  const { status, data } = await call('/weather');
  assert.strictEqual(status, 503);
  assert.strictEqual(data.error, 'Weather is not set up on this server');
});

test('19. staff cannot delete orders (403 Admins only)', async () => {
  const { status, data } = await call('/orders/1', {
    method: 'DELETE',
    token: staffToken,
  });
  assert.strictEqual(status, 403);
  assert.strictEqual(data.error, 'Admins only');
});

test('20. admin login and authorized deletion works', async () => {
  const loginRes = await call('/auth/login', {
    method: 'POST',
    body: { email: 'admin@faelinbooks.com', password: 'test-admin-password-only' },
  });
  assert.strictEqual(loginRes.status, 200);
  adminToken = loginRes.data.token;
  assert.strictEqual(loginRes.data.user.role, 'admin');

  // Create disposable order to delete
  const newOrder = await call('/orders', {
    method: 'POST',
    token: adminToken,
    body: { customerId: 1, bookTitle: 'Disposable Novel', author: 'Temp', genre: 'Fiction', quantity: 1, totalPrice: 300 },
  });
  assert.strictEqual(newOrder.status, 201);

  // Admin deletes order
  const delRes = await call('/orders/' + newOrder.data.id, {
    method: 'DELETE',
    token: adminToken,
  });
  assert.strictEqual(delRes.status, 200);
  assert.strictEqual(delRes.data.message, 'Order deleted');
});

test('21. customer summary analytics route calculates orders and spending', async () => {
  const { status, data } = await call('/reports/customer-summary');
  assert.strictEqual(status, 200);
  assert.ok(Array.isArray(data));
  assert.ok(data.length >= 1);
  assert.ok(typeof data[0].totalOrders === 'number');
  assert.ok(typeof data[0].totalSpent === 'number');
});

test('22. exchange rates route returns live or fallback currencies', async () => {
  const { status, data } = await call('/exchange-rates');
  assert.strictEqual(status, 200);
  assert.strictEqual(data.base, 'PHP');
  assert.ok(data.rates);
  assert.strictEqual(data.rates.PHP, 1);
  assert.ok(typeof data.rates.USD === 'number');
  assert.ok(typeof data.rates.EUR === 'number');
  assert.ok(typeof data.rates.GBP === 'number');
  assert.ok(typeof data.rates.JPY === 'number');
});

test('23. store location route returns sanctuary map coordinates and hours', async () => {
  const { status, data } = await call('/store/location');
  assert.strictEqual(status, 200);
  assert.ok(data.storeName);
  assert.ok(data.address);
  assert.ok(data.coordinates.latitude);
  assert.ok(data.coordinates.longitude);
  assert.ok(data.hours.weekdays);
  assert.ok(Array.isArray(data.amenities));
  assert.ok(data.mapEmbedUrl);
});


test('24. a non-text bookTitle gives 400, not a crash', async () => {
  const { status, data } = await call('/orders', {
    method: 'POST',
    token: staffToken,
    body: { customerId: 1, bookTitle: 123 },
  });
  assert.strictEqual(status, 400);
  assert.strictEqual(data.error, 'bookTitle is required');
});

test('25. a bad quantity or price gives 400', async () => {
  const badQuantity = await call('/orders', {
    method: 'POST',
    token: staffToken,
    body: { customerId: 1, bookTitle: 'Some Book', quantity: 0 },
  });
  assert.strictEqual(badQuantity.status, 400);

  const badPrice = await call('/orders', {
    method: 'POST',
    token: staffToken,
    body: { customerId: 1, bookTitle: 'Some Book', totalPrice: -5 },
  });
  assert.strictEqual(badPrice.status, 400);
});

test('26. a status outside the allowed list gives 400', async () => {
  const { status, data } = await call('/orders/1', {
    method: 'PUT',
    token: staffToken,
    body: { status: 'Done' },
  });
  assert.strictEqual(status, 400);
  assert.strictEqual(
    data.error,
    'status must be one of: Pending, Confirmed, Completed, Cancelled'
  );
});

test('27. a customer with orders cannot be deleted (409)', async () => {
  const { status } = await call('/customers/1', {
    method: 'DELETE',
    token: adminToken,
  });
  assert.strictEqual(status, 409);
});
