import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-gray-600 py-16 mt-24 font-jp border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 flex flex-col">
        {/* JOB OFFER */}
        <div className="w-full flex flex-col items-start mb-8">
          <div className="text-base sm:text-lg text-gray-600 mb-3 leading-relaxed font-jp">
            ご相談やお仕事のご依頼は、どうぞお気軽にメールにてご連絡ください。
          </div>
          <a
            href="mailto:izumiharuya12@gmail.com"
            className="mt-1 text-base sm:text-lg text-black wavy-underline tracking-[0.08em]"
          >
            izumiharuya12@gmail.com
            <span className="text-[10px] align-super ml-1 opacity-70">↗︎</span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 my-8"></div>

        {/* Copyright - 中央寄せ */}
        <div className="text-xs text-gray-400 text-center font-jp leading-loose">
          &copy; {currentYear} watashi - izumi haruya. All rights reserved.
          <br />
          <div className="inline-flex items-center justify-center gap-1.5 mt-2 text-slate-400">
            <span>Designed &amp; built with</span>
            <span 
              className="inline-flex items-center justify-center" 
              aria-label="sparkle" 
              role="img"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="stroke-current">
                <g>
                  <path d="M10 2.5V5.5" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M10 14.5V17.5" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M2.5 10H5.5" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M14.5 10H17.5" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="10" cy="10" r="3.5" strokeWidth="1.2"/>
                </g>
              </svg>
            </span>
            <span>in Japan.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;