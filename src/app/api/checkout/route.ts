import { Resend } from 'resend';
import { NextResponse } from 'next/server';

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
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  // Rate limiting
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const resend = new Resend(apiKey);

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

    const itemsHtml = items.map((item: any) => {
      const itemName = sanitizeHtml(item.name || 'Unknown');
      const itemCategory = sanitizeHtml(item.category || 'N/A');
      const itemMaterial = sanitizeHtml(item.material || 'N/A');
      const itemPrice = sanitizeHtml(item.price || '0');
      const itemImage = sanitizeHtml(item.image || '');
      
      return `
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
          <img src="${itemImage}" alt="${itemName}" style="width: 100px; height: 120px; object-fit: cover; margin-bottom: 10px;" />
          <h3 style="margin: 0; font-family: serif;">${itemName}</h3>
          <p style="margin: 5px 0; color: #666;">Catégorie: ${itemCategory} | Matériau: ${itemMaterial}</p>
          <p style="margin: 5px 0; font-weight: bold;">${itemPrice} MAD</p>
        </div>
      `;
    }).join('');

    const { data, error } = await resend.emails.send({
      from: 'Diamontaris Meubles <onboarding@resend.dev>',
      to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'me.kaoukabi@gmail.com'],
      subject: `Nouvelle Commande - ${sanitizedName} (${sanitizedCity})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #B8860B; font-family: serif; text-align: center;">DIAMONTARIS MEUBLES</h1>
          <p style="text-align: center; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">Demande de devis et livraison</p>

          <div style="background: #f9f9f9; padding: 30px; margin: 30px 0; border: 1px solid #eee;">
            <h2 style="font-size: 18px; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Informations Client</h2>
            <p><strong>Nom:</strong> ${sanitizedName}</p>
            <p><strong>Tél:</strong> ${sanitizedPhone}</p>
            <p><strong>Ville:</strong> ${sanitizedCity}</p>
            <p><strong>Adresse:</strong> ${sanitizedAddress}</p>
          </div>

          <h2 style="font-size: 18px;">Détail de la sélection</h2>
          ${itemsHtml}

          <div style="margin-top: 30px; text-align: right; border-top: 2px solid #B8860B; padding-top: 20px;">
            <p style="font-size: 20px;"><strong>Total Estimé: ${sanitizeHtml(String(totalPrice)).toLocaleString()} MAD</strong></p>
          </div>

          <p style="font-size: 12px; color: #999; margin-top: 50px; text-align: center;">
            Ce message a été généré par la conciergerie Diamontaris Meubles Rabat.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
