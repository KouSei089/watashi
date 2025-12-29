import React, { RefObject } from 'react';

interface ProfileProps {
  scrollIconRef: RefObject<HTMLDivElement>;
}

const Profile: React.FC<ProfileProps> = ({ scrollIconRef }) => (
  <section className="relative max-w-5xl mx-auto px-4 sm:px-8 py-24 bg-white font-jp text-base md:text-lg leading-7">
    <h1 id="profile" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-jp text-matte tracking-wider mb-6 mt-0">
      わたし
    </h1>
    
    <div className="flex flex-col items-center">
      <div className="h-4" /> {/* spacing */}
      <div className="relative w-full max-w-[400px]">
        <img
          className="w-full h-auto object-cover rounded shadow-sm cursor-pointer select-none pointer-events-auto"
          src="https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6"
          alt="main-img"
          style={{
            filter: 'blur(8px) brightness(0.95) contrast(1.05)',
          }}
          draggable={false}
        />
      </div>
      <div className="h-8" /> {/* spacing */}
    </div>

    <p className="text-xs md:text-sm">
      <strong className="block mb-2">名前は、いずみはるや（Izumi Haruya）です。</strong>
      アパレル業界を経てエンジニアとしての経験を積み、現在は島根県隠岐諸島・海士町にあるホテルEntôで働いています。<br/>
      テーマとしては「逸脱しながら主目的を達成する」ことを掲げています。<br/>
      ここからは、すきなものを並べてみます。<br/>
      まくらがすきです。まくらふたつで眠ります。<br/>
      本がすきです。詩やエッセイ、デザイン、哲学、そしてときどき臨床医学まで読みます。<br/>
      音がすきです。坂本龍一、haruka nakamura、ずっと真夜中でいいのに。、そして環境音をよく聴きます。<br/>
      シャッターを押すのがすきです。ひかりとかげ、忘れられたもの、個人的すぎるものを撮りたくなります。<br/>
      映画もすきです。ノーラン、フィンチャー、奥山由之の作品がすきです。<br/>
      移動もすきです。電車から自転車まで。飛行機は緊張するけれど、それもふくめてわくわくします。
    </p>

    <div className="mt-3 flex gap-4">
      <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl">
        note <span className="text-[10px] align-super">↗</span>
      </a>
      <a href="https://reads.jp/u/izuha" target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl">
        reads(@izuha) <span className="text-[10px] align-super">↗︎</span>
      </a>
    </div>

    {/* スクロールインジケーター */}
    <div className="text-center mt-8" ref={scrollIconRef}>
      <div className="inline-block w-7 h-11 border-2 border-gray-900 rounded-2xl relative box-border">
        <div className="absolute left-1/2 -ml-[3px] top-3 w-1.5 h-1.5 bg-gray-900 rounded-full animate-mouse-move" />
      </div>
    </div>

    {/* アニメーション用のCSS */}
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes mouse-move {
        0% { opacity: 0; transform: translateY(0); }
        30% { opacity: 1; transform: translateY(8px);}
        60% { opacity: 1; transform: translateY(16px);}
        100% { opacity: 0; transform: translateY(24px);}
      }
      .animate-mouse-move {
        animation: mouse-move 1.6s cubic-bezier(.4,2,.3,1) infinite;
      }
    `}} />
  </section>
);

export default Profile;