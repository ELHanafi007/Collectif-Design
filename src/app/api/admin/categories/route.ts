import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

// Helper to verify authorization
async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session');

  if (!token || !token.value) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.value.split('.')[0]));
    if (payload.exp < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

const categoriesFilePath = path.join(process.cwd(), 'src/data/categories.json');

export async function GET() {
  try {
    if (!fs.existsSync(categoriesFilePath)) {
      return NextResponse.json([], { status: 404 });
    }
    const fileData = fs.readFileSync(categoriesFilePath, 'utf8');
    const categories = JSON.parse(fileData);
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
  }

  try {
    const categories = await request.json();
    
    // Validate that categories is an array
    if (!Array.isArray(categories)) {
      return NextResponse.json({ error: 'Invalid categories format. Must be an array.' }, { status: 400 });
    }

    // Write to JSON file
    fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Categories updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
