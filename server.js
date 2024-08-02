import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import endpoints from 'express-list-endpoints';
import router from './routes/WineRoutes.js';

// Carica le variabili d'ambiente
dotenv.config();

// Crea l'app Express
const app = express();

// Configurazione di CORS e JSON
app.use(cors({
  origin: 'http://localhost:3002'  // Modifica questo URL per puntare al tuo frontend su Vercel
}));

app.use(express.json());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('mongoDB connesso'))
  .catch((err) => console.error('mongoDB non connesso', err));

// Imposta la porta
const PORT = process.env.PORT || 3002;

// Configurazione delle rotte API
app.use('/api', router);

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server presente sulla porta ${PORT}`);
  console.log('Endpoint disponibili:');
  console.table(endpoints(app));
});

console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);

