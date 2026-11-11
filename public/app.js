const TOKEN_KEY = 'faelinToken';
const STATUS_LIST = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

// Complete 32 Curated Bookstore Editions Across 6 Literary Genres
const CATALOG_BOOKS = [
  {
    id: "book-1",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    genre: "Fantasy",
    category: "fantasy",
    price: 650.00,
    rating: 4.9,
    year: 2007,
    pages: 662,
    themeColor: "#1d382b",
    badge: "Top Choice",
    blurb: "The tale of Kvothe, from his childhood in a troupe of traveling players to his years as a legendary wizard, arcanist, and musician."
  },
  {
    id: "book-2",
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    genre: "Magical Realism",
    category: "fiction",
    price: 540.00,
    rating: 4.8,
    year: 2002,
    pages: 505,
    themeColor: "#1e293b",
    badge: "Bestseller",
    blurb: "A metaphysical voyage following a teenage runaway and an elderly man who speaks with cats across surreal modern Japan."
  },
  {
    id: "book-3",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    category: "scifi",
    price: 720.00,
    rating: 4.9,
    year: 1965,
    pages: 688,
    themeColor: "#78350f",
    badge: "Classic",
    blurb: "Set on the desert planet Arrakis, Dune is the story of young Paul Atreides and the grand battle for the spice melange."
  },
  {
    id: "book-4",
    title: "The Shadow of the Wind",
    author: "Carlos Ruiz Zafón",
    genre: "Gothic Mystery",
    category: "gothic",
    price: 780.00,
    rating: 4.9,
    year: 2001,
    pages: 487,
    themeColor: "#451a21",
    badge: "Staff Pick",
    blurb: "In postwar Barcelona, a young boy is taken to the secret Cemetery of Forgotten Books to choose a cursed novel."
  },
  {
    id: "book-5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Sci-Fi",
    category: "scifi",
    price: 850.00,
    rating: 4.9,
    year: 2021,
    pages: 496,
    themeColor: "#0f2f38",
    badge: "Popular",
    blurb: "Ryland Grace is the sole survivor on a desperate scientific mission to save humanity from solar extinction."
  },
  {
    id: "book-6",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    genre: "Mythology",
    category: "classics",
    price: 620.00,
    rating: 4.8,
    year: 2011,
    pages: 416,
    themeColor: "#854d0e",
    badge: "Acclaimed",
    blurb: "A lyrical reimagining of the Iliad that follows the deep bond between Patroclus and the golden hero Achilles."
  },
  {
    id: "book-7",
    title: "Piranesi",
    author: "Susanna Clarke",
    genre: "Literary Fantasy",
    category: "fantasy",
    price: 580.00,
    rating: 4.8,
    year: 2020,
    pages: 245,
    themeColor: "#164e63",
    badge: "Award Winner",
    blurb: "Piranesi lives in the House—a labyrinth of infinite halls lined with ocean tides and thousands of classical statues."
  },
  {
    id: "book-8",
    title: "Babel: An Arcane History",
    author: "R.F. Kuang",
    genre: "Historical Fantasy",
    category: "fantasy",
    price: 890.00,
    rating: 4.9,
    year: 2022,
    pages: 544,
    themeColor: "#312e81",
    badge: "Award Winner",
    blurb: "At Oxford's Royal Institute of Translation, scholars manifest magical silver-working powered by words lost in translation."
  },
  {
    id: "book-9",
    title: "The Secret History",
    author: "Donna Tartt",
    genre: "Literary Fiction",
    category: "fiction",
    price: 680.00,
    rating: 4.8,
    year: 1992,
    pages: 559,
    themeColor: "#292524",
    badge: "Cult Classic",
    blurb: "An elite circle of classical Greek scholars at an exclusive Vermont college slide into decadence, obsession, and murder."
  },
  {
    id: "book-10",
    title: "Six of Crows",
    author: "Leigh Bardugo",
    genre: "Fantasy",
    category: "fantasy",
    price: 550.00,
    rating: 4.8,
    year: 2015,
    pages: 465,
    themeColor: "#18181b",
    badge: "Popular",
    blurb: "Criminal prodigy Kaz Brekker gathers six dangerous outcasts for an impossible heist inside an impenetrable fortress."
  },
  {
    id: "book-11",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    genre: "Fiction",
    category: "fiction",
    price: 490.00,
    rating: 4.7,
    year: 1987,
    pages: 296,
    themeColor: "#7f1d1d",
    badge: "Bestseller",
    blurb: "A nostalgic and bittersweet story of student youth, loss, music, and love in late 1960s Tokyo."
  },
  {
    id: "book-12",
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    genre: "Epic Fantasy",
    category: "fantasy",
    price: 890.00,
    rating: 4.8,
    year: 2019,
    pages: 848,
    themeColor: "#78350f",
    badge: "Epic Volume",
    blurb: "An extraordinary, sprawling epic about a divided world on the brink of war, an unmarried queen, and dragon riders."
  },
  {
    id: "book-13",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    genre: "Historical Fiction",
    category: "fiction",
    price: 620.00,
    rating: 4.8,
    year: 2016,
    pages: 462,
    themeColor: "#831843",
    badge: "Staff Pick",
    blurb: "Sentenced by a Bolshevik tribunal to spend his life inside the Hotel Metropol, Count Alexander Rostov discovers boundless purpose."
  },
  {
    id: "book-14",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    genre: "Speculative Fiction",
    category: "scifi",
    price: 590.00,
    rating: 4.7,
    year: 2021,
    pages: 303,
    themeColor: "#ca8a04",
    badge: "Nobel Laureate",
    blurb: "An Artificial Friend named Klara observes the human world from a storefront window, contemplating love and mortality."
  },
  {
    id: "book-15",
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    genre: "Magical Realism",
    category: "fiction",
    price: 450.00,
    rating: 4.7,
    year: 2015,
    pages: 213,
    themeColor: "#44403c",
    badge: "Cozy Read",
    blurb: "In a quiet alleyway in Tokyo, an old café offers customers the chance to travel back in time—before their coffee turns cold."
  },
  {
    id: "book-16",
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    genre: "Gothic Horror",
    category: "gothic",
    price: 590.00,
    rating: 4.7,
    year: 2020,
    pages: 301,
    themeColor: "#14532d",
    badge: "Chilling",
    blurb: "A glamorous socialite heads to an isolated manor in the mountains of 1950s Mexico to investigate her cousin's frantic letters."
  },
  {
    id: "book-17",
    title: "Rebecca",
    author: "Daphne du Maurier",
    genre: "Gothic Classic",
    category: "gothic",
    price: 490.00,
    rating: 4.8,
    year: 1938,
    pages: 448,
    themeColor: "#1e1b4b",
    badge: "Classic",
    blurb: "A young bride arrives at the haunting estate of Manderley, only to find the memory of her husband's first wife omnipresent."
  },
  {
    id: "book-18",
    title: "The Thirteenth Tale",
    author: "Diane Setterfield",
    genre: "Gothic Mystery",
    category: "gothic",
    price: 580.00,
    rating: 4.7,
    year: 2006,
    pages: 406,
    themeColor: "#365314",
    badge: "Mystery",
    blurb: "A reclusive novelist summons a young biographer to finally reveal the long-buried secrets of the Angelfield family."
  },
  {
    id: "book-19",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Classic Literature",
    category: "classics",
    price: 480.00,
    rating: 4.9,
    year: 1866,
    pages: 545,
    themeColor: "#4c0519",
    badge: "Masterpiece",
    blurb: "The psychological turmoil and moral agony of Raskolnikov, an impoverished ex-student in Saint Petersburg who commits murder."
  },
  {
    id: "book-20",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Gothic Classic",
    category: "classics",
    price: 420.00,
    rating: 4.8,
    year: 1890,
    pages: 254,
    themeColor: "#581c87",
    badge: "Timeless",
    blurb: "A corrupt young aristocrat stays eternally youthful while a hidden portrait bears the ugly burden of his sins and hedonism."
  },
  {
    id: "book-21",
    title: "Circe",
    author: "Madeline Miller",
    genre: "Mythology",
    category: "classics",
    price: 640.00,
    rating: 4.8,
    year: 2018,
    pages: 393,
    themeColor: "#9a3412",
    badge: "Staff Pick",
    blurb: "In the house of Helios, a strange child named Circe discovers her power of witchcraft and stands against the gods."
  },
  {
    id: "book-22",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic Romance",
    category: "classics",
    price: 390.00,
    rating: 4.9,
    year: 1813,
    pages: 432,
    themeColor: "#155e75",
    badge: "Beloved",
    blurb: "The turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocrat."
  },
  {
    id: "book-23",
    title: "Neuromancer",
    author: "William Gibson",
    genre: "Cyberpunk",
    category: "scifi",
    price: 520.00,
    rating: 4.7,
    year: 1984,
    pages: 271,
    themeColor: "#0369a1",
    badge: "Pioneering",
    blurb: "Case, a washed-up computer hacker in Chiba City, is hired for one last desperate job targeting a powerful artificial intelligence."
  },
  {
    id: "book-24",
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    genre: "Sci-Fi",
    category: "scifi",
    price: 560.00,
    rating: 4.9,
    year: 1969,
    pages: 304,
    themeColor: "#1e3a8a",
    badge: "Masterpiece",
    blurb: "An envoy visits the frozen planet of Gethen, whose inhabitants can alter their gender, to invite them to an interstellar council."
  },
  {
    id: "book-25",
    title: "Hyperion",
    author: "Dan Simmons",
    genre: "Space Opera",
    category: "scifi",
    price: 640.00,
    rating: 4.8,
    year: 1989,
    pages: 482,
    themeColor: "#3b0764",
    badge: "Sci-Fi Epic",
    blurb: "On the eve of armageddon, seven pilgrims set out on a final journey across the galaxy to the mysterious Valley of the Time Tombs."
  },
  {
    id: "book-26",
    title: "Devotions: Selected Poems",
    author: "Mary Oliver",
    genre: "Poetry",
    category: "poetry",
    price: 540.00,
    rating: 4.9,
    year: 2017,
    pages: 464,
    themeColor: "#14532d",
    badge: "Luminous",
    blurb: "Pulitzer Prize-winner Mary Oliver curates the definitive collection of her luminous poetry celebrating nature and the wild world."
  },
  {
    id: "book-27",
    title: "The Essential Rumi",
    author: "Jalal al-Din Rumi",
    genre: "Sufi Poetry",
    category: "poetry",
    price: 480.00,
    rating: 4.9,
    year: 1995,
    pages: 416,
    themeColor: "#854d0e",
    badge: "Spiritual",
    blurb: "Translated by Coleman Barks, these ecstatically beautiful verses explore divine love, friendship, and the depths of the human soul."
  },
  {
    id: "book-28",
    title: "A Room of One's Own",
    author: "Virginia Woolf",
    genre: "Essay / Literature",
    category: "poetry",
    price: 380.00,
    rating: 4.8,
    year: 1929,
    pages: 112,
    themeColor: "#3f3f46",
    badge: "Essential",
    blurb: "Woolf's foundational essay reflecting on the artistic, financial, and physical freedom needed for women to create literature."
  },
  {
    id: "book-29",
    title: "The Book of Disquiet",
    author: "Fernando Pessoa",
    genre: "Philosophical Prose",
    category: "poetry",
    price: 620.00,
    rating: 4.8,
    year: 1982,
    pages: 544,
    themeColor: "#1c1917",
    badge: "Philosophical",
    blurb: "The haunting fragmentary diary of Bernardo Soares, assistant bookkeeper in Lisbon, exploring solitariness, dream, and existence."
  },
  {
    id: "book-30",
    title: "We Have Always Lived in the Castle",
    author: "Shirley Jackson",
    genre: "Gothic Mystery",
    category: "gothic",
    price: 460.00,
    rating: 4.8,
    year: 1962,
    pages: 160,
    themeColor: "#365314",
    badge: "Unsettling",
    blurb: "Merricat Blackwood lives on an estate with her sister Constance and Uncle Julian, years after an arsenic poisoning killed their family."
  },
  {
    id: "book-31",
    title: "The Ocean at the End of the Lane",
    author: "Neil Gaiman",
    genre: "Dark Fantasy",
    category: "fantasy",
    price: 480.00,
    rating: 4.8,
    year: 2013,
    pages: 181,
    themeColor: "#172554",
    badge: "Haunting",
    blurb: "A middle-aged man returns to his childhood home in Sussex and remembers a terrible secret involving a pond that was an ocean."
  },
  {
    id: "book-32",
    title: "Exhalation",
    author: "Ted Chiang",
    genre: "Sci-Fi Stories",
    category: "scifi",
    price: 510.00,
    rating: 4.9,
    year: 2019,
    pages: 352,
    themeColor: "#042f2e",
    badge: "Brilliant",
    blurb: "Nine profoundly moving science fiction novellas exploring free will, entropy, alternate timelines, and the nature of conscious machines."
  }
];

