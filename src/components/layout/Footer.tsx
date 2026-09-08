import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_PATH, HOME_PATH } from '../../data/sections';
import { profile } from '../../data/profile';

/**
 * 奥付。
 *
 * 以前は著作権表示の 1 行だけで、どのページも唐突に終わっていた。
 * 参考サイトが末尾に大きな社名を置いているのに倣い、
 * 名前を大きく据えて締める。
 *
 * 仕事の依頼文とメールアドレスは Contact の章に移してある。
 * 全ページの末尾で主張しすぎて紙面から浮いていた。
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full text-ink font-jp border-t border-ink/10 mt-24">
      <div className="px-6 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 gap-y-10">
        <div className="lg:col-span-2 marginalia">Colophon</div>

        <div className="lg:col-span-7">
          <Link to={HOME_PATH} className="no-underline">
            <span className="font-display block text-[30px] sm:text-[42px] leading-[1.15] tracking-[0.01em] text-ink">
              {profile.nameJa}
            </span>
            <span className="marginalia block mt-3">{profile.nameEn}</span>
          </Link>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-2 items-start">
          <Link to={CONTACT_PATH} className="rule-underline text-[13px] text-ink">
            おといあわせ
          </Link>
          <span className="marginalia">Ama-cho, Oki Islands</span>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-ink/10">
        <span className="marginalia">© {currentYear} watashi — izumi haruya</span>
      </div>
    </footer>
  );
};

export default Footer;
