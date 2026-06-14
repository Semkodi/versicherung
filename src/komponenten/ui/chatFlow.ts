type ChatStepValue =
    | 'idle'
    | 'chooseCategory'
    | 'chooseCategoryDetail'
    | 'askName'
    | 'askEmail'
    | 'askPhone'
    | 'chooseContactMethod'
    | 'confirmSend'
    | 'completed';

export type BotFlowUserData = {
    category: string;
    subCategory: string;
    name: string;
    email: string;
    phone: string;
    channel: string;
};

const askEmailText = 'Und für Rückfragen oder WhatsApp: Wie lautet deine E-Mail-Adresse?';

export const botFlow = {
    welcome: {
        text: 'Hallo! Ich bin dein Simply Switch Assistent. 👋 Wie kann ich dir heute helfen?',
        options: ['Beamtenversicherung', 'Private Versicherung', 'Existenzgründer / Selbstständig', 'Allgemeine Frage'] as const
    },
    categoryResponses: {
        Beamtenversicherung: {
            text: 'Hervorragend! In welchem Status befindest du dich aktuell?',
            options: ['Anwärter / Referendar', 'Beamter auf Probe', 'Beamter auf Lebenszeit'] as const,
            nextStep: 'chooseCategoryDetail' as ChatStepValue
        },
        'Private Versicherung': {
            text: 'Super! Welche Art von Versicherung interessiert dich?',
            options: ['Haus & Haftpflicht', 'Krankenversicherung', 'Rentenversicherung'] as const,
            nextStep: 'chooseCategoryDetail' as ChatStepValue
        },
        'Existenzgründer / Selbstständig': {
            text: 'Klasse! Startest du gerade erst durch oder bist du bereits länger selbstständig?',
            options: ['Gerade in Gründung', 'Bereits selbstständig'] as const,
            nextStep: 'chooseCategoryDetail' as ChatStepValue
        },
        'Allgemeine Frage': {
            text: 'Kein Problem. Worum geht es bei deiner Frage? Wähle am besten einen passenden Bereich aus.',
            options: ['Beratung', 'Schadensfall', 'Tarifwechsel'] as const,
            nextStep: 'chooseCategoryDetail' as ChatStepValue
        }
    } as Record<string, { text: string; options: readonly string[]; nextStep: ChatStepValue }> ,
    askName: 'Verstanden. Wie dürfen wir dich nennen? (Vor- und Nachname)',
    askEmail: askEmailText,
    askPhone: 'Und für Rückfragen oder WhatsApp: Wie lautet deine Telefonnummer?',
    contactMethod: {
        text: 'Wie möchtest du das Beratungsgespräch am liebsten führen?',
        options: ['WhatsApp', 'Video-Call', 'Telefonisch', 'Persönlich'] as const
    },
    confirmSendOptions: ['Ja, Anfrage senden', 'Daten korrigieren'] as const,
    askNameAfterDetails: 'Perfekt. Um den Termin optimal vorzubereiten: Wie dürfen wir dich nennen? (Vor- und Nachname)',
    invalidSelection: 'Ich habe die Auswahl nicht verstanden. Bitte wähle eine Option aus.',
    invalidEmail: 'Das sieht nicht wie eine gültige E-Mail aus. Magst du sie nochmal kurz prüfen?',
    completed: 'Vielen Dank! Deine Nachricht wurde gespeichert. Sven meldet sich bei dir.',
    unexpectedText: 'Ich bin ein Assistent und folge einem festen Ablauf. Bitte wähle eine der Optionen oder beantworte die Fragen oben.',
    requestSent: '✅ Deine Anfrage wurde erfolgreich empfangen! Sven Kegler wird sich zeitnah persönlich bei dir melden. Vielen Dank für dein Vertrauen!',
    sendError: 'Leider gab es ein technisches Problem beim Senden deiner Anfrage. Bitte versuche es später noch einmal oder rufe uns direkt an!',
    restartPrompt: {
        text: 'Kein Problem. Starten wir noch einmal kurz von vorn. Was ist dein Anliegen?',
        options: ['Beamtenversicherung', 'Private Versicherung', 'Allgemeine Frage'] as const
    },
    categoryAreaPrompt: 'In welchem Bereich bist du tätig?',
    categoryAreaOptions: ['Lehramt / Schule', 'Polizei / Zoll / Justiz', 'Verwaltung', 'Sonstiges'] as const,
    inputPlaceholder: 'Nachricht schreiben...',
    createAskEmail: (firstName: string) => `Freut mich, ${firstName}! ${askEmailText}`,
    createSummary: (data: BotFlowUserData, channel: string) =>
        `Danke! Hier ist eine Zusammenfassung deiner Anfrage:\n\n📍 Bereich: ${data.category}\n📎 Details: ${data.subCategory || 'Keine Angabe'}\n👤 Name: ${data.name}\n📧 E-Mail: ${data.email}\n📱 Tel: ${data.phone}\n💬 Kanal: ${channel}\n\nSoll ich diese Anfrage so an Sven Kegler senden?`
};
