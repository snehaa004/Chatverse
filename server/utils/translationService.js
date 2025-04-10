import dotenv from 'dotenv';
import { Translate } from '@google-cloud/translate/build/src/v2/index.js';

//for reading env variables(translate)
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const CREDENTIALS = process.env.CREDENTIALS;

// Configuration for the client
const translate = new Translate({
    key: process.env.KEY,
});

export const translateText = async (text, targetLanguage) => {

    try {
        let [translated] = await translate.translate(text, targetLanguage);
        return translated;
    } catch (error) {
        // console.log(`Error at translateText --> ${error}`);
        return text;
    }
};

// translateText('Oggi è lunedì', 'en')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export default translateText;
