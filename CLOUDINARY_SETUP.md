# Configuración de Cloudinary para Imágenes

Este proyecto está configurado para obtener imágenes de propiedades desde Cloudinary organizadas por `ID_interno` y `status`.

## Estructura de Carpetas en Cloudinary

Las imágenes deben estar organizadas de la siguiente manera:

```
Properties/
  Ventas/
    IDV001/
      imagen1.jpg
      imagen2.jpg
      ...
    IDV002/
      imagen1.jpg
      ...
  Rentas/
    IDR001/
      imagen1.jpg
      ...
    IDR002/
      ...
```

**Formato de ID Internos:**
- **Ventas**: `IDV001`, `IDV002`, `IDV003`, etc.
- **Rentas**: `IDR001`, `IDR002`, `IDR003`, etc.

**IMPORTANTE - Case Sensitivity:**
- Cloudinary es **case-sensitive**, las carpetas deben tener exactamente estas mayúsculas:
  - `Properties` (con P mayúscula)
  - `Ventas` (con V mayúscula) para propiedades en venta
  - `Rentas` (con R mayúscula) para propiedades en renta

Donde:
- El nombre de la carpeta debe coincidir **exactamente** con el valor del campo `ID_interno` en Supabase
- El sistema mapea automáticamente:
  - `status = "venta"` → busca en `Properties/Ventas/{ID_interno}`
  - `status = "renta"` → busca en `Properties/Rentas/{ID_interno}`

## Configuración Requerida

### 1. Obtener Credenciales de Cloudinary

