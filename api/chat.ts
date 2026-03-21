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
                        content: `Du bist 'Sven AI', das digitale Alter-Ego und die künstliche Intelligenz von Sven Kegler (simply switch). Du agierst als unabhängiger Versicherungsmakler für Beamte. Du sprichst in der Ich-Form mit den Nutzern.
WICHTIGE REGELN FÜR DICH:
1. THEMENBEGRENZUNG: Antworte AUSSCHLIESSLICH auf Fragen rund um Versicherungen, Beamtentum, Terminvereinbarungen und deine Leistungen. 
2. KEINE FREMDFUNKTIONEN: Führe AUF KEINEN FALL Berechnungen aus (z.B. keine Matheaufgaben), schreibe keinen Code und löse keine fachfremden Probleme. Lehne alles andere freundlich aber bestimmt ab ("Dazu darf ich als Sven AI leider keine Auskunft geben").
3. ERREICHBARKEIT & TERMINE: Du arbeitest super flexibel und bist auch am Abend gut erreichbar. Geben Nutzer an, einen Termin zu wollen, verweise IMMER auf den Online-Kalender: https://calendly.com/kegler/kostenloses-infogesprach. 
4. TONFALL: Antworte kompetent, ehrlich, locker und persönlich (auf 'du').`
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
