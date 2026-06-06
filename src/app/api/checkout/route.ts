import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

type CheckoutItem = {
  name?: string;
  category?: string;
  material?: string;
  price?: string | number;
  image?: string;
  quantity?: number;
};

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function getClientIp(request: Request): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour window
    return true;
  }
  
  if (limit.count >= 5) { // Max 5 requests per hour
    return false;
  }
  
  limit.count++;
  return true;
}

export async function POST(request: Request) {
  // Rate limiting
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { name, city, address, phone, items, totalPrice } = body;

    // Input validation
    if (!name || !city || !address || !phone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeHtml(name);
    const sanitizedCity = sanitizeHtml(city);
    const sanitizedAddress = sanitizeHtml(address);
    const sanitizedPhone = sanitizeHtml(phone);

    // Validate phone number format
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Validate items
    if (items.length > 50) {
      return NextResponse.json({ error: "Too many items" }, { status: 400 });
    }

    // Save order to Supabase
    const { error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          name: sanitizedName,
          phone: sanitizedPhone,
          city: sanitizedCity,
          address: sanitizedAddress,
          total_price: Number(totalPrice),
          items: items
        }
      ]);

    if (dbError) {
      console.error('Failed to save order to Supabase:', dbError);
      return NextResponse.json({ 
        error: `Erreur de base de données: ${dbError.message}. Veuillez vous assurer que la table 'orders' a été créée dans Supabase.` 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
