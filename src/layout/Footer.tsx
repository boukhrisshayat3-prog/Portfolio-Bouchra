import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import logo from "../assets/logo.png";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/boukhrisshayat3-prog?tab=repositories", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/bouchra-boukhriss-9590b4228", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/bouchra__dev?igsh=YXl0aTZtdndlOXNx", label: "Instagram" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a className="text-lg font-semibold text-slate-900">
					<img src={logo} alt="Logo" className="h-10 max-w-full min-w-6" />
				</a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Bouchra Boukhriss. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
