import express from 'express';
import { data } from './data.js';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/data', (req, res) => {
  res.send(data);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
