import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ProfileProps {
  scrollIconRef: React.RefObject<HTMLDivElement | null>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Profile: React.FC<ProfileProps> = ({ scrollIconRef }) => (
  <motion.section 
    className="relative max-w-5xl mx-auto px-6 sm:px-8 py-24 bg-white font-jp flex flex-col items-center text-center sm:text-left sm:items-start"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    variants={containerVariants}
  >
    <motion.h1 
      id="profile" 
      className="w-full text-4xl sm:text-5xl md:text-7xl font-jp text-matte tracking-wider mb-10 mt-0"
      variants={itemVariants}
    >
      わたし
    </motion.h1>
    
    <motion.div className="flex flex-col items-center w-full" variants={itemVariants}>
      <div className="relative w-full max-w-[400px]">
        <img
          className="w-full h-auto object-cover rounded shadow-sm cursor-pointer select-none"
          src="https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6"
          alt="main-img"
          style={{ filter: 'blur(8px) brightness(0.95) contrast(1.05)' }}
          draggable={false}
        />
      </div>
      <div className="h-12" />
    </motion.div>

    <motion.p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed tracking-wider max-w-2xl mx-auto sm:mx-0" variants={itemVariants}>
      <strong className="block mb-4 text-black text-sm sm:text-base">名前は、いずみはるや（Izumi Haruya）です。</strong>
      アパレル業界を経てエンジニアとしての経験を積み、現在は島根県隠岐諸島・海士町にあるホテルEntôで働いています。<br className="hidden sm:block"/>
      テーマとしては「逸脱しながら主目的を達成する」ことを掲げています。<br/><br/>
      ここからは、すきなものを並べてみます。<br/>
      まくらがすきです。まくらふたつで眠ります。<br/>
      本がすきです。詩やエッセイ、デザイン、哲学、そしてときどき臨床医学まで読みます。<br/>
      音がすきです。坂本龍一、haruka nakamura、ずっと真夜中でいいのに。、そして環境音をよく聴きます。<br/>
      シャッターを押すのがすきです。ひかりとかげ、忘れられたもの、個人的すぎるものを撮りたくなります。<br/>
      映画もすきです。ノーラン、フィンチャー、奥山由之の作品がすきです。<br/>
      移動もすきです。電車から自転車まで。飛行機は緊張するけれど、それもふくめてわくわくします。
    </motion.p>

    <motion.div className="mt-10 flex gap-6 justify-center sm:justify-start w-full" variants={itemVariants}>
      <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl">
        note <span className="text-[10px] align-super">↗</span>
      </a>
      <a href="https://reads.jp/u/izuha" target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl">
        reads(@izuha) <span className="text-[10px] align-super">↗︎</span>
      </a>
    </motion.div>

    <motion.div className="text-center mt-16 w-full" ref={scrollIconRef as React.RefObject<HTMLDivElement>} variants={itemVariants}>
      <div className="inline-block w-7 h-11 border-2 border-gray-900 rounded-2xl relative box-border">
        <div className="absolute left-1/2 -ml-[3px] top-3 w-1.5 h-1.5 bg-gray-900 rounded-full animate-mouse-move" />
      </div>
    </motion.div>

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
  </motion.section>
);

export default Profile;