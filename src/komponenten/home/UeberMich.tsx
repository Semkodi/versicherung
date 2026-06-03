import { Heart, ShieldCheck, Smartphone, LogIn } from 'lucide-react';
import profilBild from '@/assets/bilder/Profil_img.png';
import { ScrollReveal } from '@/komponenten/layout';

// Badges fuer Google und Apple
import appStoreBadge   from '@/assets/icons/app-store-badge.svg';
import googlePlayBadge from '@/assets/icons/google-play-badge.svg';

const UeberMich = () => {
    return (
        <section id="ueber-mich" className="py-24 bg-white relative overflow-hidden border-b border-[#e2e8f0] scroll-mt-20">
            {/* Sanfte Hintergrund-Highlights */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#1e5adb]/2 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1e5adb]/3 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Profilbild mit Premium-Rahmen */}
                    <div className="order-2 lg:order-1 relative group">
                        <ScrollReveal direction="left">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 aspect-[4/5] max-w-md mx-auto">
                                <img
                                    src={profilBild}
                                    alt="Sven Kegler – Gründer von simply switch & freier Versicherungsmakler"
                                    className="object-cover object-top w-full h-full transform group-hover:scale-103 transition-transform duration-1000 ease-in-out"
                                />
                                {/* Edles transparentes Overlay am unteren Rand */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1930]/30 to-transparent" />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Textinhalt */}
                    <div className="order-1 lg:order-2">
                        <ScrollReveal direction="right">
                            <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-1.5 rounded-full mb-6 font-semibold text-xs uppercase tracking-wide border border-[#d1e0f9]">
                                Wer steht hinter simply switch?
                            </div>

                            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-[#0a1930] leading-tight">
                                Über mich – Dein Partner für eine{' '}
                                <span className="text-[#1e5adb]">sichere Zukunft</span>
                            </h2>

                            <div className="space-y-6 text-[#4a5568] text-base leading-relaxed mb-8 font-normal">
                                <p>
                                    <strong className="text-[#0a1930] font-bold">Hi! Ich bin Sven Kegler</strong> – freier Versicherungsmakler, Inhaber von simply switch und leidenschaftlicher Berater. Seit über 17 Jahren kläre ich Menschen unabhängig und transparent zu ihren Absicherungen, Finanzen und Vorsorgewegen auf.
                                </p>
                                <p>
                                    Mein Spezialgebiet ist die ganzheitliche und verständliche Aufklärung – ganz besonders auch für Beamtenanwärter, Referendare und Selbstständige. Ich habe einfach zu oft erlebt, dass unverständlicher Versicherungs-Kauderwelsch genutzt wird, um unpassende Produkte zu verkaufen. Das machen wir anders.
                                </p>
                            </div>

                            {/* Zitat-Box im edlen Design */}
                            <div className="relative bg-[#f8f9fc] border-l-4 border-[#1e5adb] p-6 rounded-r-2xl mb-8 border border-gray-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                                <p className="text-[#0a1930] font-semibold italic text-sm leading-relaxed">
                                    \"Meine Mission: Absicherung verständlich, digital und absolut ehrlich zu gestalten. Wir bauen gemeinsam ein Schutzschild auf, das perfekt zu deinem Leben passt – ganz ohne Verkaufsdruck.\"
                                </p>
                            </div>

                            {/* Eigenschaften in Kacheln */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e2e8f0] hover:border-gray-300 hover:shadow-md transition-all">
                                    <div className="flex-shrink-0 p-2.5 bg-[#e8effd] rounded-xl border border-[#d1e0f9]">
                                        <Heart className="w-5 h-5 text-[#1e5adb]" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-[#0a1930] text-sm mb-1">Ehrlich & Fair</h4>
                                        <p className="text-[#718096] text-xs font-normal">100% kostenlose, ehrliche und transparente Beratung.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e2e8f0] hover:border-gray-300 hover:shadow-md transition-all">
                                    <div className="flex-shrink-0 p-2.5 bg-[#e8effd] rounded-xl border border-[#d1e0f9]">
                                        <ShieldCheck className="w-5 h-5 text-[#1e5adb]" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-[#0a1930] text-sm mb-1">100% Unabhängig</h4>
                                        <p className="text-[#718096] text-xs font-normal">Als freier Makler vertrete ich exklusiv deine Interessen.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Digitaler Kundenservice - simplr */}
                            <div className="mt-8 p-6 rounded-2xl bg-[#f8f9fc] border border-[#e2e8f0] hover:border-gray-300 transition-all shadow-sm">
                                <h3 className="font-extrabold text-[#0a1930] text-base mb-2 flex items-center gap-2">
                                    <Smartphone className="w-5 h-5 text-[#1e5adb]" />
                                    Deine digitale Vertragsmappe: simplr
                                </h3>
                                <p className="text-xs text-[#4a5568] mb-4 font-normal leading-relaxed">
                                    Verwalte alle deine Verträge papierlos, vergleiche Tarife in Echtzeit und melde Schäden mit nur einem Klick – direkt im Web oder als App auf deinem Smartphone.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <a
                                        href="https://login.simplr.de/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0a1930] text-white text-xs font-bold rounded-xl hover:bg-[#152a4f] transition-all shadow-md cursor-pointer"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span>simplr Web-Login</span>
                                    </a>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href="https://apps.apple.com/de/app/simplr/id1048913800"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:scale-103 transition-transform cursor-pointer"
                                        >
                                            <img src={appStoreBadge} alt="Download im App Store" className="h-9 w-auto" />
                                        </a>
                                        <a
                                            href="https://play.google.com/store/search?q=simplr&c=apps"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:scale-103 transition-transform cursor-pointer"
                                        >
                                            <img src={googlePlayBadge} alt="Download bei Google Play" className="h-9 w-auto" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UeberMich;
