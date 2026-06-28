import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import beamteImg from '@/assets/bilder/zielgruppe_beamte.webp';
import privatkundenImg from '@/assets/bilder/zielgruppe_privatkunden.webp';

const gruppen = [
    {
        titel: "Beamte",
        beschreibung: "Absicherung, Vorsorge und Versorgung – passgenau für deinen Status und dein Leben.",
        image: beamteImg,
        alt: "Beamter bei einer digitalen Versicherungsberatung",
        link: "/beamte",
        bildPosition: "object-center",
    },
    {
        titel: "Privatkunden",
        beschreibung: "Schutz und Vorsorge für dich und deine Familie – verständlich, fair und unabhängig.",
        image: privatkundenImg,
        alt: "Paar bei einer digitalen Versicherungsberatung",
        link: "/privatkunden",
        bildPosition: "object-center",
    }
];

const Zielgruppen = () => {
    return (
        <section id="zielgruppen" className="relative overflow-hidden bg-white py-20 scroll-mt-20 md:py-24">
            <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
                    <h2 className="text-[2rem] font-bold leading-[1.12] tracking-[-0.014em] text-marke-sekundaer md:text-[3rem]">
                        Für Beamte. Für Privatkunden.
                        <br />
                        Für Menschen, die Klarheit wollen.
                    </h2>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                    {gruppen.map((gruppe, idx) => (
                        <motion.article
                            key={gruppe.titel}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.55, delay: idx * 0.08, ease: "easeOut" }}
                            className="relative min-h-[390px] overflow-hidden rounded-lg bg-marke-sekundaer shadow-[0_14px_40px_rgba(2,10,57,0.12)] md:min-h-[420px]"
                        >
                            <Link
                                to={gruppe.link}
                                aria-label={`${gruppe.titel}: Mehr erfahren`}
                                className="group absolute inset-0 cursor-pointer overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-marke-primaer focus-visible:ring-offset-4"
                            >
                                <img
                                    src={gruppe.image}
                                    alt={gruppe.alt}
                                    className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] ${gruppe.bildPosition}`}
                                />

                                <div
                                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,57,0.40)_0%,rgba(2,10,57,0.15)_42%,rgba(2,10,57,0.0)_75%),linear-gradient(0deg,rgba(2,10,57,0.55)_0%,rgba(2,10,57,0)_60%)] transition-opacity duration-300 group-hover:opacity-95"
                                    aria-hidden="true"
                                />

                                <div className="absolute inset-x-0 bottom-0 z-10 max-w-[390px] p-7 text-white sm:p-8 md:p-9">
                                    <h3 className="text-3xl font-bold tracking-[-0.035em] md:text-[2rem]">
                                        {gruppe.titel}
                                    </h3>
                                    <p className="mt-3 text-sm font-medium leading-relaxed text-white/90 sm:text-base">
                                        {gruppe.beschreibung}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/65 px-4 py-2.5 text-sm font-bold text-white transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-marke-sekundaer">
                                        Mehr erfahren
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Zielgruppen;
