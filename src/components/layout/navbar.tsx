"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "./container";
import { Menu, X, RefreshCw } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { cn } from "@/utils";

// Import dropdown from the navbar folder
import Dropdown from "./navbar/dropdown";
import "./navbar/styles/navbar.css";
// Define types for the navigation data
interface DropdownItem {
  title: string;
  path: string;
  description?: string;
}

interface MenuItem {
  id: string;
  title: string;
  path: string;
  order: number;
  icon?: string;
  style?: string;
  dropdown?: {
    items: DropdownItem[];
  };
}

interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: "blue" | "gray";
  order: number;
}

interface BrandData {
  logo: string;
  text: {
    main: string;
    secondary: string;
    tertiary: string;
  };
  description: {
    platform: string;
    studio: string;
  };
  alt: string;
}

interface NavData {
  brand: BrandData;
  menuItems: MenuItem[];
  socialLinks: SocialLink[];
}

// Import navigation data
import navData from "@/data/navigation.json";

// Type assertion
const navigationData = navData as unknown as NavData;

/** [X] Development Studio – baştaki değişir, hepsi ilk harfleri büyük; Development Studio tek başına yazılmaz */
const TAGLINE_PREFIXES = [
  "Ai First",
  "Backend First",
  "Platform Based",
  "Design First",
];
const TAGLINE_SUFFIX = " Development Studio";
const TAGLINE_INTERVAL_MS = 2800;

const wrapperBaseClasses = "flex pt-[0.3rem] md:pt-0 items-center justify-between flex-wrap md:flex-nowrap transition-[height] duration-700 ease-in-out";
const navBaseClasses = "md:items-center max-h-screen md:max-h-max overflow-hidden flex flex-col md:flex-row gap-2 md:gap-0 md:space-x-4 ml-auto w-full md:w-auto mt-[0.4rem] md:mt-0 order-last md:order-1 border-t border-gray-200 md:border-0";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineOpacity, setTaglineOpacity] = useState(1);
  const [taglineTransform, setTaglineTransform] = useState("translateY(0)");
  const [refreshPulsing, setRefreshPulsing] = useState(false);

  // Ensure menu is closed when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Rotating tagline and refresh icon pulse
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTaglineOpacity(0);
      setTaglineTransform("translateY(-8px)");
      setRefreshPulsing(true);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINE_PREFIXES.length);
        setTaglineOpacity(1);
        setTaglineTransform("translateY(0)");
        setTimeout(() => setRefreshPulsing(false), 500);
      }, 220);
    }, TAGLINE_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  // Sort menu items by order
  const sortedMenuItems = [...navigationData.menuItems].sort(
    (a, b) => a.order - b.order
  );
  const sortedSocialLinks = [...navigationData.socialLinks].sort(
    (a, b) => a.order - b.order
  );

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if path is current page
  const isCurrentPage = (itemPath: string) => {
    const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    const normalizedItemPath =
      itemPath === "/" ? "/" : itemPath.replace(/\/$/, "");
    return normalizedPath === normalizedItemPath;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 overflow-hidden">
      <Container>
        <div className="flex flex-col">
          {/* Top navbar section */}
            <div
                className={cn(
                  wrapperBaseClasses,
                  isMenuOpen ? "h-auto md:h-16" : "h-16"
                )}
              >
                {/* Logo and Brand */}
                <Link
                  href="/"
                  className="flex items-center group flex-shrink-0 navbar-brand"
                >
                  {/* Logo with hover animation */}
                  <span className="inline-block mr-2 sm:mr-3 transition-transform duration-200 group-hover:scale-110 flex-shrink-0 navbar-logo">
                    <Image
                      src={navigationData.brand.logo}
                      alt={navigationData.brand.alt}
                      width={40}
                      height={40}
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                    />
                  </span>

                  {/* Brand text and description */}
                  <div className="flex flex-col min-w-0 overflow-hidden navbar-brand-text">
                    {/* Company name */}
                    <div className="flex items-baseline flex-wrap navbar-brand-main">
                      <span className="font-bold font-mono text-lg sm:text-xl text-slate-800">
                        {navigationData.brand.text.main}
                      </span>
                      <span className="font-mono text-slate-500 text-lg sm:text-xl inline-flex items-center gap-1">
                        {navigationData.brand.text.secondary}
                        <RefreshCw
                          className={cn(
                            "w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-slate-400 navbar-refresh-icon",
                            refreshPulsing && "navbar-refresh-pulse"
                          )}
                          aria-hidden
                        />
                      </span>
                      <span className="font-mono text-slate-300 text-lg sm:text-xl">
                        {navigationData.brand.text.tertiary}
                      </span>
                    </div>

                      {/* Hepsi ilk harfleri büyük; Development Studio tek başına gelmez */}
                    <div className="font-mono text-xs sm:text-sm text-slate-400 sm:mt-1 leading-tight navbar-brand-tagline min-h-[1.25rem] flex items-center flex-wrap gap-x-1">
                      <span
                        className="whitespace-nowrap font-bold text-slate-500 normal-case transition-all duration-300 ease-out inline-block"
                        style={{ opacity: taglineOpacity, transform: taglineTransform }}
                      >
                        {TAGLINE_PREFIXES[taglineIndex]}
                      </span>
                      <span className="whitespace-nowrap font-extrabold text-slate-600 normal-case">
                        {TAGLINE_SUFFIX}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Navigation */}
                <nav
                  className={cn(
                    navBaseClasses,
                    isMenuOpen ? "h-full py-4 md:py-0" : "h-0 md:h-auto"
                  )}
                >
                  {sortedMenuItems.map((item) => (
                    <React.Fragment key={item.id}>
                      {item.dropdown ? (
                        <Dropdown
                          trigger={item.title}
                          items={item.dropdown.items}
                          currentPath={pathname}
                          isActive={isCurrentPage(item.path)}
                        />
                      ) : (
                        <Link
                          href={item.path}
                          className={`text-sm font-medium px-4 md:px-2 py-2 rounded-lg transition-colors focus:outline-none ${
                            isCurrentPage(item.path)
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {item.title}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}

                  {/* Social Links */}
                  <div className="w-full md:w-auto flex justify-center md:justify-start items-center space-x-px pl-2 border-t md:border-0 md:border-l border-gray-200 md:h-8 self-center mt-2 pt-4 md:mt-0 md:pt-0">
                    {sortedSocialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`navbar-social-link ${link.color}`}
                        title={link.title}
                        style={{
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {link.icon === "github" && (
                          <SocialIcon
                            name="github"
                            size={28}
                            color="#23272F"
                            withBackground
                          />
                        )}
                        {link.icon === "linkedin" && (
                          <SocialIcon name="linkedin" size={30} withBackground />
                        )}
                      </a>
                    ))}
                  </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 navbar-menu-toggle focus:outline-none"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>
      </Container>
    </header>
  );
}

// Export the Navbar component as both default and named export
export default Navbar;
export { Navbar };
