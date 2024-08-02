import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import endpoints from 'express-list-endpoints';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import router from './routes/WineRoutes.js';

// Carica le variabili d'ambiente
dotenv.config();

// Crea l'app Express
const app = express();

// Configurazione di CORS e JSON
app.use(cors({
  origin: 'http://localhost:3002'  // Modifica questo URL se il frontend è ospitato altrove
}));

app.use(express.json());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('mongoDB connesso'))
  .catch((err) => console.error('mongoDB non connesso', err));

// Imposta la porta
const PORT = process.env.PORT || 3002;

// Ottieni il percorso della directory corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurazione delle rotte API
app.use('/api', router);

// Serve i file statici della build di React
if (process.env.NODE_ENV === 'production') {
  // Assicurati che la directory di build di React sia corretta
  app.use(express.static(path.join(__dirname, '../progetto-finale/progetto-finale/build')));

  // Gestisci tutte le altre richieste per servire la tua applicazione React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../progetto-finale/progetto-finale/build', 'index.html'));
  });
}

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server presente sulla porta ${PORT}`);
  console.log('Endpoint disponibili:');
  console.table(endpoints(app));
});

console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);

