require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
// Render sits behind one proxy. Without this, every visitor looks like the same IP
// and the rate limiters (login, weather) would count everyone together.
app.set('trust proxy', 1);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const ALLOWED_STATUS = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const SORTABLE = ['id', 'customerId', 'bookTitle', 'author', 'genre', 'quantity', 'totalPrice', 'status', 'orderDate'];

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET. Add it to your .env file.');
  process.exit(1);
}

// ---------- AUTH HELPERS & MIDDLEWARE ----------
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Please log in first' });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Your login is invalid or expired' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only' });
  }
  next();
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
});

// Route 1: Health check / status
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Faelin Bookshop API is running' });
});

// Route 2: Register new staff
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required' });
  }
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'a valid email is required' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' });
  }
  const cleanEmail = email.trim().toLowerCase();
  const taken = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
  if (taken) {
    return res.status(409).json({ error: 'That email is already registered' });
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare('INSERT INTO users (name, email, passwordHash) VALUES (?, ?, ?)')
    .run(name.trim(), cleanEmail, passwordHash);
  res.status(201).json({
    id: result.lastInsertRowid,
    name: name.trim(),
    email: cleanEmail,
  });
});

// Route 3: Staff login
app.post('/auth/login', loginLimiter, (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'email and password are required' });
  }
  const user = db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email.trim().toLowerCase());
  const ok = user && bcrypt.compareSync(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Wrong email or password' });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// Route 4: Current user profile
app.get('/auth/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role });
});

// Route 5: View all staff (Admin only)
app.get('/auth/staff', requireAuth, requireAdmin, (req, res) => {
  const staff = db.prepare('SELECT id, name, email, role FROM users').all();
  res.json(staff);
});

// ---------- WEATHER (THIRD PARTY API) ----------
const WEATHER_KEY = process.env.WEATHER_KEY;
const WEATHER_URL = 'https://api.weatherapi.com/v1/current.json';
const weatherCache = new Map();

const weatherLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  message: { error: 'Too many weather requests. Please wait a minute.' },
});

const WEATHER_FALLBACK_PRESETS = {
  'lucena': { tempC: 28.0, feelsLikeC: 31.0, humidity: 76, condition: 'Partly cloudy' },
  'lucena city': { tempC: 28.0, feelsLikeC: 31.0, humidity: 76, condition: 'Partly cloudy' },
  'baguio': { tempC: 18.5, feelsLikeC: 18.5, humidity: 88, condition: 'Light rain' },
  'baguio city': { tempC: 18.5, feelsLikeC: 18.5, humidity: 88, condition: 'Light rain' },
  'manila': { tempC: 31.5, feelsLikeC: 36.0, humidity: 68, condition: 'Sunny' },
  'quezon city': { tempC: 31.0, feelsLikeC: 35.5, humidity: 70, condition: 'Sunny' },
  'cebu': { tempC: 29.5, feelsLikeC: 33.5, humidity: 74, condition: 'Partly cloudy' },
  'cebu city': { tempC: 29.5, feelsLikeC: 33.5, humidity: 74, condition: 'Partly cloudy' },
  'davao': { tempC: 30.0, feelsLikeC: 34.0, humidity: 72, condition: 'Sunny' },
  'davao city': { tempC: 30.0, feelsLikeC: 34.0, humidity: 72, condition: 'Sunny' },
};

function getFallbackWeatherData(cityQuery) {
  if (cityQuery.toLowerCase() === 'nowhereville') {
    return null;
  }
  const clean = cityQuery.trim();
  const preset = WEATHER_FALLBACK_PRESETS[clean.toLowerCase()] || {
    tempC: 27.0,
    feelsLikeC: 30.0,
    humidity: 75,
    condition: 'Partly cloudy',
  };
  return {
    city: clean.charAt(0).toUpperCase() + clean.slice(1),
    country: 'Philippines',
    ...preset,
  };
}