const LITERARY_QUOTES = [
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
  { text: "We read to know that we are not alone.", author: "C.S. Lewis" },
  { text: "Words can be like X-rays if you use them properly -- they'll go through anything.", author: "Aldous Huxley" }
];

let allOrders = [];
let allCustomers = [];
let loggedIn = false;
let currentUser = null;
let currentCategory = 'all';
let currentSearch = '';
let currentView = 'table';
let quoteIndex = 0;
let selectedModalBook = null;
const BOOKS_PER_PAGE = 8;
let catalogCurrentPage = 1;

let currentCurrency = 'PHP';
let exchangeRates = { PHP: 1.0, USD: 0.0175, EUR: 0.0162, GBP: 0.0138, JPY: 2.65 };
const CURRENCY_SYMBOLS = {
  PHP: '₱',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

function formatPrice(phpAmount) {
  const rate = exchangeRates[currentCurrency] || 1.0;
  const converted = Number(phpAmount) * rate;
  const symbol = CURRENCY_SYMBOLS[currentCurrency] || '₱';
  if (currentCurrency === 'JPY') {
    return symbol + Math.round(converted).toLocaleString();
  }
  return symbol + converted.toFixed(2);
}

const $ = (id) => document.getElementById(id);

// ---------- TOKEN STORAGE ----------
function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (err) {
    return null;
  }
}

