import express from 'express';
import Connection from './database/db.js';
import bodyParser from 'body-parser';

import Route from './routes/route.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();


const app= express();


app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Route);




Connection();

const PORT =8000;

app.listen(PORT,()=>console.log(`Serrver is running on port ${PORT}`));