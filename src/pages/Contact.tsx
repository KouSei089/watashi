import React from 'react';
import PageBackground from '../components/common/PageBackground';
import { palettes } from '../data/palettes';
import SectionHeader from '../components/common/SectionHeader';
import Footer from '../components/layout/Footer';
import { CONTACT_EMAIL, NOTE_URL, READS_URL } from '../data/site';

/**
 * おといあわせ。
 *
 * 以前はフッターに置いていたが、全ページの末尾で大きく主張してしまい、
 * 静かな紙面から浮いていた。独立した章に移してある。
 * 組みは表紙にそろえた。大きな見出し、余白のラベル、そして所在の標記。
 */
const Contact: React.FC = () => (
  <>
    <PageBackground palette={palettes.contact} />
    <div className="relative z-10">
      <section className="w-full font-jp px-6 pt-24 pb-24 min-h-[80vh] flex flex-col justify-between">
        <div>
          <SectionHeader
            id="contact"
            index="04"
            label="Contact"
            note="ご相談やお仕事のご依頼は、どうぞお気軽にメールにてご連絡ください。"
          >
            おといあわせ
          </SectionHeader>

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-20">
            <div className="lg:col-span-2 marginalia mb-3 lg:mb-0">Mail</div>
            <div className="lg:col-span-10">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rule-underline font-display text-[22px] sm:text-[32px] text-ink tracking-[0.01em]"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-16">
            <div className="lg:col-span-2 marginalia mb-3 lg:mb-0">Elsewhere</div>
            <div className="lg:col-span-10 flex flex-col gap-2 items-start">
              <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
                note <span className="text-[9px] align-super">↗</span>
              </a>
              <a href={READS_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
                reads(@izuha) <span className="text-[9px] align-super">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* 所在。表紙が右端に立てる標記と同じ種類の情報 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-24 pt-6 border-t border-ink/22">
          <div className="lg:col-span-2 marginalia mb-3 lg:mb-0">Location</div>
          <div className="lg:col-span-10 flex flex-wrap gap-x-10 gap-y-2">
            <span className="font-display text-[16px] sm:text-[19px] text-ink">島根県隠岐郡海士町</span>
            <span className="marginalia self-center">Ama-cho, Oki Islands</span>
            <span className="marginalia self-center">36.09° N — 133.09° E</span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </>
);

export default Contact;
