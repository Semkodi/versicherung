import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo2-Photoroom.png';

const Navigationsleiste = () => {
    const [istGescrollt, setIstGescrollt] = useState(false);
    const [menueOffen, setMenueOffen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIstGescrollt(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Fehler vermeiden', href: '#fehler' },
        { name: 'So arbeite ich', href: '#so-arbeite-ich' },
        { name: 'Erfahrungen', href: '#bewertungen' },
        { name: 'Kontakt', href: '#kontakt' },
        { name: 'Über mich', href: '#ueber-mich' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
            className={`fixed w-full z-50 transition-all duration-700 ease-out left-0 right-0 ${istGescrollt ? 'top-2 sm:top-6 px-4' : 'top-0 px-0'}`}
        >
            <div className={`mx-auto transition-all duration-700 ease-out ${istGescrollt
                ? 'max-w-6xl bg-[#020A39]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl border border-white/20 py-2 px-6 sm:px-8'
                : 'max-w-7xl bg-gradient-to-b from-[#020A39]/90 via-[#020A39]/40 to-transparent py-6 px-4 sm:px-6 lg:px-8'
                }`}>
                <div className="flex justify-between items-center">
                    {/* Responsives, voll sichtbares Logo ohne Abschneiden */}
                    <a href="#" className="flex items-center group shrink-0 relative z-10 block">
                        <img
                            src={logo}
                            alt="simply switch logo"
                            className={`${istGescrollt ? 'h-14 sm:h-16' : 'h-24 sm:h-32'} w-auto object-contain transition-all duration-700 ease-out transform group-hover:scale-105 drop-shadow-[0_10px_25px_rgba(255,255,255,0.15)]`}
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-bold tracking-wide text-white/90 hover:text-white transition-all relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-marke-highlight after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="https://id.simplr.de/login?login_challenge=xKlEl3yyPMBrBZBXpkz5l2_R7NXTx0drVZUKM7bmbaa1cD-DD3ag01F-tlT7YXKR2hZja2HEjXk4RZVl3uh1cYZ91i4r9PdYHJzGVnJWJwkGcMgS7y0diTqCdGdH1QQqomEAv4_abNfQ12HkIIoFkJbwbRkANsy3GFpugnJn16z4P6xNtBKsHHFDRG9UJZUQt_WWOx0-GRohX5rMC17jZUCKhCLfvog5ac1OoZ5mk9rJuPH9r7rKjDyK2iJ4ZHVzV0wv4tt1m6ZPR8c_j2UUMaOP7YoLprW3oror-iXau6e39wQytRPsWUCtwMx3K5JVJSiF4XAjFLUvjPtl8kYX2W1H9x8Uzq0GiznyDK1mhCWqafrE1jzFJ4g1wSYS8iBXYhmi49qstZSm9Xu9GrAyv08KiBcS4M7IbYOvGJn9KfmvrKonbisQMoLp_GnP0xtajo8aAaPMkgHkN-wdk1e0ROG2dPCXI4B6AxWwYblFq65jfoPNNcdKgto5Mye7oBGpU8JB_Quams3zlx8NZ7Th1AwzwvvHW4tSo4pGQpS7FhcFLqvASQaenirNzNQKqSBHRrQthI9uOilGwJ0qtOgxeiX_cerxwtP_1nGxn-XRg9js0YtBlcH6qMAoK_PLsv4PwUeaaWvQ1j7Ha95edTPCPwJfG3cZ4DaDuKkGuTg_FuGiOa7lwBuOC_Ae3DXqO9UXk972pZdTSGmvIjV0I5ClC2dDz9teQEXenztjccAv9vYudKtsafSk8ZGVl5_9wBn8B3rz8a9rcNZhR6px17iZFnKRdoyKBEUh1HkkNjGIm2KGlcVkvfZqKUiMr1HLmX2sBLoO53FIrHreCP8C8wLpqQnuK9A1Iqpv7F7XBzQSxbz0ION9G1MbqZU6w1Si--wLv2ERU01owkiFwL9tC9GBgJamnP3KSLIBXbqlR6yByCD6gWtI0utXoc71suU2TbfabRiMuS3N-JKYyH_1By_tYMpzbEaDqXmNykqlEaYLjRGaMVcx3W37X2efFHYEvWAvyWXAwqnEBsQhEAVlAyqyD9o6dzXH_H_eswNHsvxFe6dWFKCS2F2Y3Jp5FsEnDprEA5J2s94XbFxXs3mSHmyMlDEO9UapbTIxpOaKvKwzKMks3r3pSfJjN5JwIz7IZIaxiAzOg_EZJvtzMYFkTXGlNn02oiQQ2BwJrYNr20m9nPrJxivp6XoBQAsylgnyhi_8QyJ7hbuIlAEpRC7r4AvHJvFagkCIxqlkFF_GgDSTj6jCvVLF_pApzrJMOlgukw5i3BLk7QxEQy-sXxt4wAyiZEacOtpIb9LTIajmuicd2nVVBal2MwndgF_cePb9aOAr7oW9ra8PROckfvlipQwfjMVJhWWrPOtSeJxnkkM0Z8I2Mt7DiTbFtNMIo4NgL3_P2lZzPXScBtLMi5wM-PLIPGIsrt4LX65Ym3FpJWgX_DhJ5CU2DnnPqsRDgGLXRpQUYt2Ksseo-Aira6Iwwhw5yoQR6glgktcSWO1FAyWFdTjiyQCpB_d7s4UxYjxrYkpeMnZRBxJh_CizOZsjBJRXA1EOTaFLZ1Vqq5T6MXnU9fhydSoQMNw_PgwUcMOtq1FEtHpI2akgSqAzI5r2l6p_BRgCVIPaQeDQO8g0RvgIwtcLIQqhgjLtrWnDgPEH9eWJjhyex1xjFRlaIOfQ9QCnMm877XJCsP-iXSamLw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-marke-primaer text-white rounded-full font-black transition-all shadow-[0_4px_15px_rgba(2,83,238,0.3)] hover:shadow-[0_8px_25px_rgba(2,83,238,0.5)] hover:bg-marke-highlight hover:text-marke-sekundaer hover:-translate-y-1"
                        >
                            Kundenlogin
                        </a>
                    </div>

                    {/* Mobile Menü Button */}
                    <button
                        className="lg:hidden p-2 text-white transition-colors"
                        onClick={() => setMenueOffen(!menueOffen)}
                        aria-label="Menü umschalten"
                    >
                        {menueOffen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menü – Jetzt auch Dunkel */}
            {menueOffen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-marke-sekundaer border-t border-white/10 shadow-2xl animate-fade-in-up origin-top">
                    <div className="flex flex-col p-6 space-y-5">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white font-bold text-lg p-3 hover:bg-white/10 rounded-xl transition-colors border-l-2 border-transparent hover:border-marke-highlight"
                                onClick={() => setMenueOffen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="https://id.simplr.de/login?login_challenge=xKlEl3yyPMBrBZBXpkz5l2_R7NXTx0drVZUKM7bmbaa1cD-DD3ag01F-tlT7YXKR2hZja2HEjXk4RZVl3uh1cYZ91i4r9PdYHJzGVnJWJwkGcMgS7y0diTqCdGdH1QQqomEAv4_abNfQ12HkIIoFkJbwbRkANsy3GFpugnJn16z4P6xNtBKsHHFDRG9UJZUQt_WWOx0-GRohX5rMC17jZUCKhCLfvog5ac1OoZ5mk9rJuPH9r7rKjDyK2iJ4ZHVzV0wv4tt1m6ZPR8c_j2UUMaOP7YoLprW3oror-iXau6e39wQytRPsWUCtwMx3K5JVJSiF4XAjFLUvjPtl8kYX2W1H9x8Uzq0GiznyDK1mhCWqafrE1jzFJ4g1wSYS8iBXYhmi49qstZSm9Xu9GrAyv08KiBcS4M7IbYOvGJn9KfmvrKonbisQMoLp_GnP0xtajo8aAaPMkgHkN-wdk1e0ROG2dPCXI4B6AxWwYblFq65jfoPNNcdKgto5Mye7oBGpU8JB_Quams3zlx8NZ7Th1AwzwvvHW4tSo4pGQpS7FhcFLqvASQaenirNzNQKqSBHRrQthI9uOilGwJ0qtOgxeiX_cerxwtP_1nGxn-XRg9js0YtBlcH6qMAoK_PLsv4PwUeaaWvQ1j7Ha95edTPCPwJfG3cZ4DaDuKkGuTg_FuGiOa7lwBuOC_Ae3DXqO9UXk972pZdTSGmvIjV0I5ClC2dDz9teQEXenztjccAv9vYudKtsafSk8ZGVl5_9wBn8B3rz8a9rcNZhR6px17iZFnKRdoyKBEUh1HkkNjGIm2KGlcVkvfZqKUiMr1HLmX2sBLoO53FIrHreCP8C8wLpqQnuK9A1Iqpv7F7XBzQSxbz0ION9G1MbqZU6w1Si--wLv2ERU01owkiFwL9tC9GBgJamnP3KSLIBXbqlR6yByCD6gWtI0utXoc71suU2TbfabRiMuS3N-JKYyH_1By_tYMpzbEaDqXmNykqlEaYLjRGaMVcx3W37X2efFHYEvWAvyWXAwqnEBsQhEAVlAyqyD9o6dzXH_H_eswNHsvxFe6dWFKCS2F2Y3Jp5FsEnDprEA5J2s94XbFxXs3mSHmyMlDEO9UapbTIxpOaKvKwzKMks3r3pSfJjN5JwIz7IZIaxiAzOg_EZJvtzMYFkTXGlNn02oiQQ2BwJrYNr20m9nPrJxivp6XoBQAsylgnyhi_8QyJ7hbuIlAEpRC7r4AvHJvFagkCIxqlkFF_GgDSTj6jCvVLF_pApzrJMOlgukw5i3BLk7QxEQy-sXxt4wAyiZEacOtpIb9LTIajmuicd2nVVBal2MwndgF_cePb9aOAr7oW9ra8PROckfvlipQwfjMVJhWWrPOtSeJxnkkM0Z8I2Mt7DiTbFtNMIo4NgL3_P2lZzPXScBtLMi5wM-PLIPGIsrt4LX65Ym3FpJWgX_DhJ5CU2DnnPqsRDgGLXRpQUYt2Ksseo-Aira6Iwwhw5yoQR6glgktcSWO1FAyWFdTjiyQCpB_d7s4UxYjxrYkpeMnZRBxJh_CizOZsjBJRXA1EOTaFLZ1Vqq5T6MXnU9fhydSoQMNw_PgwUcMOtq1FEtHpI2akgSqAzI5r2l6p_BRgCVIPaQeDQO8g0RvgIwtcLIQqhgjLtrWnDgPEH9eWJjhyex1xjFRlaIOfQ9QCnMm877XJCsP-iXSamLw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center px-6 py-5 bg-marke-highlight text-marke-sekundaer rounded-xl font-black shadow-xl"
                        >
                            Kundenlogin
                        </a>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navigationsleiste;
