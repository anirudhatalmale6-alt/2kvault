import { NextRequest, NextResponse } from 'next/server';
import { getAllListings, createListing, updateListing, CreateListingData } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

/**
 * GET /api/listings
 * Returns all listings. Optional query params: status, console.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const consoleFilter = searchParams.get('console') || undefined;

    const listings = getAllListings(status, consoleFilter);

    // Parse image_urls JSON for each listing
    const parsed = listings.map((l) => ({
      ...l,
      image_urls: JSON.parse(l.image_urls || '[]'),
    }));

    return NextResponse.json(parsed, { headers: corsHeaders });
  } catch (error) {
    console.error('GET /api/listings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * POST /api/listings
 * Create a new listing from the seller form. Sets status to 'pending'.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['title', 'console', 'rep_level', 'rep_percent', 'price', 'seller_name'];
    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Validate console value
    if (!['PS5', 'Xbox Series X/S'].includes(body.console)) {
      return NextResponse.json(
        { error: 'Console must be "PS5" or "Xbox Series X/S"' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate price
    if (typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400, headers: corsHeaders }
      );
    }

    const data: CreateListingData = {
      title: body.title,
      description: body.description,
      console: body.console,
      rep_level: body.rep_level,
      rep_percent: Number(body.rep_percent),
      price: Number(body.price),
      image_urls: body.image_urls || [],
      seller_name: body.seller_name,
      seller_discord: body.seller_discord,
      seller_email: body.seller_email,
    };

    const listing = createListing(data);

    // If admin is authenticated and requested a specific status, apply it immediately
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const admin = verifyToken(token);
      if (admin && body.status && body.status !== 'pending') {
        updateListing(listing.id, { status: body.status, featured: body.featured ?? 0 });
      }
    }

    // Re-fetch to get updated status
    const final = { ...listing, ...(body.status !== 'pending' ? { status: body.status || 'pending' } : {}), image_urls: JSON.parse(listing.image_urls || '[]') };

    return NextResponse.json(
      final,
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('POST /api/listings error:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500, headers: corsHeaders }
    );
  }
}