function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    // page still works in-memory
  }
}

function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    // nothing to clear
  }
}

// ---------- MESSAGES ----------
function showMessage(text, isError) {
  const box = $('message');
  box.textContent = (isError ? 'Problem: ' : '') + text;
  box.className = isError ? 'error' : 'ok';
}

// ---------- TALKING TO THE API ----------
async function api(path, options = {}) {
  const { noAuth, ...fetchOptions } = options;
  const headers = { 'Content-Type': 'application/json' };
  const token = noAuth ? null : getToken();
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  let res;
  try {
    res = await fetch(path, { ...fetchOptions, headers });
  } catch (err) {
    throw new Error('Cannot reach the server. Check your connection and try again.');
  }

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    // response had no json body
  }

  if (res.status === 401 && token) {
    clearToken();
    showLoggedOut();
    throw new Error('Your login session expired. Please sign in again.');
  }

  if (!res.ok) {
    throw new Error((data && data.error) || 'Something went wrong. Please try again.');
  }

  return data;
}

// ---------- LOGIN STATE ----------
function showLoggedIn(user) {
  loggedIn = true;
  currentUser = user;
  $('who').textContent = 'Logged in as ' + user.email + ' (' + user.role + ')';
  $('logoutBtn').hidden = false;
  $('loginSection').hidden = true;
  $('addSection').hidden = false;

  const adminSec = $('adminSection');
  if (adminSec) {
    if (user.role === 'admin') {
      adminSec.hidden = false;
      loadStaffRoster();
    } else {
      adminSec.hidden = true;
    }
  }

  renderRows();
}

