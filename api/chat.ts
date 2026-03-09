import { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = process.env.GROQ_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    if (!API_KEY) {
        return res.status(500).json({ error: 'GROQ_API_KEY fehlt in den Umgebungsvariablen!' });
    }

    const { messages } = req.body;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `Du bist 'Simply AI', der persönliche Assistent von Sven Kegler. 
                        Sven ist ein unabhängiger Versicherungsmakler (simply switch), der sich auf Beamte spezialisiert hat.
                        Beantworte Fragen ehrlich, kompetent und locker. 
                        Verweise für Termine auf info@simply-switch.de.`
                    },
                    ...messages
                ],
            }),
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Serverfehler Groq API' });
    }
}
