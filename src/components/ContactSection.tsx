import { Mail, MessageCircle, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import TextScramble from './TextScramble';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const ContactSection = () => {
  const { data } = usePortfolio();
  const { contact } = data;

  const CONTACT_METHODS: ContactMethod[] = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsappDisplay, href: `https://wa.me/${contact.whatsapp}` },
    { icon: Linkedin, label: 'LinkedIn', value: contact.linkedinDisplay, href: contact.linkedin },
    { icon: MapPin, label: 'Location', value: contact.location, href: `https://maps.google.com/?q=${encodeURIComponent(contact.location)}` },
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          <TextScramble text="GET IN TOUCH" className="hero-heading" delay={0} speed={0.8} />
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', fontFamily: "'Space Mono', monospace" }}
        >
          <TextScramble text="PICK WHICHEVER CHANNEL SUITS YOU" delay={0.2} speed={1.2} />
        </p>
      </FadeIn>

      {/* Contact cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={30}>
              <a
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative flex h-full flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#1a1a20] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/50">
                    <Icon
                      className="text-[#D7E2EA]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <ArrowUpRight
                    className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:text-[#D7E2EA] group-hover:rotate-12"
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <span
                    className="font-light tracking-widest text-[#D7E2EA]/50"
                    style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)', fontFamily: "'Space Mono', monospace" }}
                  >
                    <TextScramble text={method.label.toUpperCase()} delay={i * 0.1} speed={1.5} />
                  </span>
                  <span
                    className="font-medium text-[#D7E2EA] break-all"
                    style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontFamily: "'Space Mono', monospace" }}
                  >
                    <TextScramble text={method.value} delay={i * 0.1 + 0.2} speed={1.2} />
                  </span>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            {contact.copyright}
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            {contact.builtIn}
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