function showLoggedOut() {
  loggedIn = false;
  currentUser = null;
  $('who').textContent = 'Guest Reader';
  $('logoutBtn').hidden = true;
  $('loginSection').hidden = false;
  $('addSection').hidden = true;

  const adminSec = $('adminSection');
  if (adminSec) {
    adminSec.hidden = true;
  }

  renderRows();
}

// ---------- KPI UPDATES ----------
function updateKPIs() {
  const kpiCatalog = $('kpiCatalogCount');
  const kpiTotal = $('kpiTotalOrders');
  const kpiActive = $('kpiActiveOrders');
  const kpiCust = $('kpiCustomers');

  if (kpiCatalog) kpiCatalog.textContent = CATALOG_BOOKS.length;
  if (kpiTotal) kpiTotal.textContent = allOrders.length;
  if (kpiActive) {
    const pendingCount = allOrders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
    kpiActive.textContent = pendingCount;
  }
  if (kpiCust) kpiCust.textContent = allCustomers.length;
}

// ---------- BOOK SELECTION & PRE-FILLING ----------
function selectBookForOrder(book) {
  $('bookTitle').value = book.title;
  $('author').value = book.author;
  $('genre').value = book.genre;
  $('totalPrice').value = Number(book.price).toFixed(2);
  $('quantity').value = 1;

  if (loggedIn) {
    $('addSection').scrollIntoView({ behavior: 'smooth' });
    $('customerSelect').focus();
    showMessage('Selected "' + book.title + '" (' + formatPrice(book.price) + '). Choose a customer to place the order.', false);
  } else {
    showMessage('Selected "' + book.title + '". Please sign in as staff at the circulation desk below to record this reservation.', false);
    $('loginSection').scrollIntoView({ behavior: 'smooth' });
    $('loginEmail').focus();
  }
}

// ---------- BOOK DETAIL MODAL ----------
function openBookModal(book) {
  selectedModalBook = book;
  const modal = $('bookModal');
  if (!modal) return;

  const coverArt = $('modalCoverArt');
  if (coverArt) {
    coverArt.style.background = `linear-gradient(145deg, ${book.themeColor || '#1d382b'} 0%, #151b22 100%)`;
  }
  $('modalBadge').textContent = book.badge || book.genre;
  $('modalBookTitle').textContent = book.title;
  $('modalBookAuthor').textContent = book.author;

  $('modalGenre').textContent = book.genre;
  $('modalTitleDisplay').textContent = book.title;
  $('modalAuthorDisplay').textContent = book.author;
  $('modalRating').textContent = (book.rating || 4.9) + ' / 5.0';
  $('modalPages').textContent = (book.pages || 350) + ' pp.';
  $('modalYear').textContent = book.year || '2022';
  $('modalBlurb').textContent = book.blurb;
  $('modalPrice').textContent = formatPrice(book.price);

  modal.showModal();
}

function closeBookModal() {
  const modal = $('bookModal');
  if (modal && modal.open) {
    modal.close();
  }
}

// ---------- CREATE BOOK CARD (Paper Haven Reference Architecture) ----------
function createBookCard(book) {
  const card = document.createElement('article');
  card.className = 'haven-book-card';

  // Left: Standing Book Cover
  const coverWrap = document.createElement('div');
  coverWrap.className = 'haven-cover-wrap';
  coverWrap.style.background = `linear-gradient(145deg, ${book.themeColor} 0%, #151b22 100%)`;
  coverWrap.setAttribute('role', 'button');
  coverWrap.setAttribute('tabindex', '0');
  coverWrap.setAttribute('aria-label', 'View details for ' + book.title);

  const spine = document.createElement('div');
  spine.className = 'haven-cover-spine';
  coverWrap.appendChild(spine);

  const tag = document.createElement('span');
  tag.className = 'haven-cover-tag';
  tag.textContent = book.badge || book.genre;
  coverWrap.appendChild(tag);

  const titleDiv = document.createElement('h4');
  titleDiv.className = 'haven-cover-title';
  titleDiv.textContent = book.title;
  coverWrap.appendChild(titleDiv);

  const authorDiv = document.createElement('p');
  authorDiv.className = 'haven-cover-author';
  authorDiv.textContent = book.author;
  coverWrap.appendChild(authorDiv);

  coverWrap.addEventListener('click', () => openBookModal(book));
  coverWrap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openBookModal(book);
    }
  });
  card.appendChild(coverWrap);

  // Right: Book Info Column
  const infoCol = document.createElement('div');
  infoCol.className = 'haven-info-col';

  const heading = document.createElement('h3');
  heading.className = 'haven-book-title';
  heading.textContent = book.title;
  heading.addEventListener('click', () => openBookModal(book));
  infoCol.appendChild(heading);

  const authorP = document.createElement('p');
  authorP.className = 'haven-book-author';
  authorP.textContent = 'By : ' + book.author;
  infoCol.appendChild(authorP);

  const metaRow = document.createElement('div');
  metaRow.className = 'haven-meta-row';
  const ratingSpan = document.createElement('span');
  ratingSpan.className = 'haven-rating';
  ratingSpan.textContent = '\u2605 ' + (book.rating || 4.9);
  const priceSpan = document.createElement('span');
  priceSpan.className = 'haven-price';
  priceSpan.textContent = formatPrice(book.price);
  metaRow.appendChild(ratingSpan);
  metaRow.appendChild(priceSpan);
  infoCol.appendChild(metaRow);

  const btnRow = document.createElement('div');
  btnRow.className = 'haven-btn-row';

  const reserveBtn = document.createElement('button');
  reserveBtn.type = 'button';
  reserveBtn.className = 'btn-add-cart';
  reserveBtn.textContent = 'Reserve';
  reserveBtn.setAttribute('aria-label', 'Reserve ' + book.title);
  reserveBtn.addEventListener('click', () => selectBookForOrder(book));
  btnRow.appendChild(reserveBtn);

  const detailBtn = document.createElement('button');
  detailBtn.type = 'button';
  detailBtn.className = 'btn-quick-preview';
  detailBtn.textContent = 'Synopsis';
  detailBtn.setAttribute('aria-label', 'Read synopsis of ' + book.title);
  detailBtn.addEventListener('click', () => openBookModal(book));
  btnRow.appendChild(detailBtn);

  infoCol.appendChild(btnRow);
  card.appendChild(infoCol);

  return card;
}

