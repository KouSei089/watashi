import React from 'react';
import JapanMap from '../components/features/JapanMap';

const Travel: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-white font-jp">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-matte tracking-wider mb-6">
          旅の記録
        </h2>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
          訪れた場所、そこで見た景色。日本地図の上に、記憶の断片を置いています。
        </p>
      </div>
      <JapanMap />
    </div>
  );
};

export default Travel;