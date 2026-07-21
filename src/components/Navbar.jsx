import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { logo } from "../assets";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [navHeight, setNavHeight] = useState(60);

    const contentRef = useRef(null);

    const cardStyles = [
        { bg: "#915eff", text: "#ffffff" },
        { bg: "#1d1836", text: "#ffffff" },
        { bg: "#151030", text: "#ffffff" },
    ];

    const calculateHeight = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile && contentRef.current) {
            return 60 + contentRef.current.scrollHeight + 16;
        }
        return 260;
    };

    useEffect(() => {
        const handleResize = () => {
            if (isExpanded) {
                setNavHeight(calculateHeight());
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            setTimeout(() => setNavHeight(calculateHeight()), 10);
        } else {
            setIsHamburgerOpen(false);
            setIsExpanded(false);
            setNavHeight(60);
        }
    };

    const closeMenu = (title) => {
        setActive(title);
        if (isExpanded) {
            setIsHamburgerOpen(false);
            setIsExpanded(false);
            setNavHeight(60);
        }
    };

    return (
        <div className="card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-[100] top-[1.2em] md:top-[2em]">
            <nav
                className={`card-nav block p-0 rounded-xl shadow-md relative overflow-hidden bg-primary w-full`}
                style={{
                    height: `${navHeight}px`,
                    transition:
                        "height 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none text-white`}
                        onClick={toggleMenu}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleMenu();
                            }
                        }}
                        role="button"
                        aria-label={isExpanded ? "Close menu" : "Open menu"}
                        aria-expanded={isExpanded}
                        tabIndex={0}
                    >
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ease-linear origin-center ${isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""} group-hover:opacity-75`}
                        />
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-all duration-300 ease-linear origin-center ${isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""} group-hover:opacity-75`}
                        />
                    </div>

                    <Link
                        to="/"
                        className="logo-container flex items-center gap-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none"
                        onClick={() => {
                            closeMenu("");
                            window.scrollTo(0, 0);
                        }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-9 h-9 object-contain"
                        />
                        <p className="text-white text-[18px] font-bold cursor-pointer flex">
                            Mohammed &nbsp;
                            <span className="sm:block hidden">| Awad</span>
                        </p>
                    </Link>

                    <a
                        href="#contact"
                        onClick={() => closeMenu("Contact")}
                        className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-5 items-center h-[80%] font-medium cursor-pointer transition-colors duration-300 bg-[#915eff] text-white hover:bg-[#7b4be3]"
                    >
                        Get In Touch
                    </a>
                </div>

                <div
                    ref={contentRef}
                    className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] md:flex-row md:items-end md:gap-[12px] transition-all duration-300 ${
                        isExpanded
                            ? "visible pointer-events-auto opacity-100"
                            : "invisible pointer-events-none opacity-0"
                    }`}
                    aria-hidden={!isExpanded}
                >
                    {navLinks.slice(0, 3).map((link, idx) => {
                        const style = cardStyles[idx % cardStyles.length];
                        return (
                            <div
                                key={link.id}
                                className={`nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[70px] md:h-full md:min-h-0 md:flex-[1_1_0%] transition-all duration-[400ms] ease-out ${
                                    isExpanded
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                                style={{
                                    backgroundColor: style.bg,
                                    color: style.text,
                                    transitionDelay: isExpanded
                                        ? `${idx * 100 + 100}ms`
                                        : "0ms",
                                }}
                            >
                                <div className="nav-card-label font-bold tracking-wide text-[20px] md:text-[24px]">
                                    {link.title}
                                </div>

                                <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                                    <a
                                        className={`nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px] ${active === link.title ? "opacity-50" : "opacity-100"}`}
                                        href={`#${link.id}`}
                                        onClick={() => closeMenu(link.title)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="nav-card-link-icon shrink-0 w-[18px] h-[18px]"
                                            aria-hidden="true"
                                        >
                                            <line
                                                x1="7"
                                                y1="17"
                                                x2="17"
                                                y2="7"
                                            ></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                        Go to {link.title}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
