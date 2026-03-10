import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { hashSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// ─── Supabase Client ─────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(supabaseUrl, supabaseKey);
  return _client;
}

// ─── Seed ────────────────────────────────────────────────────────────────────

let _seeded = false;

async function ensureSeeded(): Promise<void> {
  if (_seeded) return;
  _seeded = true;

  const client = getClient();

  // Seed admin if not exists
  const { data: admin } = await client
    .from('admin_users')
    .select('id')
    .eq('username', 'Klinti')
    .single();

  if (!admin) {
    await client.from('admin_users').delete().neq('id', 0);
    const hash = hashSync('Klinti2011', 10);
    await client.from('admin_users').insert({ username: 'Klinti', password_hash: hash });
  }

  // Seed reviews if empty
  const { count: reviewCount } = await client
    .from('reviews')
    .select('*', { count: 'exact', head: true });

  if (!reviewCount || reviewCount === 0) {
    await client.from('reviews').insert([
      { name: 'Marcus T.', text: 'Copped a Legend account from 2kVault and it was exactly as described. Transfer was smooth and the seller was super responsive. 10/10 would buy again.', service: 'Account Purchase', rating: 5 },
      { name: 'DeShawn R.', text: 'Was skeptical at first but 2kVault is legit. Got my Superstar 3 account within an hour of payment. All badges were there, VC was right. No cap, best marketplace out there.', service: 'Account Purchase', rating: 5 },
      { name: 'Tyler K.', text: 'Sold my old 2K account here after I switched to Xbox. Got a fair price and the process was easy. They handled everything professionally.', service: 'Account Sale', rating: 5 },
      { name: 'Jordan W.', text: 'The middleman service gave me peace of mind. Bought a Veteran 2 PS5 account and the escrow system made sure both sides were protected. Great experience.', service: 'Middleman Service', rating: 5 },
      { name: 'Chris B.', text: 'Fast delivery, account was exactly as listed. My new Legend build is insane in the park. Support team answered all my questions within minutes.', service: 'Account Purchase', rating: 5 },
      { name: 'Aiden P.', text: 'I have bought 3 accounts from different sellers on 2kVault. Every single time it has been smooth. The verification process they use is solid. Highly recommend.', service: 'Account Purchase', rating: 5 },
      { name: 'Jamal H.', text: 'Listed my account and it sold within 2 days. Got paid quickly through their system. Way better than trying to sell on Reddit or Discord where you might get scammed.', service: 'Account Sale', rating: 4 },
      { name: 'Brandon L.', text: 'Good prices compared to other sites. Picked up an All-Star 3 Xbox account with a crazy sniper build. The jumpshot is butter. Only wish there were more Xbox listings.', service: 'Account Purchase', rating: 4 },
    ]);
  }

  // Seed sample sold listings if empty
  const { count: listingCount } = await client
    .from('listings')
    .select('*', { count: 'exact', head: true });

  if (!listingCount || listingCount === 0) {
    const now = new Date().toISOString();
    const samples = [
      { title: 'Legend 1 PS5 Account - Max Badges', description: 'Fully maxed Legend 1 account with all badges unlocked. 99 overall PG/SG build.', console: 'PS5', rep_level: 'Legend 1', rep_percent: 100, price: 299.99, seller_name: 'EliteHoops', seller_discord: 'EliteHoops#4521', seller_email: '', status: 'sold' },
      { title: 'Veteran 3 Xbox Build - 99 OVR Center', description: 'Dominant 99 overall Center build. Veteran 3 rep. All defensive badges HOF.', console: 'Xbox Series X/S', rep_level: 'Veteran 3', rep_percent: 78, price: 149.99, seller_name: 'PaintBeast', seller_discord: 'PaintBeast#8833', seller_email: '', status: 'sold' },
      { title: 'Legend 2 PS5 - Ultimate Package', description: 'Legend 2 account with three 99 overall builds. 5000 park games. 3M VC.', console: 'PS5', rep_level: 'Legend 2', rep_percent: 30, price: 449.99, seller_name: '2KVeteran', seller_discord: '2KVeteran#1100', seller_email: '', status: 'sold' },
      { title: 'Veteran 1 Xbox - Budget Build', description: 'Solid Veteran 1 account with 96 overall SG. All shooting badges maxed.', console: 'Xbox Series X/S', rep_level: 'Veteran 1', rep_percent: 90, price: 79.99, seller_name: 'BucketGetter', seller_discord: 'BucketGetter#7744', seller_email: '', status: 'sold' },
      { title: 'Veteran 2 PS5 - Comp Guard', description: 'Competitive Veteran 2 guard. 70% win rate. 99 overall maxed playmaking.', console: 'PS5', rep_level: 'Veteran 2', rep_percent: 55, price: 129.99, seller_name: 'ISOKing', seller_discord: 'ISOKing#9922', seller_email: '', status: 'sold' },
    ].map(l => ({ ...l, id: uuidv4(), image_urls: '[]', featured: 0, created_at: now, updated_at: now }));
    await client.from('listings').insert(samples);
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Query Functions ─────────────────────────────────────────────────────────

export async function getAllListings(status?: string, consoleFilter?: string): Promise<ListingRow[]> {
  await ensureSeeded();
  const client = getClient();

  let query = client.from('listings').select('*');
  if (status) query = query.eq('status', status);
  if (consoleFilter) query = query.eq('console', consoleFilter);
  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) { console.error('getAllListings error:', error); return []; }
  return (data || []) as ListingRow[];
}

export async function getListingById(id: string): Promise<ListingRow | undefined> {
  await ensureSeeded();
  const client = getClient();
  const { data, error } = await client.from('listings').select('*').eq('id', id).single();
  if (error || !data) return undefined;
  return data as ListingRow;
}

export async function createListing(data: CreateListingData): Promise<ListingRow> {
  await ensureSeeded();
  const client = getClient();
  const id = uuidv4();
  const now = new Date().toISOString();
  const imageUrls = JSON.stringify(data.image_urls || []);

  const row = {
    id, title: data.title, description: data.description || '', console: data.console,
    rep_level: data.rep_level, rep_percent: data.rep_percent, price: data.price,
    image_urls: imageUrls, status: 'pending', seller_name: data.seller_name,
    seller_discord: data.seller_discord || '', seller_email: data.seller_email || '',
    featured: 0, created_at: now, updated_at: now,
  };

  const { error } = await client.from('listings').insert(row);
  if (error) console.error('createListing error:', error);
  return row as ListingRow;
}

export async function updateListing(id: string, data: Partial<ListingRow>): Promise<ListingRow | undefined> {
  await ensureSeeded();
  const client = getClient();
  const existing = await getListingById(id);
  if (!existing) return undefined;

  const updatable: Record<string, unknown> = { ...data };
  delete updatable.id;
  delete updatable.created_at;
  if (Array.isArray(updatable.image_urls)) updatable.image_urls = JSON.stringify(updatable.image_urls);
  updatable.updated_at = new Date().toISOString();

  const { error } = await client.from('listings').update(updatable).eq('id', id);
  if (error) { console.error('updateListing error:', error); return existing; }
  return await getListingById(id);
}

export async function deleteListing(id: string): Promise<boolean> {
  await ensureSeeded();
  const client = getClient();
  const { error } = await client.from('listings').delete().eq('id', id);
  if (error) { console.error('deleteListing error:', error); return false; }
  return true;
}

export async function getReviews(): Promise<ReviewRow[]> {
  await ensureSeeded();
  const client = getClient();
  const { data, error } = await client.from('reviews').select('*').order('id', { ascending: false });
  if (error) { console.error('getReviews error:', error); return []; }
  return (data || []) as ReviewRow[];
}

export async function getAdminByUsername(username: string): Promise<AdminRow | undefined> {
  await ensureSeeded();
  const client = getClient();
  const { data, error } = await client.from('admin_users').select('*').eq('username', username).single();
  if (error || !data) return undefined;
  return data as AdminRow;
}

// ─── Image Upload via Supabase Storage ───────────────────────────────────────

export async function uploadImage(file: Buffer, filename: string, contentType: string): Promise<string> {
  const client = getClient();
  const { error } = await client.storage.from('uploads').upload(filename, file, { contentType, upsert: true });
  if (error) { console.error('uploadImage error:', error); throw new Error('Failed to upload image'); }
  const { data: urlData } = client.storage.from('uploads').getPublicUrl(filename);
  return urlData.publicUrl;
}
