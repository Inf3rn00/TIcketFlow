import { Link } from "react-router-dom";
import { Ticket, Github, Twitter, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Ticket className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                TicketFlow
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6">
              Modern ticket management solution that helps teams track, manage,
              and resolve issues faster than ever before.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                className="w-8 h-8 rounded-md bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-foreground/80 group-hover:text-foreground" />
              </a>
              <a
                href="https://twitter.com"
                className="w-8 h-8 rounded-md bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-foreground/80 group-hover:text-foreground" />
              </a>
              <a
                href="mailto:hello@ticketflow.com"
                className="w-8 h-8 rounded-md bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-foreground/80 group-hover:text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signup"
                  className="text-muted-foreground hover:text-foreground transition-colors block"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-foreground mb-4 text-sm">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors block cursor-pointer">
                  Documentation
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors block cursor-pointer">
                  Support
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground transition-colors block cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-md border border-input hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TicketFlow. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;