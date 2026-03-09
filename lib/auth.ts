import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || '2kvault-secret-key-change-in-production';
const JWT_EXPIRY = '24h';

export interface TokenPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for an authenticated admin user.
 */
export function generateToken(userId: number, username: string): string {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

/**
 * Verify and decode a JWT token. Returns the payload or null if invalid/expired.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Hash a plaintext password using bcrypt.
 */
export function hashPassword(password: string): string {
  return hashSync(password, 10);
}

/**
 * Compare a plaintext password against a bcrypt hash.
 */
export function comparePassword(password: string, hash: string): boolean {
  return compareSync(password, hash);
}
