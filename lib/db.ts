import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { hashSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, '2kvault.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  // Auto-create data directory
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  _db.pragma('foreign_keys = ON');

  initTables(_db);
  seedData(_db);

  return _db;
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      console TEXT NOT NULL,
      rep_level TEXT NOT NULL,
      rep_percent INTEGER NOT NULL DEFAULT 0,
      price REAL NOT NULL,
      image_urls TEXT DEFAULT '[]',
      status TEXT NOT NULL DEFAULT 'pending',
      seller_name TEXT NOT NULL,
      seller_discord TEXT,
      seller_email TEXT,
      featured INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      text TEXT NOT NULL,
      service TEXT,
      rating INTEGER DEFAULT 5
    );
  `);
}

function seedData(db: Database.Database) {
  // Ensure only the owner admin account exists
  const adminExists = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('Klinti');
  if (!adminExists) {
    // Remove any old admin accounts and create the owner account
    db.prepare('DELETE FROM admin_users').run();
    const hash = hashSync('Klinti2011', 10);
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('Klinti', hash);
  }

  // Seed sample listings if table is empty
  const listingCount = db.prepare('SELECT COUNT(*) as count FROM listings').get() as { count: number };
  if (listingCount.count === 0) {
    const sampleListings = [
      {
        title: 'Legend 1 PS5 Account - Max Badges',
        description: 'Fully maxed Legend 1 account with all badges unlocked. 99 overall PG/SG build with elite dribble moves. Comes with 2M VC and multiple outfits.',
        console: 'PS5',
        rep_level: 'Legend 1',
        rep_percent: 100,
        price: 299.99,
        seller_name: 'EliteHoops',
        seller_discord: 'EliteHoops#4521',
        seller_email: 'elitehoops@email.com',
        status: 'sold',
      },
      {
        title: 'Veteran 3 Xbox Build - 99 OVR Center',
        description: 'Dominant 99 overall Center build. Veteran 3 rep with 78% completion. All defensive badges HOF. Great for Rec and Pro-Am.',
        console: 'Xbox Series X/S',
        rep_level: 'Veteran 3',
        rep_percent: 78,
        price: 149.99,
        seller_name: 'PaintBeast',
        seller_discord: 'PaintBeast#8833',
        seller_email: 'paintbeast@email.com',
        status: 'sold',
      },
      {
        title: 'All-Star 2 PS5 - Two Builds Included',
        description: 'Two fully built 99 overall characters. PG with elite playmaking and a lockdown SF. All-Star 2 rep. 500K VC included.',
        console: 'PS5',
        rep_level: 'All-Star 2',
        rep_percent: 45,
        price: 119.99,
        seller_name: 'CourtKing',
        seller_discord: 'CourtKing#2210',
        seller_email: 'courtking@email.com',
        status: 'sold',
      },
      {
        title: 'Superstar 1 Xbox - Rare Animations',
        description: 'Superstar 1 account with rare dribble animations and custom jumpshot. 97 overall PG. Park record 340-120. Premium wardrobes.',
        console: 'Xbox Series X/S',
        rep_level: 'Superstar 1',
        rep_percent: 15,
        price: 179.99,
        seller_name: 'DribbleGod',
        seller_discord: 'DribbleGod#5590',
        seller_email: 'dribblegod@email.com',
        status: 'sold',
      },
      {
        title: 'Legend 2 PS5 - Ultimate Package',
        description: 'Legend 2 account with three 99 overall builds. Over 5000 park games played. Comes with 3M VC, all mascots unlocked, and full badge loadouts.',
        console: 'PS5',
        rep_level: 'Legend 2',
        rep_percent: 30,
        price: 449.99,
        seller_name: '2KVeteran',
        seller_discord: '2KVeteran#1100',
        seller_email: '2kveteran@email.com',
        status: 'sold',
      },
      {
        title: 'Veteran 1 Xbox - Budget Build',
        description: 'Solid Veteran 1 account with a 96 overall SG. Good park record and all shooting badges maxed. Great starter account.',
        console: 'Xbox Series X/S',
        rep_level: 'Veteran 1',
        rep_percent: 90,
        price: 79.99,
        seller_name: 'BucketGetter',
        seller_discord: 'BucketGetter#7744',
        seller_email: 'bucketgetter@email.com',
        status: 'sold',
      },
      {
        title: 'Superstar 3 PS5 - Pro-Am Ready',
        description: 'Superstar 3 with a dedicated Pro-Am team slot. 99 overall PF/C two-way build. All defensive and finishing badges on HOF.',
        console: 'PS5',
        rep_level: 'Superstar 3',
        rep_percent: 60,
        price: 219.99,
        seller_name: 'GlassCleaner',
        seller_discord: 'GlassCleaner#3399',
        seller_email: 'glasscleaner@email.com',
        status: 'sold',
      },
      {
        title: 'All-Star 3 Xbox - Sniper Build',
        description: 'All-Star 3 rep with a deadly 98 overall shooting guard. 65% 3PT in park. All shooting badges HOF. Custom green window jumpshot.',
        console: 'Xbox Series X/S',
        rep_level: 'All-Star 3',
        rep_percent: 82,
        price: 139.99,
        seller_name: 'SplashBro',
        seller_discord: 'SplashBro#6611',
        seller_email: 'splashbro@email.com',
        status: 'sold',
      },
      {
        title: 'Veteran 2 PS5 - Comp Guard',
        description: 'Competitive Veteran 2 guard with 70% win rate in park. 99 overall with maxed playmaking and shooting. 1.5M VC on account.',
        console: 'PS5',
        rep_level: 'Veteran 2',
        rep_percent: 55,
        price: 129.99,
        seller_name: 'ISOKing',
        seller_discord: 'ISOKing#9922',
        seller_email: 'isoking@email.com',
        status: 'sold',
      },
      {
        title: 'Superstar 2 Xbox - Multiple Builds',
        description: 'Superstar 2 account featuring four different 98+ overall builds covering all positions. Great for versatile gameplay. 800K VC included.',
        console: 'Xbox Series X/S',
        rep_level: 'Superstar 2',
        rep_percent: 40,
        price: 199.99,
        seller_name: 'VersatilePlayer',
        seller_discord: 'VersatilePlayer#4400',
        seller_email: 'versatile@email.com',
        status: 'sold',
      },
    ];

    const insertListing = db.prepare(`
      INSERT INTO listings (id, title, description, console, rep_level, rep_percent, price, image_urls, status, seller_name, seller_discord, seller_email, featured, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction(() => {
      for (const listing of sampleListings) {
        const now = new Date().toISOString();
        insertListing.run(
          uuidv4(),
          listing.title,
          listing.description,
          listing.console,
          listing.rep_level,
          listing.rep_percent,
          listing.price,
          '[]',
          listing.status,
          listing.seller_name,
          listing.seller_discord,
          listing.seller_email,
          0,
          now,
          now
        );
      }
    });
    insertMany();
  }

  // Seed sample reviews if table is empty
  const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get() as { count: number };
  if (reviewCount.count === 0) {
    const sampleReviews = [
      {
        name: 'Marcus T.',
        text: 'Copped a Legend account from 2kVault and it was exactly as described. Transfer was smooth and the seller was super responsive. 10/10 would buy again.',
        service: 'Account Purchase',
        rating: 5,
      },
      {
        name: 'DeShawn R.',
        text: 'Was skeptical at first but 2kVault is legit. Got my Superstar 3 account within an hour of payment. All badges were there, VC was right. No cap, best marketplace out there.',
        service: 'Account Purchase',
        rating: 5,
      },
      {
        name: 'Tyler K.',
        text: 'Sold my old 2K account here after I switched to Xbox. Got a fair price and the process was easy. They handled everything professionally.',
        service: 'Account Sale',
        rating: 5,
      },
      {
        name: 'Jordan W.',
        text: 'The middleman service gave me peace of mind. Bought a Veteran 2 PS5 account and the escrow system made sure both sides were protected. Great experience.',
        service: 'Middleman Service',
        rating: 5,
      },
      {
        name: 'Chris B.',
        text: 'Fast delivery, account was exactly as listed. My new Legend build is insane in the park. Support team answered all my questions within minutes.',
        service: 'Account Purchase',
        rating: 5,
      },
      {
        name: 'Aiden P.',
        text: 'I have bought 3 accounts from different sellers on 2kVault. Every single time it has been smooth. The verification process they use is solid. Highly recommend.',
        service: 'Account Purchase',
        rating: 5,
      },
      {
        name: 'Jamal H.',
        text: 'Listed my account and it sold within 2 days. Got paid quickly through their system. Way better than trying to sell on Reddit or Discord where you might get scammed.',
        service: 'Account Sale',
        rating: 4,
      },
      {
        name: 'Brandon L.',
        text: 'Good prices compared to other sites. Picked up an All-Star 3 Xbox account with a crazy sniper build. The jumpshot is butter. Only wish there were more Xbox listings.',
        service: 'Account Purchase',
        rating: 4,
      },
    ];

    const insertReview = db.prepare(
      'INSERT INTO reviews (name, text, service, rating) VALUES (?, ?, ?, ?)'
    );

    const insertManyReviews = db.transaction(() => {
      for (const review of sampleReviews) {
        insertReview.run(review.name, review.text, review.service, review.rating);
      }
    });
    insertManyReviews();
  }
}

