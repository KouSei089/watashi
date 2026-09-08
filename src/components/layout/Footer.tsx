import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_PATH } from '../../data/sections';

/**
 * フッター。
 *
 * 以前は仕事の依頼文とメールアドレスを大きく置いていたが、
 * 全ページの末尾で主張しすぎて紙面から浮いていた。
 * 依頼は Contact の章に移し、ここは奥付だけにする。
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-paper text-ink font-jp border-t border-ink/10">
      <div className="px-6 md:px-12 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="marginalia">© {currentYear} watashi — izumi haruya</span>
        <Link to={CONTACT_PATH} className="marginalia hover:!text-ink transition-colors no-underline">
          Contact →
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
