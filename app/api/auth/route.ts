import { NextRequest, NextResponse } from 'next/server';
import { getAdminByUsername } from '@/lib/db';
import { comparePassword, generateToken } from '@/lib/auth';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

/**
 * POST /api/auth
 * Admin login. Accepts { username, password }.
 * Returns { token, username } on success, 401 on failure.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const admin = getAdminByUsername(username);
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: corsHeaders }
      );
    }

    const passwordMatch = comparePassword(password, admin.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: corsHeaders }
      );
    }

    const token = generateToken(admin.id, admin.username);

    return NextResponse.json(
      { token, username: admin.username },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('POST /api/auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}