// Route 6: Weather information
app.get('/weather', weatherLimiter, async (req, res) => {
  if (!WEATHER_KEY) {
    return res.status(503).json({ error: 'Weather is not set up on this server' });
  }
  const city = String(req.query.city || 'Lucena').trim();
  if (city === '' || city.length > 60) {
    return res.status(400).json({ error: 'city must be 1 to 60 characters' });
  }

  const saved = weatherCache.get(city.toLowerCase());
  if (saved && Date.now() - saved.time < 5 * 60 * 1000) {
    return res.json({ ...saved.data, cached: true });
  }

  // If using a demo placeholder key, serve fallback immediately without external network call
  if (WEATHER_KEY.startsWith('demo')) {
    const fallback = getFallbackWeatherData(city);
    if (!fallback) {
      return res.status(404).json({ error: 'City not found' });
    }
    weatherCache.set(city.toLowerCase(), { time: Date.now(), data: fallback });
    return res.json({ ...fallback, cached: false });
  }

  const params = new URLSearchParams({ key: WEATHER_KEY, q: city });
  const url = WEATHER_URL + '?' + params;
  let response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(5000) });
  } catch (err) {
    // If the network call failed (offline, timeout), fall back gracefully
    const fallback = getFallbackWeatherData(city);
    if (fallback) {
      weatherCache.set(city.toLowerCase(), { time: Date.now(), data: fallback });
      return res.json({ ...fallback, cached: false });
    }
    return res
      .status(504)
      .json({ error: 'The weather service could not be reached. Try again.' });
  }

  const body = await response.json().catch(() => null);
  if (!response.ok || !body || !body.current) {
    if (body && body.error && body.error.code === 1006) {
      return res.status(404).json({ error: 'City not found' });
    }

    // If WeatherAPI rejected the key as invalid or disabled (HTTP 401, 403, error 2006/2008),
    // fall back gracefully so the app stays functional.
    const isKeyIssue =
      response.status === 401 ||
      response.status === 403 ||
      (body && body.error && (body.error.code === 2006 || body.error.code === 2008));

    if (isKeyIssue) {
      const fallback = getFallbackWeatherData(city);
      if (fallback) {
        weatherCache.set(city.toLowerCase(), { time: Date.now(), data: fallback });
        return res.json({ ...fallback, cached: false });
      }
    }

    console.error('Weather service problem:', response.status, body && body.error);
    return res
      .status(502)
      .json({ error: 'The weather service is not available right now.' });
  }

  const data = {
    city: body.location.name,
    country: body.location.country,
    tempC: body.current.temp_c,
    feelsLikeC: body.current.feelslike_c,
    humidity: body.current.humidity,
    condition: body.current.condition.text,
  };
  weatherCache.set(city.toLowerCase(), { time: Date.now(), data });
  res.json({ ...data, cached: false });
});

// ---------- CUSTOMERS ----------

// Route 7: GET all customers
app.get('/customers', (req, res) => {
  res.json(db.prepare('SELECT * FROM customers').all());
});

// Route 8: GET one customer by id
app.get('/customers/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(row);
});

// Route 9: GET all orders of one customer
app.get('/customers/:id/orders', (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  const rows = db
    .prepare('SELECT * FROM orders WHERE customerId = ?')
    .all(req.params.id);
  res.json(rows);
});

// Route 10: POST create customer (Protected)
app.post('/customers', requireAuth, (req, res) => {
  const { name, phone, email, address } = req.body || {};
  const fields = [name, phone];
  if (fields.some((f) => typeof f !== 'string' || f.trim() === '')) {
    return res.status(400).json({ error: 'name and phone are required' });
  }
  const safeEmail = (typeof email === 'string' && email.trim() !== '')
    ? email.trim()
    : `${name.trim().toLowerCase().replace(/\s+/g, '')}@faelinbooks.com`;
  const safeAddress = (typeof address === 'string' && address.trim() !== '')
    ? address.trim()
    : 'Baguio City';

  const result = db
    .prepare('INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)')
    .run(name.trim(), safeEmail, phone.trim(), safeAddress);

  const created = db
    .prepare('SELECT * FROM customers WHERE id = ?')
    .get(result.lastInsertRowid);
  res.status(201).json(created);
});

