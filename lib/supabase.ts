import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Función helper para obtener URL de imagen de Cloudinary
// Mantenemos compatibilidad con código legacy que pueda usar estas funciones
export function getGoogleDriveImageUrl(publicId: string): string {
  // Si es un public_id de Cloudinary, usar Cloudinary
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName && publicId && !publicId.startsWith('http')) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_1000,h_1000,c_fill,q_auto/${publicId}`;
  }
  // Fallback a URL directa si ya es una URL completa
  return publicId;
}

// Función alternativa para obtener URL directa (ahora de Cloudinary)
export function getGoogleDriveDirectUrl(publicId: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName && publicId && !publicId.startsWith('http')) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
  }
  return publicId;
}