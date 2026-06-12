import { Check, Mail, RotateCcw } from 'lucide-react';

type AnfrageStatusProps = {
  status: 'gesendet' | 'email';
  titel: string;
  name?: string;
  mailtoUrl?: string;
  hinweis?: string;
  onReset: () => void;
};

const AnfrageStatus = ({ status, titel, name, mailtoUrl, hinweis, onReset }: AnfrageStatusProps) => (
  <div
    className="rounded-2xl border border-slate-200 bg-white p-8 text-center md:p-12"
    role="status"
    aria-live="polite"
  >
    <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
      status === 'gesendet' ? 'bg-emerald-50 text-emerald-600' : 'bg-hintergrund-alt text-marke-primaer'
    }`}>
      {status === 'gesendet' ? <Check className="h-8 w-8" /> : <Mail className="h-8 w-8" />}
    </div>

    <h3 className="mb-3 text-2xl font-extrabold text-text-haupt">{titel}</h3>
    <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-text-neben">
      {status === 'gesendet'
        ? `${name ? `Danke ${name}. ` : ''}Deine Anfrage wurde sicher übermittelt. Sven Kegler meldet sich persönlich bei dir.`
        : `${hinweis || 'Die direkte Online-Übertragung ist momentan nicht verfügbar.'} Öffne den vorbereiteten E-Mail-Entwurf und sende ihn in deinem Mailprogramm ab.`}
    </p>

    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      {status === 'email' && mailtoUrl && (
        <a
          href={mailtoUrl}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-marke-primaer px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-marke-sekundaer"
        >
          <Mail className="h-4 w-4" />
          E-Mail-Entwurf öffnen
        </a>
      )}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-marke-primaer hover:bg-hintergrund-alt"
      >
        <RotateCcw className="h-4 w-4" />
        Formular bearbeiten
      </button>
    </div>
  </div>
);

export default AnfrageStatus;