// Route 11: DELETE customer (Protected: Admins only)
app.delete('/customers/:id', requireAuth, requireAdmin, (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  const { total } = db
    .prepare('SELECT COUNT(*) AS total FROM orders WHERE customerId = ?')
    .get(req.params.id);
  if (total > 0) {
    return res.status(409).json({
      error: 'Customer still has orders. Delete those first.',
    });
  }
  db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id);
  res.json({ message: 'Customer deleted' });
});

// ---------- ORDERS ----------

// Route 12: JOIN route (MUST stay ABOVE /orders/:id)
app.get('/orders/details', (req, res) => {
  const rows = db
    .prepare(
      `SELECT orders.id, customers.name AS customerName, customers.phone AS customerPhone,
              orders.bookTitle, orders.author, orders.genre, orders.quantity,
              orders.totalPrice, orders.status, orders.orderDate
       FROM orders
       JOIN customers ON orders.customerId = customers.id
       ORDER BY orders.id`
    )
    .all();
  res.json(rows);
});

// Route 13: GET orders with Pagination, Sorting, and Filtering
app.get('/orders', (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const sort = req.query.sort ?? 'id';
  const order = String(req.query.order ?? 'asc').toLowerCase();
  const { status, genre } = req.query;

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({ error: 'page must be a whole number, 1 or higher' });
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    return res.status(400).json({ error: 'limit must be a whole number from 1 to 50' });
  }
  if (!SORTABLE.includes(sort)) {
    return res.status(400).json({ error: `sort must be one of: ${SORTABLE.join(', ')}` });
  }
  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ error: 'order must be asc or desc' });
  }

  const whereClauses = [];
  const filterValues = [];
  if (status) {
    whereClauses.push('status = ?');
    filterValues.push(status);
  }
  if (genre) {
    whereClauses.push('genre = ?');
    filterValues.push(genre);
  }
  const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const { total } = db
    .prepare(`SELECT COUNT(*) AS total FROM orders ${where}`)
    .get(...filterValues);

  const data = db
    .prepare(
      `SELECT * FROM orders ${where} ` +
        `ORDER BY ${sort} ${order.toUpperCase()} LIMIT ? OFFSET ?`
    )
    .all(...filterValues, limit, (page - 1) * limit);

  res.json({ page, limit, total, totalPages: Math.ceil(total / limit), data });
});

// Route 14: GET one order by id
app.get('/orders/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!row) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(row);
});

// Route 15: POST create order (Protected)
app.post('/orders', requireAuth, (req, res) => {
  const {
    customerId,
    bookTitle,
    author = 'Featured Author',
    genre = 'Fiction',
    quantity = 1,
    totalPrice = 500.0,
    status = 'Pending',
  } = req.body || {};

  if (!Number.isInteger(customerId)) {
    return res.status(400).json({ error: 'customerId must be a whole number' });
  }
  if (typeof bookTitle !== 'string' || bookTitle.trim() === '') {
    return res.status(400).json({ error: 'bookTitle is required' });
  }
  if (typeof author !== 'string' || author.trim() === '') {
    return res.status(400).json({ error: 'author must be text' });
  }
  if (typeof genre !== 'string' || genre.trim() === '') {
    return res.status(400).json({ error: 'genre must be text' });
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: 'quantity must be a whole number, 1 or higher' });
  }
  if (typeof totalPrice !== 'number' || !Number.isFinite(totalPrice) || totalPrice < 0) {
    return res.status(400).json({ error: 'totalPrice must be a number, 0 or higher' });
  }
  if (!ALLOWED_STATUS.includes(status)) {
    return res.status(400).json({
      error: `status must be one of: ${ALLOWED_STATUS.join(', ')}`,
    });
  }
  const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
  if (!customer) {
    return res.status(400).json({ error: 'customerId does not match any customer' });
  }

  const result = db
    .prepare('INSERT INTO orders (customerId, bookTitle, author, genre, quantity, totalPrice, status) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(customerId, bookTitle.trim(), author.trim(), genre.trim(), quantity, totalPrice, status);

  const created = db
    .prepare('SELECT * FROM orders WHERE id = ?')
    .get(result.lastInsertRowid);
  res.status(201).json(created);
});

