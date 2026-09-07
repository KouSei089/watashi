import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import { MAIN_VISUAL_URL, NOTE_URL, READS_URL } from '../../data/site';

interface ProfileProps {
  scrollIconRef?: React.RefObject<HTMLDivElement | null>;
}

const Profile: React.FC<ProfileProps> = ({ scrollIconRef }) => (
  <Reveal
    as="section"
    className="relative max-w-5xl mx-auto px-6 sm:px-8 py-24 bg-white font-jp flex flex-col items-center text-center sm:text-left sm:items-start"
  >
    <motion.div className="w-full mb-10" variants={revealItem}>
      <SectionTitle id="profile">わたし</SectionTitle>
    </motion.div>

    <motion.div className="flex flex-col items-center w-full" variants={revealItem}>
      <div className="relative w-full max-w-[400px]">
        <img
          className="w-full h-auto object-cover rounded shadow-sm select-none blur-[6px] brightness-95 contrast-105 will-change-[filter]"
          src={MAIN_VISUAL_URL}
          alt="main-img"
          draggable={false}
        />
      </div>
      <div className="h-12" />
    </motion.div>

    <motion.p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed tracking-wider max-w-2xl mx-auto sm:mx-0" variants={revealItem}>
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

    <motion.div className="mt-10 flex gap-6 justify-center sm:justify-start w-full" variants={revealItem}>
      <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl">
        note <span className="text-[10px] align-super">↗</span>
      </a>
      <a href={READS_URL} target="_blank" rel="noopener noreferrer" className="wavy-underline text-xl">
        reads(@izuha) <span className="text-[10px] align-super">↗︎</span>
      </a>
    </motion.div>

    <motion.div
      className="text-center mt-16 w-full"
      ref={scrollIconRef as React.RefObject<HTMLDivElement>}
      variants={revealItem}
    >
      <div className="inline-block w-7 h-11 border-2 border-gray-900 rounded-2xl relative box-border">
        <div className="absolute left-1/2 -ml-[3px] top-3 w-1.5 h-1.5 bg-gray-900 rounded-full animate-mouse-move" />
      </div>
    </motion.div>
  </Reveal>
);

export default Profile;
