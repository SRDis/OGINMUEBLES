import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

// Singleton para el cliente de Supabase en el lado del cliente
// Esto previene la creación de múltiples instancias que causan el warning de GoTrueClient
let supabaseClientInstance: SupabaseClient | null = null;

/**
 * Obtiene una instancia singleton del cliente de Supabase para componentes del cliente.
 * Esto previene la creación de múltiples instancias que causan warnings.
 * 
 * IMPORTANTE: Este cliente debe usarse solo en componentes del cliente ('use client').
 * Para el servidor, usa createServerComponentClient o createRouteHandlerClient.
 * 
 * Retorna null si se llama en el servidor (durante prerenderizado).
 */
export function getSupabaseClient(): SupabaseClient | null {
  // Verificar si estamos en el cliente
  if (typeof window === 'undefined') {
    // Durante el prerenderizado, retornar null en lugar de lanzar error
    return null;
  }

  if (!supabaseClientInstance) {
    supabaseClientInstance = createClientComponentClient();
  }
  return supabaseClientInstance;
}