// ─── Query Functions ───────────────────────────────────────────────────────────

export interface ListingRow {
  id: string;
  title: string;
  description: string;
  console: string;
  rep_level: string;
  rep_percent: number;
  price: number;
  image_urls: string;
  status: string;
  seller_name: string;
  seller_discord: string;
  seller_email: string;
  featured: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewRow {
  id: number;
  name: string;
  text: string;
  service: string;
  rating: number;
}

export interface AdminRow {
  id: number;
  username: string;
  password_hash: string;
}

export function getAllListings(status?: string, consoleFilter?: string): ListingRow[] {
  const db = getDb();
  let query = 'SELECT * FROM listings';
  const conditions: string[] = [];
  const params: string[] = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (consoleFilter) {
    conditions.push('console = ?');
    params.push(consoleFilter);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY created_at DESC';

  return db.prepare(query).all(...params) as ListingRow[];
}

export function getListingById(id: string): ListingRow | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM listings WHERE id = ?').get(id) as ListingRow | undefined;
}

export interface CreateListingData {
  title: string;
  description?: string;
  console: string;
  rep_level: string;
  rep_percent: number;
  price: number;
  image_urls?: string[];
  seller_name: string;
  seller_discord?: string;
  seller_email?: string;
}

export function createListing(data: CreateListingData): ListingRow {
  const db = getDb();
  const id = uuidv4();
  const now = new Date().toISOString();
  const imageUrls = JSON.stringify(data.image_urls || []);

  db.prepare(`
    INSERT INTO listings (id, title, description, console, rep_level, rep_percent, price, image_urls, status, seller_name, seller_discord, seller_email, featured, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, 0, ?, ?)
  `).run(
    id,
    data.title,
    data.description || '',
    data.console,
    data.rep_level,
    data.rep_percent,
    data.price,
    imageUrls,
    data.seller_name,
    data.seller_discord || '',
    data.seller_email || '',
    now,
    now
  );

  return getListingById(id) as ListingRow;
}

export function updateListing(id: string, data: Partial<ListingRow>): ListingRow | undefined {
  const db = getDb();
  const existing = getListingById(id);
  if (!existing) return undefined;

  const updatable: Record<string, unknown> = { ...data };
  delete updatable.id;
  delete updatable.created_at;

  // Handle image_urls if passed as array
  if (Array.isArray(updatable.image_urls)) {
    updatable.image_urls = JSON.stringify(updatable.image_urls);
  }

  updatable.updated_at = new Date().toISOString();

  const keys = Object.keys(updatable);
  if (keys.length === 0) return existing;

  const setClause = keys.map((k) => `${k} = ?`).join(', ');
  const values = keys.map((k) => updatable[k]);

  db.prepare(`UPDATE listings SET ${setClause} WHERE id = ?`).run(...values, id);

  return getListingById(id);
}

export function deleteListing(id: string): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM listings WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getReviews(): ReviewRow[] {
  const db = getDb();
  return db.prepare('SELECT * FROM reviews ORDER BY id DESC').all() as ReviewRow[];
}

export function getAdminByUsername(username: string): AdminRow | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as AdminRow | undefined;
}
