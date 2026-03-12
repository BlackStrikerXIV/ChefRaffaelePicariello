import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route for sending emails
  app.post("/api/send-request", async (req, res) => {
    const { name, email, phone, date, menuTitle, message, city, guests } = req.body;

    if (!name || !email || !menuTitle) {
      return res.status(400).json({ error: "Nome, email e menu sono obbligatori." });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("ERRORE: Credenziali email mancanti. Assicurati di aver impostato EMAIL_USER e EMAIL_PASS nei Secrets di AI Studio.");
      return res.status(500).json({ 
        error: "Il server non è configurato per l'invio di email. Configura EMAIL_USER e EMAIL_PASS nei Secrets." 
      });
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || "picarielloraffaele93@gmail.com",
      subject: `Nuova richiesta: ${menuTitle}`,
      text: `
        Hai ricevuto una nuova richiesta di prenotazione/informazioni.

        Dettagli Cliente:
        - Nome: ${name}
        - Email: ${email}
        - Telefono: ${phone || "Non fornito"}
        - Città: ${city || "Non fornita"}
        - Data desiderata: ${date || "Non specificata"}
        - Numero ospiti: ${guests || "Non specificato"}

        Messaggio aggiuntivo/Allergie:
        ${message || "Nessun messaggio."}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #D4AF37;">Nuova richiesta: ${menuTitle}</h2>
          <p>Hai ricevuto una nuova richiesta di prenotazione/informazioni.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <p><strong>Dettagli Cliente:</strong></p>
            <ul>
              <li><strong>Nome:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Telefono:</strong> ${phone || "Non fornito"}</li>
              <li><strong>Città:</strong> ${city || "Non fornita"}</li>
              <li><strong>Data desiderata:</strong> ${date || "Non specificata"}</li>
              <li><strong>Numero ospiti:</strong> ${guests || "Non specificato"}</li>
            </ul>
          </div>

          <p><strong>Messaggio aggiuntivo/Allergie:</strong></p>
          <p style="white-space: pre-wrap;">${message || "Nessun messaggio."}</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Richiesta inviata con successo!" });
    } catch (error) {
      console.error("Errore nell'invio dell'email:", error);
      res.status(500).json({ error: "Errore nell'invio della richiesta. Riprova più tardi." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
