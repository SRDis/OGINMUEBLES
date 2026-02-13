import { NextRequest, NextResponse } from 'next/server';
import { getRandomPropertyImage } from '@/lib/cloudinary';

// Marcar explícitamente como ruta dinámica
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const internalId = searchParams.get('internalId');
    const status = searchParams.get('status') as 'venta' | 'renta' | null;

    if (!internalId || !status) {
      return NextResponse.json(
        { error: 'internalId y status son requeridos' },
        { status: 400 }
      );
    }

    const imageUrl = await getRandomPropertyImage(internalId, status);
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No se encontró imagen para esta propiedad' },
        { status: 404 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error al obtener imagen de propiedad:', error);
    return NextResponse.json(
      { error: 'Error al obtener imagen' },
      { status: 500 }
    );
  }
}
