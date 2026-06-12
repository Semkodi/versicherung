import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Home, User, Mail, ChevronDown, ShieldCheck, GraduationCap, FileCheck, LogIn, ShieldAlert } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/bilder/logo_simply.png";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  icon: React.ReactNode;
  sub?: { title: string; url: string }[];
}

interface ScrollNavbarProps {
  menuItems?: MenuItem[];
  className?: string;
}

const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    title: "Startseite",
    url: "/",
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Über uns",
    url: "/ueber-uns",
    icon: <User className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Vertragscheck",
    url: "/#ordner-check",
    icon: <FileCheck className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Privat",
    url: "/privatkunden",
    icon: <ShieldCheck className="w-5 h-5" />,
    sub: [
      { title: 'Haftpflicht', url: '/privatkunden#haftpflicht' },
      { title: 'Einkommensschutz & Vorsorge', url: '/privatkunden#vorsorge' },
      { title: 'Hausrat', url: '/privatkunden#hausrat' },
      { title: 'Kfz-Versicherung', url: '/privatkunden#kfz-versicherung' },
      { title: 'Kontakt aufnehmen', url: '/privatkunden#kontakt' }
    ]
  },
  {
    id: 5,
    title: "Beamte",
    url: "/beamte",
    icon: <GraduationCap className="w-5 h-5" />,
    sub: [
      { title: 'Dienstunfähigkeitsversicherung', url: '/beamte#dienstunfaehigkeit' },
      { title: 'Private Krankenversicherung', url: '/beamte#krankenversicherung' },
      { title: 'Beihilfe & Heilfürsorge', url: '/beamte#beihilfe' },
      { title: 'Schutz im Referendariat', url: '/beamte#referendariat' },
      { title: 'Kontakt aufnehmen', url: '/beamte#kontakt' }
    ]
  },
  {
    id: 6,
    title: "Kontakt",
    url: "/termin-vereinbaren",
    icon: <Mail className="w-5 h-5" />
  }
];

export const ScrollNavbar: React.FC<ScrollNavbarProps> = ({ 
  menuItems = defaultMenuItems,
  className = ""
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);
  
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setExpandedMenu(null);
  };

  const toggleExpand = (id: number) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const handleNavClick = (pfad: string) => {
    const [pfadName, hashPart] = pfad.split('#');
    if (location.pathname === pfadName || (pfadName === '/' && (location.pathname === '/versicherung' || location.pathname === '/versicherung/'))) {
      if (hashPart) {
        const element = document.getElementById(hashPart);
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      y: 20,
      opacity: 0,
      scale: 0.8
    },
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };


  return (
    <>
      {/* Full Navbar - bleibt beim Scrollen fixiert und wird kleiner */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#dde1e6]/95 backdrop-blur-md shadow-md border-gray-300/60' 
            : 'bg-[#dde1e6] border-gray-300/40'
        } ${className}`}
      >
        <div className="w-full px-4 md:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-14 md:h-16' : 'h-20 md:h-24'
          }`}>
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/" className="flex items-center shrink-0">
                <img 
                  src={logo} 
                  alt="simply switch logo" 
                  className={`w-auto object-contain transition-all duration-300 ${
                    isScrolled ? 'h-12 md:h-14' : 'h-20 md:h-24'
                  }`} 
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-10 xl:space-x-14">
                {menuItems.map((item) => {
                  const isActive = item.url === '/' 
                    ? location.pathname === '/' 
                    : location.pathname.startsWith(item.url.split('#')[0]);

                  return (
                    <motion.div
                      key={item.id}
                      className="relative py-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.url}
                        onClick={() => handleNavClick(item.url)}
                        className={`flex items-center space-x-2 text-base font-bold transition-colors ${isActive ? 'text-[#1e5adb]' : 'text-text-haupt hover:text-[#1e5adb]'}`}
                      >
                        {item.title}
                      </Link>
                      {isActive && (
                        <motion.div
                          layoutId="navbar-hover"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1e5adb] rounded-full"
                          transition={{ type: "spring" as const, stiffness: 500, damping: 35 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons on the Right */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/schaden-melden"
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <ShieldAlert className="w-4 h-4 text-red-200" />
                <span>Schaden melden</span>
              </Link>
              <a
                href="https://login.simplr.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-marke-primaer text-white text-sm font-semibold rounded-lg hover:bg-marke-primaer-hover transition-colors"
              >
                <span>Kundenlogin</span>
                <LogIn className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-md text-text-haupt hover:text-[#1e5adb] focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Hamburger nicht mehr benötigt, da Leiste fixiert bleibt */}

      {/* Floating Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a1930]/40 backdrop-blur-md z-40"
              onClick={toggleMenu}
            />

            {/* Menu Container */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg"
            >
              <div className="relative bg-white/95 border border-white/20 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
                {/* Close Button */}
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-6 right-6 p-2 text-text-haupt hover:text-red-500 rounded-full hover:bg-gray-100 cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Menu Items */}
                <div className="space-y-4 mt-8 max-h-[70vh] overflow-y-auto pr-2">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full"
                    >
                      {item.sub ? (
                        <div>
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer text-left"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="text-[#1e5adb] group-hover:scale-110 transition-transform">
                                {item.icon}
                              </div>
                              <span className="text-lg font-bold text-text-haupt group-hover:text-[#1e5adb] transition-colors">
                                {item.title}
                              </span>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedMenu === item.id ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {expandedMenu === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-12 space-y-2 mt-2 overflow-hidden border-l border-gray-100 ml-6"
                              >
                                {item.sub.map((subItem, idx) => (
                                  <Link
                                    key={idx}
                                    to={subItem.url}
                                    onClick={toggleMenu}
                                    className="block py-2 text-base font-semibold text-gray-600 hover:text-[#1e5adb] transition-colors"
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.url}
                          onClick={() => {
                            handleNavClick(item.url);
                            toggleMenu();
                          }}
                          className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                        >
                          <div className="text-[#1e5adb] group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <span className="text-lg font-bold text-text-haupt group-hover:text-[#1e5adb] transition-colors">
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Schaden Melden & Kundenlogin in Mobile Menu */}
                  <motion.div variants={itemVariants} className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <Link
                      to="/schaden-melden"
                      onClick={toggleMenu}
                      className="flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-200" />
                      <span>Schaden</span>
                    </Link>
                    <a
                      href="https://login.simplr.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 bg-marke-primaer text-white text-sm font-semibold rounded-xl hover:bg-marke-primaer-hover transition-all"
                    >
                      <span>Kundenlogin</span>
                      <LogIn className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-[#1e5adb] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
