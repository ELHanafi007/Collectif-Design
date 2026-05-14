import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'diamontaris-secret-key-2024';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session');

  if (!token || !token.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const payload = JSON.parse(atob(token.value.split('.')[0]));
    if (payload.exp < Date.now()) {
      const response = NextResponse.json({ authenticated: false }, { status: 401 });
      response.cookies.delete('admin_session');
      return response;
    }
    return NextResponse.json({ authenticated: true });
  } catch {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete('admin_session');
    return response;
  }
}