1. Ve a [Cloudinary Dashboard](https://cloudinary.com/console)
2. Inicia sesión o crea una cuenta
3. En el Dashboard, encontrarás:
   - **Cloud Name**: Tu nombre de cloud (ej: `dxyz123`)
   - **API Key**: Tu clave de API
   - **API Secret**: Tu secreto de API

### 2. Configurar Variables de Entorno

Agrega las siguientes variables a tu archivo `.env.local`:

```env
# Cloudinary - Público (necesario para construir URLs)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name

# Cloudinary - Privado (solo en servidor, para API)
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**Importante:**
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` debe tener el prefijo `NEXT_PUBLIC_` porque se usa en componentes del cliente
- `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET` NO deben tener el prefijo `NEXT_PUBLIC_` porque son secretos

### 3. Subir Imágenes a Cloudinary

Puedes subir imágenes de varias formas:

**Opción A: Dashboard de Cloudinary**
1. Ve a Media Library en el Dashboard
2. Crea las carpetas siguiendo la estructura: `Properties/Ventas/IDV001` o `Properties/Rentas/IDR001`
3. Sube las imágenes a cada carpeta
4. **IMPORTANTE**: Usa exactamente estas mayúsculas: `Properties`, `Ventas`, `Rentas`

**Opción B: API de Cloudinary**
```bash
# Para ventas (IDV001)
curl -X POST \
  https://api.cloudinary.com/v1_1/{cloud_name}/image/upload \
  -F "file=@imagen.jpg" \
  -F "folder=Properties/Ventas/IDV001" \
  -F "api_key={api_key}" \
  -F "api_secret={api_secret}"

# Para rentas (IDR001)
curl -X POST \
  https://api.cloudinary.com/v1_1/{cloud_name}/image/upload \
  -F "file=@imagen.jpg" \
  -F "folder=Properties/Rentas/IDR001" \
  -F "api_key={api_key}" \
  -F "api_secret={api_secret}"
```

**Opción C: SDK de Cloudinary**
```javascript
import { v2 as cloudinary } from 'cloudinary';

// Para ventas
cloudinary.uploader.upload('imagen.jpg', {
  folder: 'Properties/Ventas/IDV001'
});

// Para rentas
cloudinary.uploader.upload('imagen.jpg', {
  folder: 'Properties/Rentas/IDR001'
});
```

## Cómo Funciona

### Prioridad de Obtención de Imágenes

El sistema intenta obtener imágenes en el siguiente orden:

1. **Tabla `property_images`**: Si hay imágenes registradas en la base de datos, se usan estas
2. **Carpeta de Cloudinary**: Se busca en `Properties/{Ventas|Rentas}/{ID_interno}` según el status
3. **Imagen principal**: Si existe `main_image_id`, se usa como fallback
4. **Placeholder**: Si no hay ninguna imagen, muestra un placeholder

### Ejemplo de Uso

```typescript
import { getImagesByInternalId } from '@/lib/cloudinary';

// Obtener imágenes de una propiedad en venta
const images = await getImagesByInternalId('IDV001', 'venta');
// Busca en: Properties/Ventas/IDV001

// Obtener imágenes de una propiedad en renta
const images = await getImagesByInternalId('IDR001', 'renta');
// Busca en: Properties/Rentas/IDR001
```

**Importante:** El `ID_interno` debe coincidir exactamente con el nombre de la carpeta en Cloudinary:
- Ventas: `IDV001`, `IDV002`, `IDV003`, etc.
- Rentas: `IDR001`, `IDR002`, `IDR003`, etc.

## Transformaciones de Imagen

Las imágenes se sirven con transformaciones automáticas para optimización:

- **Thumbnail**: `w_1000,h_1000,c_fill,q_auto`
- **Formato automático**: Cloudinary detecta el mejor formato (WebP, AVIF, etc.)
- **Calidad optimizada**: `q_auto` ajusta la calidad según el dispositivo

Puedes personalizar las transformaciones en `lib/cloudinary.ts`.

## Solución de Problemas

### Error: "Cloudinary cloud name no configurado"
- Verifica que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` esté en `.env.local`
- Reinicia el servidor de desarrollo después de agregar variables de entorno

### No se encuentran imágenes
- Verifica que la estructura de carpetas sea correcta: `Properties/Ventas/{ID_interno}` o `Properties/Rentas/{ID_interno}`
- **IMPORTANTE**: Verifica que las mayúsculas sean exactas:
  - `Properties` (no `properties` o `PROPERTIES`)
  - `Ventas` (no `ventas` o `VENTAS`)
  - `Rentas` (no `rentas` o `RENTAS`)
- Asegúrate de que el `ID_interno` en Supabase coincida **exactamente** con el nombre de la carpeta (case-sensitive)
  - Ventas: debe ser `IDV001`, `IDV002`, etc. (no `idv001` o `IDV-001`)
  - Rentas: debe ser `IDR001`, `IDR002`, etc. (no `idr001` o `IDR-001`)
- Verifica que las imágenes estén marcadas como públicas en Cloudinary
- Revisa los logs de la consola del servidor para ver qué ruta está buscando el sistema (busca `[Cloudinary] Buscando imágenes en:`)

### Error 401 en API de Cloudinary
- Verifica que `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET` estén correctamente configurados
- Asegúrate de que las credenciales sean válidas en el Dashboard de Cloudinary

### Error 400 en API de Cloudinary
- Verifica que la expresión de búsqueda sea correcta
- Revisa los logs del servidor para ver el error específico
- Asegúrate de que la estructura de carpetas coincida exactamente

### Imágenes no se muestran
- Verifica que las URLs generadas sean correctas
- Revisa la consola del navegador para ver errores de carga
- Asegúrate de que las imágenes existan en Cloudinary

## Notas Importantes

- Las imágenes deben estar marcadas como **públicas** en Cloudinary para que se puedan acceder sin autenticación
- **Case-sensitive**: Cloudinary distingue entre mayúsculas y minúsculas:
  - Las carpetas deben ser: `Properties/Ventas/` o `Properties/Rentas/` (con mayúsculas exactas)
  - El `ID_interno` debe coincidir **exactamente** con el nombre de la carpeta:
    - **Ventas**: `IDV001`, `IDV002`, `IDV003`, etc.
    - **Rentas**: `IDR001`, `IDR002`, `IDR003`, etc.
- La API de búsqueda tiene límites de cuota según tu plan de Cloudinary
- Se implementa caché de 5 minutos para mejorar el rendimiento
- El sistema construye automáticamente la ruta mapeando el status:
  - Si `status = "venta"` y `ID_interno = "IDV001"` → busca en `Properties/Ventas/IDV001`
  - Si `status = "renta"` y `ID_interno = "IDR001"` → busca en `Properties/Rentas/IDR001`
