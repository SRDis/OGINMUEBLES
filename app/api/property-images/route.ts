import { NextRequest, NextResponse } from 'next/server';
import { getImagesByInternalId } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const internalId = searchParams.get('internalId');
  const status = searchParams.get('status') as 'venta' | 'renta' | null;

  if (!internalId || !status) {
    return NextResponse.json(
      { error: 'internalId y status son requeridos' },
      { status: 400 }
    );
  }

  try {
    const imageUrls = await getImagesByInternalId(internalId, status);
    return NextResponse.json({ imageUrls });
  } catch (error) {
    console.error('Error al obtener imágenes de la propiedad:', error);
    return NextResponse.json(
      { error: 'Error al obtener imágenes', imageUrls: [] },
      { status: 500 }
    );
  }
}
