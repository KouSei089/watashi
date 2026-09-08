import React from 'react';
import { Link } from 'react-router-dom';
import { sections, CONTACT_PATH, HOME_PATH } from '../../data/sections';
import { profile } from '../../data/profile';

/**
 * 奥付。
 *
 * 以前は著作権表示の 1 行だけで、どのページも唐突に終わっていた。
 * 表紙の目次と同じ組みをここにも置き、名前を大きく据えて締める。
 * どのページの末尾からでも、他の章へ移れる。
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full text-ink font-jp border-t border-ink/10 mt-24">
      <div className="px-6 pt-14 pb-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 gap-y-12">
        <div className="lg:col-span-2 marginalia">Colophon</div>

        <div className="lg:col-span-4">
          <Link to={HOME_PATH} className="no-underline block">
            <span className="font-display block text-[30px] sm:text-[40px] leading-[1.15] tracking-[0.01em] text-ink">
              {profile.nameJa}
            </span>
            <span className="marginalia block mt-3">{profile.nameEn}</span>
          </Link>
          <span className="marginalia block mt-6">島根県隠岐郡海士町</span>
        </div>

        {/* 表紙の目次と同じ並び */}
        <nav className="lg:col-span-6" aria-label="目次">
          <ul className="list-none m-0 p-0 border-t border-ink/15">
            {[...sections, { index: '04', path: CONTACT_PATH, label: 'Contact', name: 'おといあわせ' }].map((s) => (
              <li key={s.path} className="border-b border-ink/15">
                <Link to={s.path} className="group flex items-baseline gap-4 py-3 no-underline">
                  <span className="marginalia w-8 shrink-0">({s.index})</span>
                  <span className="marginalia w-20 shrink-0 hidden sm:block">{s.label}</span>
                  <span className="font-display text-[15px] sm:text-[17px] text-ink flex-1 group-hover:opacity-60 transition-opacity duration-300">
                    {s.name}
                  </span>
                  <span className="marginalia transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="px-6 py-4 border-t border-ink/10">
        <span className="marginalia">© {currentYear} watashi — izumi haruya</span>
      </div>
    </footer>
  );
};

export default Footer;
