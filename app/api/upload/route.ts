import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Allowed image MIME types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

// Max file size: 10MB
const MAX_SIZE = 10 * 1024 * 1024;

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

/**
 * POST /api/upload
 * Handle image upload. Accepts FormData with a 'file' field.
 * Saves to public/uploads/ with a UUID filename.
 * Returns { url: '/uploads/filename.ext' }.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Send a "file" field in FormData.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_SIZE / (1024 * 1024)}MB.` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Determine file extension from MIME type
    const extMap: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    };
    const ext = extMap[file.type] || '.jpg';

    // Generate unique filename
    const filename = `${uuidv4()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    const url = `/uploads/${filename}`;

    return NextResponse.json(
      { url, filename },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('POST /api/upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500, headers: corsHeaders }
    );
  }
}
