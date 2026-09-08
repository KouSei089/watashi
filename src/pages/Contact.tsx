import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Footer from '../components/layout/Footer';
import { CONTACT_EMAIL, NOTE_URL, READS_URL } from '../data/site';

/**
 * お問い合わせ。
 *
 * 以前はフッターに置いていたが、全ページの末尾で大きく主張してしまい、
 * 静かな紙面から浮いていた。独立した章に移す。
 */
const Contact: React.FC = () => (
  <>
    <section className="w-full bg-paper font-jp px-6 md:px-12 pt-24 pb-24 min-h-[70vh]">
      <SectionHeader
        id="contact"
        index="04"
        label="Contact"
        note="ご相談やお仕事のご依頼は、どうぞお気軽にメールにてご連絡ください。"
      >
        おといあわせ
      </SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-14">
        <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">Mail</div>
        <div className="lg:col-span-10">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rule-underline font-display text-[19px] sm:text-[24px] text-ink tracking-[0.02em]"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-16">
        <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">Elsewhere</div>
        <div className="lg:col-span-10 flex flex-col gap-2 items-start">
          <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
            note <span className="text-[9px] align-super">↗</span>
          </a>
          <a href={READS_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
            reads(@izuha) <span className="text-[9px] align-super">↗</span>
          </a>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default Contact;
