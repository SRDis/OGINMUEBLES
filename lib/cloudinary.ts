/**
 * Funciones helper para trabajar con Cloudinary
 * 
 * IMPORTANTE: Para usar estas funciones, necesitas configurar:
 * 1. Variables de entorno en tu archivo .env.local:
 *    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
 *    CLOUDINARY_API_KEY=tu_api_key
 *    CLOUDINARY_API_SECRET=tu_api_secret
 * 
 * 2. Estructura de carpetas en Cloudinary:
 *    Properties/
 *      Ventas/
 *        IDV001/
 *          imagen1.jpg
 *          imagen2.jpg
 *        IDV002/
 *          ...
 *      Rentas/
 *        IDR001/
 *          imagen1.jpg
 *          ...
 */

/**
 * Obtiene las URLs de las imágenes desde una carpeta de Cloudinary
 * 
 * @param folderPath - Ruta de la carpeta en Cloudinary (ej: "Properties/Ventas/IDV001")
 * @returns Array de URLs de imágenes
 */
export async function getImagesFromCloudinaryFolder(folderPath: string): Promise<string[]> {
  if (!folderPath) {
    return [];
  }

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName) {
      console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está configurada');
      return [];
    }

    // Usar la API de búsqueda de Cloudinary (funciona con recursos públicos)
    // La estructura de búsqueda: folder:Properties/Ventas/ID_interno
    return await getImagesFromCloudinarySearch(folderPath, cloudName);
  } catch (error) {
    console.error('Error al obtener imágenes de Cloudinary:', error);
    return [];
  }
}

/**
 * Obtiene imágenes usando búsqueda de Cloudinary
 * Nota: Para usar la API de búsqueda, necesitas configurar las credenciales
 * o usar una API route del lado del servidor
 */
async function getImagesFromCloudinarySearch(folderPath: string, cloudName: string): Promise<string[]> {
  try {
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiKey || !apiSecret) {
      console.warn('[Cloudinary] API credentials no configuradas. No se pueden obtener imágenes desde carpetas.');
      return [];
    }

    if (!cloudName) {
      console.warn('[Cloudinary] Cloud name no configurado.');
      return [];
    }

    // Construir la expresión de búsqueda
    // Usar comillas para la ruta de carpeta para evitar problemas con caracteres especiales
    const expression = `folder:"${folderPath}" AND resource_type:image`;
    
    console.log(`[Cloudinary] Buscando con expresión: ${expression}`);
    
    // Usar Admin API con autenticación básica
    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authString}`
        },
        body: JSON.stringify({
          expression: expression,
          max_results: 500,
          sort: [{ field: 'public_id', direction: 'asc' }]
        }),
        next: { revalidate: 300 } // Cache por 5 minutos
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Cloudinary] Error ${response.status} en API:`, errorText);
      console.error(`[Cloudinary] Ruta buscada: ${folderPath}`);
      console.error(`[Cloudinary] Cloud name: ${cloudName}`);
      
      // Si es un error 401, las credenciales son incorrectas
      if (response.status === 401) {
        console.error('[Cloudinary] Error de autenticación. Verifica CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET');
      }
      // Si es un error 400, la expresión puede estar mal formada
      if (response.status === 400) {
        console.error('[Cloudinary] Error de sintaxis en la expresión de búsqueda. Verifica la estructura de carpetas.');
      }
      
      return [];
    }

    const data = await response.json();
    
    if (data.resources && data.resources.length > 0) {
      console.log(`[Cloudinary] Encontradas ${data.resources.length} imágenes en ${folderPath}`);
      
      const imageResources = data.resources
        .filter((resource: any) => {
          const format = resource.format?.toLowerCase();
          return format && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(format);
        })
        .sort((a: any, b: any) => a.public_id.localeCompare(b.public_id))
        .map((resource: any) => 
          getCloudinaryImageUrl(resource.public_id, cloudName)
        );
      
      return imageResources;
    } else {
      console.warn(`[Cloudinary] No se encontraron imágenes en: ${folderPath}`);
    }

    return [];
  } catch (error) {
    console.error('[Cloudinary] Error en búsqueda:', error);
    if (error instanceof Error) {
      console.error('[Cloudinary] Mensaje de error:', error.message);
    }
    return [];
  }
}

/**
 * Genera firma para Cloudinary (si es necesario)
 */
async function generateCloudinarySignature(
  folderPath: string,
  timestamp: number,
  apiSecret: string
): Promise<string> {
  // Para la mayoría de casos, no necesitamos firma si usamos Admin API con Basic Auth
  return '';
}

/**
 * Obtiene imágenes desde Cloudinary usando ID interno y status
 * 
 * @param internalId - ID interno de la propiedad
 * @param status - Status de la propiedad ('venta' o 'renta')
 * @returns Array de URLs de imágenes
 */
