import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/bilder/logo_simply.png';

const Navigationsleiste = () => {
    const [istGescrollt, setIstGescrollt] = useState(false);
    const [menueOffen, setMenueOffen] = useState(false);
    const aktuellerOrt = useLocation();

    useEffect(() => {
        const behandleScrollen = () => {
            setIstGescrollt(window.scrollY > 20);
        };
        window.addEventListener('scroll', behandleScrollen);
        return () => window.removeEventListener('scroll', behandleScrollen);
    }, []);

    const navigationsLinks = [
        { name: 'Startseite', pfad: '/' },
        { 
            name: 'Privatkunden', 
            pfad: '/privatkunden',
            sub: [
                { name: 'Haftpflicht', pfad: '/privatkunden' },
                { name: 'Hausrat', pfad: '/privatkunden' },
                { name: 'Kfz-Versicherung', pfad: '/privatkunden' },
                { name: 'Vorsorge', pfad: '/privatkunden' }
            ]
        },
        { 
            name: 'Beamte', 
            pfad: '/beamte',
            sub: [
                { name: 'Dienstunfähigkeit', pfad: '/beamte' },
                { name: 'Private Krankenversicherung', pfad: '/beamte' },
                { name: 'Beihilfe & Heilfürsorge', pfad: '/beamte' },
                { name: 'Referendariat', pfad: '/beamte' }
            ]
        },
        { 
            name: 'Selbstständige', 
            pfad: '/gewerbekunden',
            sub: [
                { name: 'Betriebshaftpflicht', pfad: '/gewerbekunden' },
                { name: 'Inhaltsversicherung', pfad: '/gewerbekunden' },
                { name: 'Flottenversicherung', pfad: '/gewerbekunden' },
                { name: 'Rechtsschutz', pfad: '/gewerbekunden' }
            ]
        },
        { name: 'Über uns', pfad: '/#ueber-mich' },
        { name: 'FAQ', pfad: '/#faq' },
        { name: 'Kontakt', pfad: '/#kontakt' }
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ease-out top-0 left-0 right-0 bg-white border-b ${istGescrollt ? 'border-gray-100 shadow-sm py-2' : 'border-transparent py-4'}`}
        >
            <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex items-center justify-between">

                {/* Logo ganz links */}
                <Link to="/" className="flex items-center shrink-0 relative z-10">
                    <img
                        src={logo}
                        alt="simply switch logo"
                        className={`${istGescrollt ? 'h-14 md:h-16' : 'h-20 md:h-24'} w-auto object-contain transition-all duration-300`}
                    />
                </Link>

                {/* Desktop-Navigation in der Mitte */}
                <nav className="hidden lg:flex items-center gap-12">
                    {navigationsLinks
                        .filter(link => link.name !== 'Startseite' || aktuellerOrt.pathname !== '/')
                        .map((link) => {
                            if (link.sub) {
                                return (
                                    <div key={link.name} className="relative group py-2">
                                        <Link
                                            to={link.pfad}
                                            className={`text-sm font-semibold transition-colors flex items-center gap-1 ${aktuellerOrt.pathname === link.pfad
                                                ? 'text-marke-primaer'
                                                : 'text-text-haupt hover:text-marke-primaer'
                                                }`}
                                        >
                                            {link.name}
                                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                        </Link>
                                        
                                        {/* Premium Dropdown Menu */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                            {link.sub.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.pfad}
                                                    className="block px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-marke-primaer hover:bg-gray-50 transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.name}
                                    to={link.pfad}
                                    className={`text-sm font-semibold transition-colors ${aktuellerOrt.pathname === link.pfad
                                        ? 'text-marke-primaer'
                                        : 'text-text-haupt hover:text-marke-primaer'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                </nav>

                {/* Desktop-Aktionen (Kundenlogin rechts) */}
                <div className="hidden lg:flex items-center gap-4">
                    <a
                        href="https://id.simplr.de/login?login_challenge=9Xwn_YPQDtXYruVLoMQO-LEsPlWky4WUU42kdpz_muzhzk7jAfRPUaQbpME9FrpO__jMe1D0f1l8OR__O6eueWANyQRcoRK3QMONcLxCoD6OyINq2dMJGxNT70OE8YtJjfoSsh1goLGL78fgI6kORQ-5f7HhfjNMX2oJ9uW6207mDXm7hnviSQvZFQDdPdYfXiptRhNymJ_hxfGm0jyQQM5Lu9wq4i4A90WbhnmK0tpfUIOGL9YmE1vkeId0U9zvaBaK4FEAlUTF8i4ljJo7ctcT4GfjPmatKnoezwRRprZm6fwkjZ7rs5HNoy3dk1awhVYseXsSUbH80vpXpcK-gx64RB-vR0INuci3pzux-AhD84d9pPsNVAHgRoaZleMR6PwXxEbAJBKdomzKQGJvZ_ySn6XZVQSImF2VifVdW37SF1v0e2dRXkAkT_kMtqM__XUfIP4DYywjrF_QHHJ_PCt4p8B02n5wLlOhLbcLx4JTFroRE_1MgFowBS0njl3rYDdas8K63PeQdRIGWiX7f3i0GfInCctVv1D_2RuAmOoINJyfkgsjJ_JOZ4nZKNQy2BmD8LM72I_5UPWleIaJe39omVNUHbtJEYmpRt5XhCg4t1w6WFsl23H_6CeKt6BjLEmvym53WtAm8NkxnOpjc6QiMgDcMIQ15v3KrP3QZae8wDc7IxHyaN59-iMHFgEfvLTUAUrJ8ruJNIvhRIoKKU0GDp1LzbWp-AKR6Etk1nUPOByBsNxv411B-RHzb0K39FWDUehIxAIdS0-YG3JntaoCWHp-1jLsbw_6g0I5rCvW4iEbwvmxxEn_h0w4Lj2U9wHbUb5D4e14BBtMmY1o-HJYkfPjWZX0Ib_3rxhE7gyVOO3uUThMsMiLAao4yufBd2JgbypeUv7lMmqFwVXymcfL3XbRU8YDb25N9B6ICu5uQO15Cgqon-V-yzclb9WKkf-hQR3nfdKy703RaQABKuMzmUQcIcFmzRBbjT9Yn9AaS44s1l1WmOqH2LgimKIAiMGAtOC-vEJ7hfKefMEIrg9CpDn4tEGB9f1pHkRw9ZZnRk1gXMYaEnZX_FhoVj-60I5e_G3huwx9NAUCYjsK01hUg9vI0AL5JO2d68JXXmH_XKEYLRljd04EN8r5FLS4RGXvYO7jLYVwMSemYeGgf8GtJ4Kc4QAn4EbI6d2dk_-fFarYmZQBu8K83CwI7hgsLvc2k817gPlYB-zdswKg2jjoXIVjQMFuEEAkCRtxAPB2Zu-lgAQh_XtI3srqbr4gK0trM9wj6nVGKOeLZ_B4XTIw2Vjb1NtG9H9ebBucC7dTHx_LfLchPTuKK1eMcqzEVTmeXIoYP70P_gbIDaz66z9DW8paSCyze25VJu76oxwkzi_U6b6Q1NhZtV74dMdbwBfCIT53xTMAp7onIJkdGBM2bcO6SZGnE2DbhLekFrmZAS-FceEMwfWwGQmwPw71xfyGPWKiLTYv4ecDqjuPmM74MrWuFJo86xrsUiwHNoS3xg7k0TQ6RYX5IK3mWGLr2MgQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#0a1930] text-white text-sm font-semibold rounded-lg hover:bg-[#152a4f] transition-colors"
                    >
                        <span>Kundenlogin</span>
                        <User className="w-4 h-4" />
                    </a>
                </div>

                {/* Mobile Menü Toggle (rechts auf Mobile) */}
                <button
                    className="lg:hidden p-2 text-text-haupt hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setMenueOffen(!menueOffen)}
                >
                    {menueOffen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobiles Menü */}
            <AnimatePresence>
                {menueOffen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navigationsLinks
                                .filter(link => link.name !== 'Startseite' || aktuellerOrt.pathname !== '/')
                                .map((link) => (
                                    <div key={link.name} className="space-y-1">
                                        <Link
                                            to={link.pfad}
                                            className="block px-4 py-3 text-base font-semibold text-text-haupt hover:bg-gray-50 rounded-lg"
                                            onClick={() => setMenueOffen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.sub && (
                                            <div className="pl-6 space-y-1 border-l border-gray-100 ml-4">
                                                {link.sub.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.pfad}
                                                        className="block px-4 py-2 text-sm font-medium text-gray-500 hover:text-marke-primaer hover:bg-gray-50 rounded-md"
                                                        onClick={() => setMenueOffen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            <div className="pt-4 mt-2 border-t border-gray-100">
                                <a
                                    href="https://id.simplr.de/login?login_challenge=9Xwn_YPQDtXYruVLoMQO-LEsPlWky4WUU42kdpz_muzhzk7jAfRPUaQbpME9FrpO__jMe1D0f1l8OR__O6eueWANyQRcoRK3QMONcLxCoD6OyINq2dMJGxNT70OE8YtJjfoSsh1goLGL78fgI6kORQ-5f7HhfjNMX2oJ9uW6207mDXm7hnviSQvZFQDdPdYfXiptRhNymJ_hxfGm0jyQQM5Lu9wq4i4A90WbhnmK0tpfUIOGL9YmE1vkeId0U9zvaBaK4FEAlUTF8i4ljJo7ctcT4GfjPmatKnoezwRRprZm6fwkjZ7rs5HNoy3dk1awhVYseXsSUbH80vpXpcK-gx64RB-vR0INuci3pzux-AhD84d9pPsNVAHgRoaZleMR6PwXxEbAJBKdomzKQGJvZ_ySn6XZVQSImF2VifVdW37SF1v0e2dRXkAkT_kMtqM__XUfIP4DYywjrF_QHHJ_PCt4p8B02n5wLlOhLbcLx4JTFroRE_1MgFowBS0njl3rYDdas8K63PeQdRIGWiX7f3i0GfInCctVv1D_2RuAmOoINJyfkgsjJ_JOZ4nZKNQy2BmD8LM72I_5UPWleIaJe39omVNUHbtJEYmpRt5XhCg4t1w6WFsl23H_6CeKt6BjLEmvym53WtAm8NkxnOpjc6QiMgDcMIQ15v3KrP3QZae8wDc7IxHyaN59-iMHFgEfvLTUAUrJ8ruJNIvhRIoKKU0GDp1LzbWp-AKR6Etk1nUPOByBsNxv411B-RHzb0K39FWDUehIxAIdS0-YG3JntaoCWHp-1jLsbw_6g0I5rCvW4iEbwvmxxEn_h0w4Lj2U9wHbUb5D4e14BBtMmY1o-HJYkfPjWZX0Ib_3rxhE7gyVOO3uUThMsMiLAao4yufBd2JgbypeUv7lMmqFwVXymcfL3XbRU8YDb25N9B6ICu5uQO15Cgqon-V-yzclb9WKkf-hQR3nfdKy703RaQABKuMzmUQcIcFmzRBbjT9Yn9AaS44s1l1WmOqH2LgimKIAiMGAtOC-vEJ7hfKefMEIrg9CpDn4tEGB9f1pHkRw9ZZnRk1gXMYaEnZX_FhoVj-60I5e_G3huwx9NAUCYjsK01hUg9vI0AL5JO2d68JXXmH_XKEYLRljd04EN8r5FLS4RGXvYO7jLYVwMSemYeGgf8GtJ4Kc4QAn4EbI6d2dk_-fFarYmZQBu8K83CwI7hgsLvc2k817gPlYB-zdswKg2jjoXIVjQMFuEEAkCRtxAPB2Zu-lgAQh_XtI3srqbr4gK0trM9wj6nVGKOeLZ_B4XTIw2Vjb1NtG9H9ebBucC7dTHx_LfLchPTuKK1eMcqzEVTmeXIoYP70P_gbIDaz66z9DW8paSCyze25VJu76oxwkzi_U6b6Q1NhZtV74dMdbwBfCIT53xTMAp7onIJkdGBM2bcO6SZGnE2DbhLekFrmZAS-FceEMwfWwGQmwPw71xfyGPWKiLTYv4ecDqjuPmM74MrWuFJo86xrsUiwHNoS3xg7k0TQ6RYX5IK3mWGLr2MgQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#0a1930] text-white font-bold rounded-lg hover:bg-[#152a4f] transition-colors"
                                >
                                    <span>Kundenlogin</span>
                                    <User className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navigationsleiste;
