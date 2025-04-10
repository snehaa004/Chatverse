import express from 'express';
import Connection from './database/db.js';
import bodyParser from 'body-parser';
import http from 'http'; //
import Route from './routes/route.js';
import cors from 'cors';
import setupSocket from './socket/index.js'; //
import dotenv from 'dotenv';
dotenv.config();


const app= express();
const server = http.createServer(app);


app.use(cors({origin: 
    'https://chatverse-v1-client.onrender.com', // frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  }));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Route);




Connection();
setupSocket(server); 

const PORT =process.env.PORT || 8000;

server.listen(PORT,()=>console.log(`Serrver is running on port ${PORT}`));