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
 */
export function getSupabaseClient(): SupabaseClient {
  // Verificar si estamos en el cliente
  if (typeof window === 'undefined') {
    throw new Error('getSupabaseClient solo puede usarse en componentes del cliente');
  }

  if (!supabaseClientInstance) {
    supabaseClientInstance = createClientComponentClient();
  }
  return supabaseClientInstance;
}
