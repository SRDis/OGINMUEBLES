interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Error al enviar email:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    return false;
  }
}

export function generateContactEmailHTML(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyInternalId?: string;
  propertyData?: any;
  sourceSection?: string;
}): string {
  const whatsappUrl = `https://wa.me/52${data.phone.replace(/\D/g, '')}?text=Hola, me interesa la propiedad: ${data.propertyTitle || 'Consulta general'}`;
  
  let propertyInfo = '';
  if (data.propertyData) {
    propertyInfo = `
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #22AADE; margin-top: 0;">Información de la Propiedad</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Título:</td><td style="padding: 8px; color: #666;">${data.propertyData.title || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Precio:</td><td style="padding: 8px; color: #666;">$${data.propertyData.price?.toLocaleString('es-MX') || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Ubicación:</td><td style="padding: 8px; color: #666;">${data.propertyData.location || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Dirección:</td><td style="padding: 8px; color: #666;">${data.propertyData.address || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Tipo:</td><td style="padding: 8px; color: #666;">${data.propertyData.property_type || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Recámaras:</td><td style="padding: 8px; color: #666;">${data.propertyData.bedrooms || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Baños:</td><td style="padding: 8px; color: #666;">${data.propertyData.bathrooms || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Área:</td><td style="padding: 8px; color: #666;">${data.propertyData.area || 'N/A'} m²</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Estacionamientos:</td><td style="padding: 8px; color: #666;">${data.propertyData.parking_spaces || 0}</td></tr>
          ${data.propertyData.amenities ? `<tr><td style="padding: 8px; font-weight: bold; color: #333;">Amenidades:</td><td style="padding: 8px; color: #666;">${Array.isArray(data.propertyData.amenities) ? data.propertyData.amenities.join(', ') : data.propertyData.amenities}</td></tr>` : ''}
          ${data.propertyData.description ? `<tr><td colspan="2" style="padding: 8px; color: #666;">${data.propertyData.description}</td></tr>` : ''}
        </table>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22AADE; color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 20px; }
        .button { display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nuevo Contacto desde el Sitio Web</h1>
        </div>
        <div class="content">
          <h2>Información del Contacto</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${data.message}</p>
          
          ${data.propertyTitle ? `<p><strong>Propiedad de interés:</strong> ${data.propertyTitle}</p>` : ''}
          ${data.propertyInternalId ? `<p><strong>ID Interno:</strong> ${data.propertyInternalId}</p>` : ''}
          ${data.sourceSection ? `<p><strong>Sección origen:</strong> ${data.sourceSection}</p>` : ''}
          
          ${propertyInfo}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${whatsappUrl}" class="button" target="_blank">
              📱 Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePersonalizedSearchEmailHTML(data: any): string {
  const whatsappUrl = `https://wa.me/52${data.client_phone.replace(/\D/g, '')}?text=Hola ${data.client_name}, recibimos tu búsqueda personalizada. Te contactaremos pronto.`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22AADE; color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 20px; }
        .button { display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nueva Búsqueda Personalizada</h1>
        </div>
        <div class="content">
          <h2>Información del Cliente</h2>
          <p><strong>Nombre:</strong> ${data.client_name}</p>
          <p><strong>Email:</strong> ${data.client_email}</p>
          <p><strong>Teléfono:</strong> ${data.client_phone}</p>
          
          <h3>Preferencias de Búsqueda</h3>
          <p><strong>Operación:</strong> ${data.operation_type}</p>
          <p><strong>Ubicaciones preferidas:</strong> ${Array.isArray(data.preferred_locations) ? data.preferred_locations.join(', ') : data.preferred_locations || 'N/A'}</p>
          <p><strong>Tipos de propiedad:</strong> ${Array.isArray(data.property_types) ? data.property_types.join(', ') : data.property_types || 'N/A'}</p>
          <p><strong>Recámaras:</strong> ${data.min_bedrooms} - ${data.max_bedrooms}</p>
          <p><strong>Baños:</strong> ${data.min_bathrooms} - ${data.max_bathrooms}</p>
          <p><strong>Área:</strong> ${data.min_area} - ${data.max_area} m²</p>
          <p><strong>Presupuesto:</strong> $${data.min_price?.toLocaleString()} - $${data.max_price?.toLocaleString()}</p>
          <p><strong>Urgencia:</strong> ${data.urgency}</p>
          ${data.additional_notes ? `<p><strong>Notas adicionales:</strong> ${data.additional_notes}</p>` : ''}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${whatsappUrl}" class="button" target="_blank">
              📱 Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
