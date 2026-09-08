import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PROFILE_VARIANTS, useProfileVariant } from '../profile';

/**
 * 「わたし」の案を見比べるための切替。開発時にだけ出る。
 * 案が決まったら、この仕組みごと削除する。
 */
const VariantSwitcher: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const current = useProfileVariant();

  if (process.env.NODE_ENV !== 'development') return null;

  const select = (key: string) => {
    const params = new URLSearchParams(location.search);
    params.set('v', key);
    // pathname と hash は変えない。変えると App 側がスクロール位置を戻してしまう。
    history.replace({ pathname: location.pathname, hash: location.hash, search: params.toString() });
  };

  return (
    <div className="fixed bottom-4 left-4 z-[120] flex items-center gap-1 rounded-full bg-white/85 backdrop-blur-md border border-gray-200 px-1.5 py-1 shadow-sm font-jp">
      <span className="text-[9px] text-gray-400 tracking-[0.15em] px-2">わたし</span>
      {PROFILE_VARIANTS.map((variant) => (
        <button
          key={variant.key}
          type="button"
          onClick={() => select(variant.key)}
          className={`text-[10px] tracking-[0.1em] rounded-full px-2.5 py-1 transition-colors duration-300 border-0 ${
            current === variant.key ? 'bg-black text-white' : 'bg-transparent text-gray-500 hover:text-black'
          }`}
        >
          {variant.key.toUpperCase()} {variant.label}
        </button>
      ))}
    </div>
  );
};

export default VariantSwitcher;
