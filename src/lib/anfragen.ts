import { istOffline, supabase } from '@/lib/supabase';

export type AnfrageDaten = {
  name: string;
  email?: string;
  phone?: string;
  category: string;
  subCategory?: string;
  channel?: string;
  subject: string;
  message: string;
  priority?: 'Normal' | 'Mittel' | 'Hoch';
};

export type AnfrageErgebnis =
  | { status: 'gesendet' }
  | { status: 'email'; mailtoUrl: string; hinweis?: string };

export const erstelleMailtoUrl = (subject: string, message: string) =>
  `mailto:kegler@simply-switch.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

export async function uebermittleAnfrage(daten: AnfrageDaten): Promise<AnfrageErgebnis> {
  const mailtoUrl = erstelleMailtoUrl(daten.subject, daten.message);

  if (istOffline) {
    return {
      status: 'email',
      mailtoUrl,
      hinweis: 'Die direkte Online-Übertragung ist momentan nicht verfügbar.',
    };
  }

  const { error } = await supabase.from('leads').insert([
    {
      name: daten.name,
      email: daten.email || null,
      phone: daten.phone || null,
      category: daten.category,
      sub_category: daten.subCategory || null,
      channel: daten.channel || 'Webformular',
      status: 'Neu',
      priority: daten.priority || 'Normal',
      notes: daten.message,
    },
  ]);

  if (error) {
    console.error('Anfrage konnte nicht direkt übertragen werden:', error.message);
    return {
      status: 'email',
      mailtoUrl,
      hinweis: 'Die direkte Online-Übertragung ist fehlgeschlagen.',
    };
  }

  return { status: 'gesendet' };
}
