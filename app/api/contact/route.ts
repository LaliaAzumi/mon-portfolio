import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validation des données
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    // Envoi de l'email
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Email par défaut de Resend
      to: ["laliaazumii@gmail.com"], // Votre email
      subject: `Nouveau message de ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F5F1E8; border-radius: 10px;">
          <div style="background-color: #2A2522; color: #E8D0A9; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-family: serif; color: #C17E3C;">📧 Nouveau Message - Portfolio</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding: 15px; background-color: #F5F1E8; border-left: 4px solid #C17E3C; border-radius: 5px;">
              <h2 style="margin: 0 0 10px 0; color: #6A4423; font-family: serif;">Informations du contact</h2>
              <p style="margin: 5px 0; color: #6A4423;"><strong>Nom:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #6A4423;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #6A4423; font-family: serif; border-bottom: 2px solid #C17E3C; padding-bottom: 10px;">Message:</h3>
              <div style="background-color: #F8F5F0; padding: 20px; border-radius: 8px; border: 1px solid #E8D0A9; margin-top: 15px;">
                <p style="margin: 0; line-height: 1.6; color: #6A4423; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E8D0A9;">
              <p style="margin: 0; color: #8B5A2B; font-style: italic;">
                Message reçu depuis votre portfolio - ${new Date().toLocaleString("fr-FR")}
              </p>
            </div>
          </div>
        </div>
      `,
      // Version texte pour les clients email qui ne supportent pas HTML
      text: `
Nouveau message de votre portfolio

Nom: ${name}
Email: ${email}

Message:
${message}

Reçu le: ${new Date().toLocaleString("fr-FR")}
      `,
    })

    if (error) {
      console.error("Erreur Resend:", error)
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Message envoyé avec succès", id: data?.id }, { status: 200 })
  } catch (error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
