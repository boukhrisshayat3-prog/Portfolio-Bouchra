import  Button  from "../components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }  z-50`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
       	<a className="text-lg font-semibold text-slate-900">
					<img src={logo} alt="Logo" className="h-10 max-w-full min-w-6" />
				</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {onLogout && (
            <button
              onClick={onLogout}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Log out
            </button>
          )}
          <Button size="sm">Contact Me</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}

            <Button onClick={() => setIsMobileMenuOpen(false)}>
              Contact Me
            </Button>
            {onLogout && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                className="rounded-full bg-primary px-4 py-2 text-left text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;