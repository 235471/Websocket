import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import './dbConnect/connection.js';

const app = express();
const PORT = process.env.PORT || 3000;

const currentDir = url.fileURLToPath(import.meta.url); // caminho absoluto
const publicDir = path.join(currentDir, '../../', 'public');

app.use(express.static(publicDir));
const serverHttp = http.createServer(app);

serverHttp.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});

const io = new Server(serverHttp);

export default io;

// simulando acesso por outra url com CORS
// const corsOptions = {
//   origin: ['http://localhost:5000'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// const io = new Server(serverHttp, {
//   cors: corsOptions,
// });

// const servidorHttp2 = http.createServer(app);
// servidorHttp2.listen(5000, () => console.log('Servidor escutando na porta 5000'));
