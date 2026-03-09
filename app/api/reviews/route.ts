import { NextResponse } from 'next/server';
import { getReviews } from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

/**
 * GET /api/reviews
 * Returns all reviews.
 */
export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json(reviews, { headers: corsHeaders });
  } catch (error) {
    console.error('GET /api/reviews error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500, headers: corsHeaders }
    );
  }
}
