import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '15139922';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'diamontaris-secret-key-2024';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SECRET_KEY);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    // Rate limiting check could be added here
    const hashedPassword = await hashPassword(password);
    const expectedHash = await hashPassword(ADMIN_PASSWORD);

    if (hashedPassword !== expectedHash) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create session token
    const expiration = Date.now() + SESSION_DURATION;
    const payload = btoa(JSON.stringify({ exp: expiration }));
    const signature = btoa(SECRET_KEY + expiration);
    const token = `${payload}.${signature}`;

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_DURATION / 1000,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_session');
  return response;
}