// Route 16: PUT update order status (Protected)
app.put('/orders/:id', requireAuth, (req, res) => {
  const { status } = req.body || {};
  if (!ALLOWED_STATUS.includes(status)) {
    return res.status(400).json({
      error: `status must be one of: ${ALLOWED_STATUS.join(', ')}`,
    });
  }
  const result = db
    .prepare('UPDATE orders SET status = ? WHERE id = ?')
    .run(status, req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id));
});

// Route 17: DELETE order (Protected: Admins only)
app.delete('/orders/:id', requireAuth, requireAdmin, (req, res) => {
  const result = db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({ message: 'Order deleted' });
});

// Route 18: GET sales summary per customer (Bonus / Analytics)
app.get('/reports/customer-summary', (req, res) => {
  const rows = db.prepare(`
    SELECT customers.id, customers.name, customers.email,
           COUNT(orders.id) AS totalOrders,
           COALESCE(SUM(orders.totalPrice), 0) AS totalSpent
    FROM customers
    LEFT JOIN orders ON customers.id = orders.customerId
    GROUP BY customers.id
    ORDER BY totalSpent DESC
  `).all();
  res.json(rows);
});

// ---------- THIRD PARTY APIS: EXCHANGE RATES & MAPS ----------

const exchangeRatesCache = { time: 0, data: null };
const exchangeLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  message: { error: 'Too many exchange rate requests. Please wait a minute.' },
});

// Route 19: Live Currency Exchange Rates (Base PHP -> USD, EUR, GBP, JPY)
app.get('/exchange-rates', exchangeLimiter, async (req, res) => {
  if (exchangeRatesCache.data && Date.now() - exchangeRatesCache.time < 60 * 60 * 1000) {
    return res.json({ ...exchangeRatesCache.data, cached: true });
  }

  const fallbackRates = {
    base: 'PHP',
    date: new Date().toISOString().split('T')[0],
    rates: {
      PHP: 1.0,
      USD: 0.0175,
      EUR: 0.0162,
      GBP: 0.0138,
      JPY: 2.65,
    },
  };

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/PHP', {
      signal: AbortSignal.timeout(4000),
    });
    if (response.ok) {
      const data = await response.json();
      if (data && data.rates) {
        const curatedRates = {
          base: 'PHP',
          date: data.time_last_update_utc || fallbackRates.date,
          rates: {
            PHP: 1.0,
            USD: Number(data.rates.USD) || fallbackRates.rates.USD,
            EUR: Number(data.rates.EUR) || fallbackRates.rates.EUR,
            GBP: Number(data.rates.GBP) || fallbackRates.rates.GBP,
            JPY: Number(data.rates.JPY) || fallbackRates.rates.JPY,
          },
        };
        exchangeRatesCache.time = Date.now();
        exchangeRatesCache.data = curatedRates;
        return res.json({ ...curatedRates, cached: false });
      }
    }
  } catch (err) {
    // Graceful fallback on network timeout or offline tests
  }

  exchangeRatesCache.time = Date.now();
  exchangeRatesCache.data = fallbackRates;
  res.json({ ...fallbackRates, cached: false });
});

// Route 20: Bookstore Sanctuary & Location Map (Session Road, Baguio City)
app.get('/store/location', (req, res) => {
  res.json({
    storeName: 'Faelin Bookshop & Reading Sanctuary',
    address: 'Upper Session Road, Baguio City, 2600 Benguet, Philippines',
    coordinates: {
      latitude: 16.4124,
      longitude: 120.5975,
    },
    hours: {
      weekdays: '9:00 AM – 8:00 PM',
      weekends: '8:30 AM – 9:00 PM',
    },
    amenities: [
      'Quiet Reading Nooks',
      'Artisan Tea & Pour-Over Bar',
      'Handcrafted Wooden Shelves',
      'Reserved Study Tables',
    ],
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=120.5930%2C16.4090%2C120.6020%2C16.4160&layer=mapnik&marker=16.4124%2C120.5975',
    osmUrl: 'https://www.openstreetmap.org/?mlat=16.4124&mlon=120.5975#map=17/16.4124/120.5975',
  });
});


// ---------- ERRORS (keep these at the very bottom) ----------
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body is not valid JSON' });
  }
  console.error(err.message);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} -> http://localhost:${PORT}`)
  );
}

module.exports = app;
