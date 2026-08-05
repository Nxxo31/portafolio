import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(2, "El asunto es requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Datos inválidos", details: result.error.flatten() },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = result.data;
    
    // Honeypot check (anti-spam)
    if (body._gotcha) {
      return NextResponse.json(
        { success: false, error: "Spam detectado" },
        { status: 400 }
      );
    }
    
    // Resend email (if API key available)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);
      
      // Escape HTML entities to prevent XSS
      const ENT_AMP = String.fromCharCode(38) + "amp;";
      const ENT_LT = String.fromCharCode(38) + "lt;";
      const ENT_GT = String.fromCharCode(38) + "gt;";
      const ENT_QUOT = String.fromCharCode(38) + "quot;";
      const ENT_APOS = String.fromCharCode(38) + "#039;";
      const escapeHtml = (text: string) =>
        text.replace(/[&<>"']/g, (match) => {
          switch (match) {
            case "&":
              return ENT_AMP;
            case "<":
              return ENT_LT;
            case ">":
              return ENT_GT;
            case '"':
              return ENT_QUOT;
            case "'":
              return ENT_APOS;
            default:
              return match;
          }
        });
      
      await resend.emails.send({
        from: "onboarding@resend.dev", // Use verified domain in production
        to: "sebastian@example.com", // Your email
        subject: `[Portfolio] ${escapeHtml(subject)}`,
        html: `
          <h2>Nuevo mensaje desde el portafolio</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(message)}</p>
        `,
      });
    }
    
    // Log for development
    console.log("Contact form submitted:", { name, email, subject, message: message.slice(0, 50) + "..." });
    
    return NextResponse.json(
      { success: true, message: "Mensaje enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
