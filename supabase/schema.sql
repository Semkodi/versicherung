-- Datenbank-Schema für Simply Switch Leads
-- Ort: Supabase SQL Editor (Frankfurt Region empfohlen)

-- Tabelle für Leads erstellen
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    category TEXT,
    sub_category TEXT,
    channel TEXT,
    status TEXT DEFAULT 'Neu', -- Neu, In Bearbeitung, Erledigt
    priority TEXT DEFAULT 'Normal', -- Normal, Mittel, Hoch
    notes TEXT
);

-- Row Level Security (RLS) aktivieren
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder darf Leads einfügen (für den Chatbot)
CREATE POLICY "Leads können von jedem eingefügt werden" 
ON leads FOR INSERT 
WITH CHECK (true);

-- Policy: Nur authentifizierte Nutzer dürfen Leads lesen (für das Dashboard)
CREATE POLICY "Leads können nur von Admins gelesen werden" 
ON leads FOR SELECT 
TO authenticated 
USING (true);

-- Policy: Nur authentifizierte Nutzer dürfen Leads aktualisieren
CREATE POLICY "Leads können nur von Admins aktualisiert werden" 
ON leads FOR UPDATE 
TO authenticated 
USING (true);
