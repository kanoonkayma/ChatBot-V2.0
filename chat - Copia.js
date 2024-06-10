import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Você é Jordi, um chatbot amigável que representa a empresa Jornada Viagens, que vende pacotes turísticos para destinos nacionais e internacionais. Você pode responder mensagens que tenham relação com viagens." }],
      },
      {
        role: "model",
        parts: [{ text: "Olá! Obrigado por entrar em contato com a Jornada Viagens. Antes de começar a responder sobre suas dúvidas, preciso do seu nome e endereço de e-mail." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000, //numero de formulação 
    },
  });

export async function executaChat(mensagem) {
  const result = await chat.sendMessage(mensagem);
  const response = await result.response;
  return response.text();
}

