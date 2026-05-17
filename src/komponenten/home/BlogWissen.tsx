import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

const BlogWissen = () => {
    const articles = [
        {
            kategorie: "Beamte",
            titel: "Die perfekte PKV für Beamte: Worauf du bei der Wahl achten musst",
            bild: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
            link: "/wissen/pkv-beamte"
        },
        {
            kategorie: "Selbstständige",
            titel: "Berufsunfähigkeit als Selbstständiger: So sicherst du deine Existenz",
            bild: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
            link: "/wissen/bu-selbststaendige"
        },
        {
            kategorie: "Privatkunden",
            titel: "Familie absichern: Diese 3 Versicherungen sind ein absolutes Muss",
            bild: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600",
            link: "/wissen/familie-absichern"
        }
    ];

    return (
        <section id="wissen" className="py-24 bg-[#f8f9fc] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-[#e8effd] text-[#1e5adb] px-4 py-1.5 rounded-full mb-4 font-semibold text-xs uppercase tracking-wide">
                            Blog & Ratgeber
                        </div>
                        <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-[#0a1930] leading-tight mb-4">
                            Wissen für deine Sicherheit
                        </h2>
                        <p className="text-[#4a5568] text-lg font-normal">
                            Die wichtigsten Antworten rund um Versicherungen, Vorsorge und Finanzen – einfach und verständlich erklärt.
                        </p>
                    </div>
                    <a
                        href="/wissen"
                        className="inline-flex items-center gap-2 text-[#1e5adb] font-bold hover:text-[#0a1930] transition-colors group"
                    >
                        Alle Artikel lesen
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.bild}
                                    alt={article.titel}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0a1930]">
                                    {article.kategorie}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0a1930] mb-4 leading-snug group-hover:text-[#1e5adb] transition-colors">
                                    {article.titel}
                                </h3>
                                <div className="mt-auto">
                                    <a
                                        href={article.link}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-[#4a5568] group-hover:text-[#1e5adb] transition-colors"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Artikel lesen
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogWissen;
