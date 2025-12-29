import React from 'react';

const Profile = ({ scrollIconRef }) => (
  <section className="relative max-w-5xl mx-auto px-4 sm:px-8 py-24 bg-white font-jp text-base md:text-lg leading-7">
    <h1 id="profile" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-jp text-matte tracking-wider mb-6 mt-0">
      わたし
    </h1>
    <div className="flex flex-col items-center">
      <div style={{ height: '1rem' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
        <img
          className="w-full max-w-md h-auto object-cover rounded"
          src="https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6"
          alt="main-img"
          style={{
            filter: 'blur(8px) brightness(0.95) contrast(1.05)',
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)',
            display: 'block',
            transition: 'none',
            pointerEvents: 'auto',
            userSelect: 'none',
            cursor: 'pointer',
          }}
          draggable={false}
        />
      </div>
      <div style={{ height: '2rem' }} />
    </div>
    <p className="text-xs md:text-sm">
      <strong>名前は、いずみはるや（Izumi Haruya）です。</strong><br/>
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
    <div className="mt-3">
      <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl mr-4">
        note <span className="text-xs">↗</span>
      </a>
      <a href="https://reads.jp/u/izuha" target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl">
        reads(@izuha) <span className="text-xs">↗︎</span>
      </a>
    </div>
    {/* スクロールインジケーターにrefを渡す */}
    <div className="scroll_down" ref={scrollIconRef} style={{ position: 'static', marginTop: 32 }}>
      <span className="mouse-modern">
        <span className="mouse-dot" />
      </span>
      <style>{`
        .scroll_down {
          text-align: center;
        }
        .mouse-modern {
          display: inline-block;
          width: 28px;
          height: 44px;
          border: 2px solid #222;
          border-radius: 16px;
          position: relative;
          box-sizing: border-box;
        }
        .mouse-dot {
          position: absolute;
          left: 50%;
          top: 12px;
          width: 6px;
          height: 6px;
          margin-left: -3px;
          background: #222;
          border-radius: 50%;
          animation: mouse-dot-move 1.6s cubic-bezier(.4,2,.3,1) infinite;
        }
        @keyframes mouse-dot-move {
          0% { opacity: 0; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(8px);}
          60% { opacity: 1; transform: translateY(16px);}
          100% { opacity: 0; transform: translateY(24px);}
        }
      `}</style>
    </div>
  </section>
);

export default Profile;
