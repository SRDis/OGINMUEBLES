import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'to, subject y html son requeridos' },
        { status: 400 }
      );
    }

    // Intentar usar Resend si está configurado
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || 'noreply@oginmuebles.com';

    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: emailFrom,
            to: 'inmuebles.oliverlopezguijoza@gmail.com',
            subject,
            html,
          }),
        });

        if (resendResponse.ok) {
          const data = await resendResponse.json();
          console.log('✅ Email enviado exitosamente vía Resend:', data.id);
          return NextResponse.json({ success: true, messageId: data.id });
        } else {
          const errorData = await resendResponse.json().catch(() => ({}));
          console.error('❌ Error de Resend:', errorData);
        }
      } catch (resendError) {
        console.error('❌ Error al usar Resend:', resendError);
      }
    }

    // Fallback: Gmail SMTP con Nodemailer
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailAppPassword) {
      try {
        // Importar nodemailer dinámicamente solo si es necesario
        const nodemailer = await import('nodemailer');
        
        const transporter = nodemailer.default.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        const mailOptions = {
          from: gmailUser,
          to: 'inmuebles.oliverlopezguijoza@gmail.com',
          subject,
          html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado exitosamente vía Gmail SMTP:', info.messageId);
        return NextResponse.json({ success: true, messageId: info.messageId });
      } catch (gmailError) {
        console.error('❌ Error al usar Gmail SMTP:', gmailError);
      }
    }

    // Si no hay configuración, solo loguear en desarrollo
    console.log('📧 Email registrado (modo desarrollo - configura RESEND_API_KEY o Gmail SMTP para producción)');
    console.log('To:', 'inmuebles.oliverlopezguijoza@gmail.com');
    console.log('Subject:', subject);
    
    return NextResponse.json({
      success: true,
      message: 'Email registrado (modo desarrollo)',
      note: 'Configura RESEND_API_KEY o Gmail SMTP para enviar emails reales',
    });
  } catch (error) {
    console.error('Error al procesar email:', error);
    return NextResponse.json(
      { error: 'Error al procesar el email' },
      { status: 500 }
    );
  }
}
