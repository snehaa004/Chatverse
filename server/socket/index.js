import { Server } from 'socket.io';
import user from '../model/User.js';
import User from '../model/User.js';
import translateText from '../utils/translationService.js';

//To read the .env file
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// These lines are needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//for saving prefferedlanguage in db
import Connection from '../database/db.js';

let users = [];
// console.log("MongoDB URL:", Connection().mongoURL);
const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}
//old
const setupSocket = (server) => {
const io = new Server("https://chatverse-v1.onrender.com/", {
    cors: {
        origin: 'https://chatverse-v1-client.onrender.com/',
        methods : ['GET','POST'],
    },
})
// Connection();





io.on('connection', (socket) => {
    console.log('user connected')


    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    socket.on('sendMessage', async (data) => {
        let user = getUser(data.receiverId);

        // fallback if in-memory user doesn't exist or has no lang
        if (!user || !user.language) {
            const dbUser = await User.findOne({ sub: data.receiverId });

            if (dbUser) {
                user = {
                    socketId: user?.socketId, // preserve socket if exists
                    userId: dbUser.sub,
                    language: dbUser.preferredLanguage || 'en'
                };
            } else {
                user = { socketId: null, language: 'en' };
            }
        }

        if (user?.socketId) {
            // Translate message text to receiver's preferred language
            const translatedText = await translateText(data.text, user.language || 'en');

            const translatedMessage = {
                ...data,
                text: translatedText
            };

            io.to(user.socketId).emit('getMessage', translatedMessage);
        } else {
            console.log(`User id : ${data.receiverId} is offline. Skipping emit.`);
        }
    });

    socket.on('setLanguage', async ({ userId, language }) => {
        try {
            await user.findOneAndUpdate({ sub: userId }, { preferredLanguage: language });
            // console.log(`Language updated for user ${userId} to ${language}`);
        } catch (error) {
            console.error('Failed to update language:', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})
};

export default setupSocket;