// ---------- RENDER RECOMMENDED FOR YOU (4 Cards) ----------
function renderRecommended() {
  const grid = $('featuredGrid');
  if (!grid) return;
  grid.replaceChildren();

  // Pick 4 curated books matching the user's reference mockup
  const recommendedIndices = [0, 1, 3, 4];
  recommendedIndices.forEach(idx => {
    const book = CATALOG_BOOKS[idx];
    if (book) {
      grid.appendChild(createBookCard(book));
    }
  });
}

// ---------- RENDER FULL 32 BOOK CATALOG WITH PAGINATION ----------
function renderCatalog(filterCategory = 'all', searchQuery = '') {
  const grid = $('catalogGrid');
  if (!grid) return;
  grid.replaceChildren();

  const query = (searchQuery || '').trim().toLowerCase();

  const filtered = CATALOG_BOOKS.filter(book => {
    const matchesCategory = (filterCategory === 'all') || (book.category === filterCategory);
    const searchTarget = (book.title + ' ' + book.author + ' ' + book.genre + ' ' + book.blurb).toLowerCase();
    const matchesSearch = !query || searchTarget.includes(query);
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE) || 1;
  if (catalogCurrentPage > totalPages) {
    catalogCurrentPage = 1;
  }

  const countDisplay = $('catalogCountDisplay');
  if (countDisplay) {
    if (filtered.length === 0) {
      countDisplay.textContent = 'No matching books found';
    } else {
      const startIndex = (catalogCurrentPage - 1) * BOOKS_PER_PAGE;
      const endIndex = Math.min(startIndex + BOOKS_PER_PAGE, filtered.length);
      if (query) {
        countDisplay.textContent = `Showing ${startIndex + 1}–${endIndex} of ${filtered.length} matching edition${filtered.length === 1 ? '' : 's'} (Page ${catalogCurrentPage} of ${totalPages})`;
      } else if (filterCategory === 'all') {
        countDisplay.textContent = `Showing ${startIndex + 1}–${endIndex} of 32 bookstore editions (Page ${catalogCurrentPage} of ${totalPages})`;
      } else {
        countDisplay.textContent = `Showing ${startIndex + 1}–${endIndex} of ${filtered.length} edition${filtered.length === 1 ? '' : 's'} (Page ${catalogCurrentPage} of ${totalPages})`;
      }
    }
  }

  if (filtered.length === 0) {
    const emptyBox = document.createElement('div');
    emptyBox.className = 'catalog-empty-notice';
    const emptyTitle = document.createElement('p');
    emptyTitle.className = 'empty-title';
    emptyTitle.textContent = 'No books match your search.';
    const emptySub = document.createElement('p');
    emptySub.className = 'empty-sub';
    emptySub.textContent = 'Try searching by another author name, title keyword, or reset the category filter.';
    emptyBox.appendChild(emptyTitle);
    emptyBox.appendChild(emptySub);
    grid.appendChild(emptyBox);
    renderPaginationControls(0);
    return;
  }

  const startIndex = (catalogCurrentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = filtered.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  pageBooks.forEach(book => {
    grid.appendChild(createBookCard(book));
  });

  renderPaginationControls(totalPages);
}

// ---------- RENDER PAGINATION CONTROLS ----------
function renderPaginationControls(totalPages) {
  const container = $('catalogPagination');
  if (!container) return;
  container.replaceChildren();

  if (totalPages <= 1) {
    container.hidden = true;
    return;
  }
  container.hidden = false;

  // Previous Page Button
  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'btn-page-nav btn-page-prev';
  prevBtn.textContent = '\u2039 Previous';
  prevBtn.disabled = catalogCurrentPage <= 1;
  prevBtn.addEventListener('click', () => {
    if (catalogCurrentPage > 1) {
      catalogCurrentPage--;
      renderCatalog(currentCategory, currentSearch);
      $('catalogSection').scrollIntoView({ behavior: 'smooth' });
    }
  });
  container.appendChild(prevBtn);

  // Numbered Page Buttons
  const pagesWrap = document.createElement('div');
  pagesWrap.className = 'page-numbers-wrap';

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.type = 'button';
    pageBtn.className = 'btn-page-num' + (i === catalogCurrentPage ? ' active' : '');
    pageBtn.textContent = i;
    pageBtn.setAttribute('aria-label', 'Go to page ' + i);
    if (i === catalogCurrentPage) {
      pageBtn.setAttribute('aria-current', 'page');
    }
    pageBtn.addEventListener('click', () => {
      catalogCurrentPage = i;
      renderCatalog(currentCategory, currentSearch);
      $('catalogSection').scrollIntoView({ behavior: 'smooth' });
    });
    pagesWrap.appendChild(pageBtn);
  }
  container.appendChild(pagesWrap);

  // Next Page Button
  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'btn-page-nav btn-page-next';
  nextBtn.textContent = 'Next \u203A';
  nextBtn.disabled = catalogCurrentPage >= totalPages;
  nextBtn.addEventListener('click', () => {
    if (catalogCurrentPage < totalPages) {
      catalogCurrentPage++;
      renderCatalog(currentCategory, currentSearch);
      $('catalogSection').scrollIntoView({ behavior: 'smooth' });
    }
  });
  container.appendChild(nextBtn);
}

// ---------- SHOW THE ORDER REGISTRY LIST ----------
function addCell(tr, text) {
  const td = document.createElement('td');
  td.textContent = text;
  tr.appendChild(td);
  return td;
}

function getInitials(name) {
  if (!name) return 'BK';
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function renderRows() {
  const filter = $('statusFilter').value;
  const search = $('search').value.trim().toLowerCase();

  const list = allOrders.filter((o) => {
    const matchesFilter = !filter || o.status === filter;
    const searchText = (
      (o.customerName || '') + ' ' +
      (o.bookTitle || '') + ' ' +
      (o.author || '') + ' ' +
      (o.genre || '')
    ).toLowerCase();
    const matchesSearch = !search || searchText.includes(search);
    return matchesFilter && matchesSearch;
  });

  updateKPIs();

  // Render Table View (Preserved Handout Contract)
  const tbody = $('rows');
  tbody.replaceChildren();

  if (list.length === 0) {
    const tr = document.createElement('tr');
    const td = addCell(tr, 'No customer reservations found.');
    td.colSpan = 7;
    tbody.appendChild(tr);
  } else {
    for (const o of list) {
      const tr = document.createElement('tr');

      // Customer cell with avatar
      const custTd = document.createElement('td');
      const custWrap = document.createElement('div');
      custWrap.className = 'customer-cell';
      const avatar = document.createElement('div');
      avatar.className = 'customer-avatar';
      avatar.textContent = getInitials(o.customerName);
      const nameText = document.createElement('span');
      nameText.textContent = o.customerName || 'Customer #' + o.customerId;
      custWrap.appendChild(avatar);
      custWrap.appendChild(nameText);
      custTd.appendChild(custWrap);
      tr.appendChild(custTd);

      // Book Title
      addCell(tr, o.bookTitle);

      // Author
      addCell(tr, o.author);

      // Genre
      addCell(tr, o.genre || 'Fiction');

      // Price
      addCell(tr, formatPrice(o.totalPrice || 0));

      // Status Pill
      const statusTd = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'status-pill status-' + (o.status || 'pending').toLowerCase();
      pill.textContent = o.status;
      statusTd.appendChild(pill);
      tr.appendChild(statusTd);

      // Actions Column
      const actions = addCell(tr, '');
      if (!loggedIn) {
        actions.textContent = 'Log in to change';
        actions.className = 'actions-locked';
      } else {
        actions.appendChild(makeStatusSelect(o));
        actions.appendChild(makeDeleteButton(o));
      }
      tbody.appendChild(tr);
    }
  }

  // Render Alternate Card View Grid
  renderCardView(list);
}

function renderCardView(list) {
  const cardRows = $('cardRows');
  if (!cardRows) return;
  cardRows.replaceChildren();

  if (list.length === 0) {
    const emptyP = document.createElement('p');
    emptyP.className = 'panel-desc';
    emptyP.textContent = 'No reservations match your search or filter.';
    cardRows.appendChild(emptyP);
    return;
  }

  list.forEach(o => {
    const card = document.createElement('div');
    card.className = 'order-ticket-card';

    const header = document.createElement('div');
    header.className = 'order-card-header';

    const title = document.createElement('div');
    title.className = 'order-card-book';
    title.textContent = o.bookTitle;
    header.appendChild(title);

    const pill = document.createElement('span');
    pill.className = 'status-pill status-' + (o.status || 'pending').toLowerCase();
    pill.textContent = o.status;
    header.appendChild(pill);

    card.appendChild(header);

    const author = document.createElement('div');
    author.className = 'order-card-author';
    author.textContent = 'By ' + o.author + ' (' + (o.genre || 'Fiction') + ')';
    card.appendChild(author);

    const cust = document.createElement('div');
    cust.className = 'order-card-customer';
    cust.textContent = 'Reader: ' + (o.customerName || 'Customer #' + o.customerId) + ' • ' + formatPrice(o.totalPrice || 0);
    card.appendChild(cust);

    const footer = document.createElement('div');
    footer.className = 'order-card-footer';

    if (!loggedIn) {
      const lockText = document.createElement('span');
      lockText.className = 'actions-locked';
      lockText.textContent = 'Log in to update';
      footer.appendChild(lockText);
    } else {
      footer.appendChild(makeStatusSelect(o));
      footer.appendChild(makeDeleteButton(o));
    }

    card.appendChild(footer);
    cardRows.appendChild(card);
  });
}

async function loadOrders() {
  try {
    allOrders = await api('/orders/details');
    renderRows();
  } catch (err) {
    showMessage(err.message, true);
  }
}

async function loadCustomers() {
  try {
    allCustomers = await api('/customers');
    const select = $('customerSelect');
    select.replaceChildren();
    for (const c of allCustomers) {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.name + ' (' + c.phone + ')';
      select.appendChild(option);
    }
    updateKPIs();
  } catch (err) {
    showMessage(err.message, true);
  }
}

async function loadStaffRoster() {
  const tbody = $('adminStaffRows');
  if (!tbody) return;
  try {
    const staff = await api('/auth/staff');
    tbody.replaceChildren();
    for (const member of staff) {
      const tr = document.createElement('tr');
      addCell(tr, member.name);
      addCell(tr, member.email);
      addCell(tr, member.role);
      tbody.appendChild(tr);
    }
  } catch (err) {
    // Non-admin session or fetch failure
  }
}

// ---------- CHANGE AND DELETE (STAFF ACTIONS) ----------
function makeStatusSelect(order) {
  const select = document.createElement('select');
  select.setAttribute('aria-label', 'Status for ' + order.bookTitle + ' ordered by ' + order.customerName);
  for (const s of STATUS_LIST) {
    const option = document.createElement('option');
    option.value = s;
    option.textContent = s;
    option.selected = s === order.status;
    select.appendChild(option);
  }

  select.addEventListener('change', async () => {
    try {
      await api('/orders/' + order.id, {
        method: 'PUT',
        body: JSON.stringify({ status: select.value }),
      });
      showMessage('Order status changed to ' + select.value + '.', false);
    } catch (err) {
      showMessage(err.message, true);
    }
    await loadOrders();
  });
  return select;
}

function makeDeleteButton(order) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Delete';
  button.setAttribute('aria-label', 'Delete ' + order.bookTitle + ' for ' + order.customerName);

  button.addEventListener('click', async () => {
    if (!confirm('Delete order for "' + order.bookTitle + '"? This cannot be undone.')) {
      return;
    }
    try {
      await api('/orders/' + order.id, { method: 'DELETE' });
      showMessage('Book reservation deleted.', false);
    } catch (err) {
      showMessage(err.message, true);
    }
    await loadOrders();
  });
  return button;
}

// ---------- FORM HANDLING ----------
async function runForm(form, work) {
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await work();
  } catch (err) {
    showMessage(err.message, true);
  }
  button.disabled = false;
}

