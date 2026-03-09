import { NextRequest, NextResponse } from 'next/server';
import { getListingById, updateListing, deleteListing } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

/**
 * Extract and verify admin token from Authorization header.
 * Returns the decoded payload or null.
 */
function authenticateAdmin(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.slice(7);
  return verifyToken(token);
}

/**
 * GET /api/listings/[id]
 * Return a single listing by its ID.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const listing = await getListingById(id);

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { ...listing, image_urls: JSON.parse(listing.image_urls || '[]') },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('GET /api/listings/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * PUT /api/listings/[id]
 * Update a listing (admin only). Can update any field including status.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Admin authentication required
    const admin = authenticateAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401, headers: corsHeaders }
      );
    }

    const { id } = params;
    const body = await request.json();

    const updated = await updateListing(id, body);
    if (!updated) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { ...updated, image_urls: JSON.parse(updated.image_urls || '[]') },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('PUT /api/listings/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update listing' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * DELETE /api/listings/[id]
 * Delete a listing (admin only).
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Admin authentication required
    const admin = authenticateAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401, headers: corsHeaders }
      );
    }

    const { id } = params;
    const deleted = await deleteListing(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: 'Listing deleted successfully' },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('DELETE /api/listings/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete listing' },
      { status: 500, headers: corsHeaders }
    );
  }
}