export async function getImagesByInternalId(
  internalId: string,
  status: 'venta' | 'renta'
): Promise<string[]> {
  if (!internalId) {
    return [];
  }

  // Mapear status a nombres de carpeta en Cloudinary
  // "venta" → "Ventas", "renta" → "Rentas"
  const folderName = status === 'venta' ? 'Ventas' : 'Rentas';
  
  // Construir la ruta: Properties/Ventas/ID_interno o Properties/Rentas/ID_interno
  const folderPath = `Properties/${folderName}/${internalId}`;
  
  console.log(`[Cloudinary] Buscando imágenes en: ${folderPath}`); // Para debugging
  
  return await getImagesFromCloudinaryFolder(folderPath);
}

/**
 * Construye URL de imagen de Cloudinary con transformaciones
 * 
 * @param publicId - Public ID de la imagen en Cloudinary
 * @param cloudName - Cloud name de Cloudinary
 * @param transformations - Transformaciones opcionales (ej: "w_1000,h_1000,c_fill")
 * @returns URL completa de la imagen
 */
export function getCloudinaryImageUrl(
  publicId: string,
  cloudName?: string,
  transformations: string = 'w_1000,h_1000,c_fill,q_auto'
): string {
  const cloud = cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  
  if (!cloud) {
    console.warn('Cloudinary cloud name no configurado');
    return '';
  }

  // Remover la extensión del public_id si existe (Cloudinary la maneja automáticamente)
  const cleanPublicId = publicId.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  
  return `https://res.cloudinary.com/${cloud}/image/upload/${transformations}/${cleanPublicId}`;
}

/**
 * Construye URL de thumbnail optimizado
 */
export function getCloudinaryThumbnailUrl(
  publicId: string,
  width: number = 1000,
  height: number = 1000
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const transformations = `w_${width},h_${height},c_fill,q_auto,f_auto`;
  return getCloudinaryImageUrl(publicId, cloudName, transformations);
}

/**
 * Helper para obtener URL de imagen desde main_image_id
 * Detecta si es un public_id de Cloudinary o una URL completa
 * Funciona tanto en servidor como en cliente
 */
export function getImageUrlFromId(imageId: string | null | undefined): string {
  if (!imageId) {
    return '/images/placeholder.jpg';
  }

  // Si ya es una URL completa, retornarla
  if (imageId.startsWith('http')) {
    return imageId;
  }

  // Si es un public_id de Cloudinary, construir la URL
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName) {
    return getCloudinaryThumbnailUrl(imageId);
  }

  // Fallback: asumir que es un public_id y construir URL básica
  return imageId;
}

/**
 * Función helper para obtener URL de thumbnail desde main_image_id
 * Usar esta función en componentes del cliente
 */
export function getMainImageUrl(publicId: string | null | undefined): string {
  if (!publicId) {
    return '/images/placeholder.jpg';
  }

  // Si ya es una URL, retornarla
  if (publicId.startsWith('http')) {
    return publicId;
  }

  // Obtener cloud name (funciona en cliente porque tiene NEXT_PUBLIC_)
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your-cloud';
  
  // Construir URL de Cloudinary
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_1000,h_1000,c_fill,q_auto,f_auto/${publicId}`;
}

/**
 * Obtiene una imagen aleatoria de una propiedad desde Cloudinary (servidor)
 * 
 * @param internalId - ID interno de la propiedad
 * @param status - Status de la propiedad ('venta' o 'renta')
 * @returns URL de una imagen aleatoria o string vacío si no hay imágenes
 */
export async function getRandomPropertyImage(
  internalId: string,
  status: 'venta' | 'renta'
): Promise<string> {
  const images = await getImagesByInternalId(internalId, status);
  if (images.length === 0) {
    return '';
  }
  // Seleccionar una imagen aleatoria
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

/**
 * Obtiene una imagen aleatoria de una propiedad desde Cloudinary (cliente)
 * Usa la API route para acceder a la función del servidor
 * 
 * @param internalId - ID interno de la propiedad
 * @param status - Status de la propiedad ('venta' o 'renta')
 * @returns URL de una imagen aleatoria o string vacío si no hay imágenes
 */
export async function getRandomPropertyImageClient(
  internalId: string,
  status: 'venta' | 'renta'
): Promise<string> {
  try {
    const response = await fetch(
      `/api/property-image?internalId=${encodeURIComponent(internalId)}&status=${encodeURIComponent(status)}`
    );
    
    if (!response.ok) {
      console.error('Error al obtener imagen:', response.statusText);
      return '';
    }
    
    const data = await response.json();
    return data.imageUrl || '';
  } catch (error) {
    console.error('Error al obtener imagen aleatoria:', error);
    return '';
  }
}
