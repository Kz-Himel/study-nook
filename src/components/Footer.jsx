import Link from "next/link";
import { HiBookmarkAlt } from "react-icons/hi";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-8"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "var(--brand)" }}
              >
                <HiBookmarkAlt size={17} color="white" />
              </div>
              <span className="font-bold text-[var(--text-primary)] text-lg tracking-tight">
                Study<span style={{ color: "var(--brand)" }}>Nook</span>
              </span>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mb-5">
              Your go-to platform for booking and listing premium study rooms in
              your library. Focus better, achieve more.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: FiFacebook, href: "#" },
                { icon: FaXTwitter, href: "#" },
                { icon: FiLinkedin, href: "#" },
                { icon: FiInstagram, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 text-[var(--text-muted)] hover:text-[var(--brand)] hover:bg-[var(--brand-light)]"
                  style={{ border: "1px solid var(--border-color)" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-bold text-[var(--text-primary)] text-sm mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {["Home", "Rooms", "About", "Become a Host"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[var(--text-primary)] text-sm mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {["How it works", "Pricing", "FAQs", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[var(--text-primary)] text-sm mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <FiMail size={15} className="mt-0.5 flex-shrink-0 text-[var(--brand)]" />
                hello@studynook.com
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <FiPhone size={15} className="mt-0.5 flex-shrink-0 text-[var(--brand)]" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <FiMapPin size={15} className="mt-0.5 flex-shrink-0 text-[var(--brand)]" />
                123 Library Lane, Knowledge City, 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <p className="text-xs text-[var(--text-muted)]">
            © 2024 StudyNook. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <Link href="#" className="hover:text-[var(--brand)] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[var(--brand)] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}