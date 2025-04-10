import Message from '../model/Message.js';
import Conversation from '../model/Conversation.js'
import User from '../model/User.js';

import translateText from '../utils/translationService.js';



export const newMessage = async (request, response) => {
    try {
        const newMessage = new Message(request.body); 
        await newMessage.save();
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
        return response.status(200).json('Message has been sent successfuly');
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getMessages = async (request, response) => {
    
    try {
        //translation
        const receiverId = request.params.receiverId ;
        const conversationId = request.params.id;
        if (!receiverId) {
            return response.status(400).json('Missing user sub');
        }
        const user = await User.findOne({ sub: receiverId });
        if (!user) {
            return response.status(404).json('User not found');
        }
        // console.log('User preferred language:', user.preferredLanguage);

        const messages = await Message.find({ conversationId: request.params.id });
        const originalText=messages.map(message => message.text);
        // console.log('Original text:', originalText);

        
        const translatedText = await translateText(originalText, user.preferredLanguage);
        // console.log('Translated text:', translatedText);

        const translatedMessages = messages.map((msg, index) => {
            return {
                ...msg._doc,
                text: translatedText[index]
            };
        });

        response.status(200).json(translatedMessages);
    } catch (error) {
        response.status(500).json(error.message);
    }

}