$('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  runForm($('loginForm'), async () => {
    const data = await api('/auth/login', {
      method: 'POST',
      noAuth: true,
      body: JSON.stringify({
        email: $('loginEmail').value,
        password: $('loginPassword').value,
      }),
    });
    setToken(data.token);
    const me = await api('/auth/me');
    $('loginForm').reset();
    showLoggedIn(me);
    showMessage('Welcome back, ' + data.user.name + '! Circulation desk unlocked.', false);
  });
});

$('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();
  runForm($('registerForm'), async () => {
    const user = await api('/auth/register', {
      method: 'POST',
      noAuth: true,
      body: JSON.stringify({
        name: $('regName').value,
        email: $('regEmail').value,
        password: $('regPassword').value,
      }),
    });
    $('loginEmail').value = user.email;
    $('registerForm').reset();
    showMessage('Staff account created. Please enter your password to sign in.', false);
    $('loginPassword').focus();
  });
});

$('addForm').addEventListener('submit', (event) => {
  event.preventDefault();
  runForm($('addForm'), async () => {
    await api('/orders', {
      method: 'POST',
      body: JSON.stringify({
        customerId: Number($('customerSelect').value),
        bookTitle: $('bookTitle').value,
        author: $('author').value,
        genre: $('genre').value,
        quantity: Number($('quantity').value) || 1,
        totalPrice: Number($('totalPrice').value) || 650.00,
        status: $('orderStatus').value,
      }),
    });
    $('bookTitle').value = '';
    $('bookTitle').focus();
    showMessage('Book order placed and logged to registry.', false);
    await loadOrders();
  });
});

