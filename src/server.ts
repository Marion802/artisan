import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Configurer le transporteur de messagerie pour MailDev
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true,
});

// Route API pour envoyer des emails
app.post('/api/send-email', (req, res) => {
  const { to, subject, body } = req.body;

  const mailOptions: SendMailOptions = {
    from: 'no-reply@votre-site.com',
    to: to,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email', error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error: error });
    } else {
      console.log('Email envoyé avec succès', info.response);
      res.status(200).json({ message: 'Email envoyé avec succès', response: info.response });
    }
  });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);