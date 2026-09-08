import React from 'react';
import { CONTACT_EMAIL, NOTE_URL, READS_URL } from '../../data/site';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-paper text-ink font-jp border-t border-ink/10">
      <div className="px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10">
        <div className="lg:col-span-2">
          <span className="marginalia">Contact</span>
        </div>

        <div className="lg:col-span-7">
          <p className="m-0 mb-4 text-[13px] text-ink/60 leading-[1.9]">
            ご相談やお仕事のご依頼は、どうぞお気軽にメールにてご連絡ください。
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rule-underline text-[15px] sm:text-[17px] text-ink tracking-[0.02em]"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-2 items-start">
          <span className="marginalia mb-1">Elsewhere</span>
          <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
            note <span className="text-[9px] align-super">↗</span>
          </a>
          <a href={READS_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
            reads(@izuha) <span className="text-[9px] align-super">↗</span>
          </a>
        </div>
      </div>

      <div className="px-6 md:px-12 py-6 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="marginalia">
          © {currentYear} watashi — izumi haruya
        </span>
        <span className="marginalia">Designed &amp; built in Japan</span>
      </div>
    </footer>
  );
};

export default Footer;