$('logoutBtn').addEventListener('click', () => {
  clearToken();
  showLoggedOut();
  showMessage('Signed out from bookstore staff session.', false);
});

$('statusFilter').addEventListener('change', renderRows);
$('search').addEventListener('input', renderRows);

// View Toggles (Table vs Card view)
const viewTableBtn = $('viewTableBtn');
const viewCardsBtn = $('viewCardsBtn');
const tableContainer = $('tableContainer');
const cardsContainer = $('cardsContainer');

if (viewTableBtn && viewCardsBtn) {
  viewTableBtn.addEventListener('click', () => {
    viewTableBtn.classList.add('active');
    viewCardsBtn.classList.remove('active');
    tableContainer.hidden = false;
    cardsContainer.hidden = true;
    currentView = 'table';
  });

  viewCardsBtn.addEventListener('click', () => {
    viewCardsBtn.classList.add('active');
    viewTableBtn.classList.remove('active');
    tableContainer.hidden = true;
    cardsContainer.hidden = false;
    currentView = 'cards';
  });
}

// Next Quote Button
const nextQuoteBtn = $('nextQuoteBtn');
if (nextQuoteBtn) {
  nextQuoteBtn.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % LITERARY_QUOTES.length;
    const q = LITERARY_QUOTES[quoteIndex];
    $('dailyQuote').textContent = q.text;
    $('quoteAuthor').textContent = '\u2014 ' + q.author;
  });
}

