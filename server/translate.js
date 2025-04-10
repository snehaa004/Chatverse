// server/testTranslate.js
import { translateText } from './utils/translationService.js';
import dotenv from 'dotenv';
dotenv.config();

export const Translate = async (ogtext) => {
  const translatedText = await translateText(ogtext, "hi");
  return("Translated:", translatedText);
};

export default Translate;