// Category Pills Filtering
const categoryPills = document.querySelectorAll('.cat-pill');
categoryPills.forEach(pill => {
  pill.addEventListener('click', () => {
    categoryPills.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-selected', 'true');
    currentCategory = pill.getAttribute('data-category');
    renderCatalog(currentCategory, currentSearch);
  });
});

// Reset Category "See all >" button
const resetCategoryBtn = $('resetCategoryBtn');
if (resetCategoryBtn) {
  resetCategoryBtn.addEventListener('click', () => {
    categoryPills.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });
    const allPill = document.querySelector('.cat-pill[data-category="all"]');
    if (allPill) {
      allPill.classList.add('active');
      allPill.setAttribute('aria-selected', 'true');
    }
    currentCategory = 'all';
    renderCatalog('all', currentSearch);
  });
}

// Catalog Search Input
const catalogSearchInput = $('catalogSearch');
if (catalogSearchInput) {
  catalogSearchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderCatalog(currentCategory, currentSearch);
  });
}

// Connect Author Strip Chips
const authorChips = document.querySelectorAll('.author-chip-item');
authorChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const authorName = chip.getAttribute('data-author');
    if (authorName && catalogSearchInput) {
      catalogSearchInput.value = authorName;
      currentSearch = authorName;
      renderCatalog('all', authorName);
      $('catalogSection').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Connect Hero Arched Books
const heroArchedCards = document.querySelectorAll('.arch-book-card');
heroArchedCards.forEach(card => {
  card.addEventListener('click', () => {
    const bookIdx = Number(card.getAttribute('data-hero-book')) || 0;
    const book = CATALOG_BOOKS[bookIdx];
    if (book) {
      openBookModal(book);
    }
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const bookIdx = Number(card.getAttribute('data-hero-book')) || 0;
      const book = CATALOG_BOOKS[bookIdx];
      if (book) openBookModal(book);
    }
  });
});

// Modal Event Listeners
const modalCloseBtn = $('modalCloseBtn');
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeBookModal);
}

const modalReserveBtn = $('modalReserveBtn');
if (modalReserveBtn) {
  modalReserveBtn.addEventListener('click', () => {
    if (selectedModalBook) {
      closeBookModal();
      selectBookForOrder(selectedModalBook);
    }
  });
}

const bookModal = $('bookModal');
if (bookModal) {
  bookModal.addEventListener('click', (e) => {
    const dialogDimensions = bookModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeBookModal();
    }
  });
}

// ---------- WEATHER & READING PAIRINGS ----------
function tipFor(w) {
  const condition = (w.condition || '').toLowerCase();
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
    return 'Tip: Rainy drizzle in the air! Perfect weather for curling up in our window nook with hot Earl Grey tea and Gothic classic "The Shadow of the Wind". In-store reading tables are prioritized today.';
  }
  if (w.tempC >= 30) {
    return 'Tip: Warm sunny afternoon! Great day to visit our reading garden and browse newly arrived indie paperbacks with a chilled matcha brew.';
  }
  return 'Tip: Crisp and pleasant mountain weather! Ideal conditions to browse the bookstore shelves in peace with warm spiced chai.';
}

async function loadWeather(city) {
  const result = $('weatherResult');
  $('weatherTip').textContent = '';
  result.textContent = 'Loading weather...';

  try {
    const w = await api('/weather?city=' + encodeURIComponent(city));
    result.textContent =
      w.city + ', ' + w.country + ': ' + w.tempC + ' °C, ' + w.condition +
      ' (feels like ' + w.feelsLikeC + ' °C, humidity ' + w.humidity + '%)';
    $('weatherTip').textContent = tipFor(w);
  } catch (err) {
    result.textContent = 'Problem: ' + err.message;
  }
}

$('weatherForm').addEventListener('submit', (event) => {
  event.preventDefault();
  runForm($('weatherForm'), () => loadWeather($('weatherCity').value));
});

// Currency Selector (Stretch Feature / Multi-Currency Support)
const currencySelect = $('currencySelect');
if (currencySelect) {
  currencySelect.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    renderRecommended();
    renderCatalog(currentCategory, currentSearch);
    renderRows();
  });
}

async function loadExchangeRates() {
  try {
    const data = await api('/exchange-rates');
    if (data && data.rates) {
      exchangeRates = { ...exchangeRates, ...data.rates };
    }
  } catch (err) {
    // Keep fallback exchange rates
  }
}

// ---------- INITIALIZE APP ----------
async function start() {
  // Fetch live exchange rates for currency conversion
  await loadExchangeRates();

  // Render Recommended For You (4 Cards matching reference mockup)
  renderRecommended();

  // Render Full 32 Curated Bookstore Editions
  renderCatalog('all', '');

  // Check login state
  if (getToken()) {
    try {
      showLoggedIn(await api('/auth/me'));
    } catch (err) {
      showLoggedOut();
      showMessage(err.message, true);
    }
  } else {
    showLoggedOut();
  }

  // Load orders, customers, and default weather
  await loadCustomers();
  await loadOrders();
  await loadWeather('Lucena City');
}

start();
