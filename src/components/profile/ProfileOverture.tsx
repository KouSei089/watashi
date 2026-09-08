import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import { profile, likes } from '../../data/profile';
import { NOTE_URL, READS_URL } from '../../data/site';
import { useScrollTo } from '../../lib/lenis';

/**
 * 案B｜静かな開幕。
 *
 * 最初の 1 画面は名前とテーマの一行だけ。スクロールで本文が現れる。
 * 削除した導入画面の「間」は良かったが、ぼかした写真という見せ方が
 * 失敗していた、という捉え方。余白そのものを第一印象にする。
 */
const ProfileOverture: React.FC = () => {
  const scrollTo = useScrollTo();

  return (
    <section className="w-full bg-white font-jp">
      {/* 開幕 */}
      <div className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl text-matte tracking-[0.06em] leading-[1.25] m-0">
            {profile.nameJa}
          </h1>
          <p className="mt-6 text-[11px] sm:text-xs text-gray-400 tracking-[0.45em] uppercase">
            {profile.nameEn}
          </p>
          <p className="mt-16 text-[13px] sm:text-base text-gray-500 tracking-[0.12em]">
            {profile.theme}
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollTo('#profile')}
          className="mt-24 self-start flex items-center gap-3 bg-transparent border-0 p-0 text-gray-400 hover:text-black transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          aria-label="本文へ進む"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <span className="block w-12 h-px bg-current opacity-40" />
        </motion.button>
      </div>

      {/* 本文 */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-16 pb-24">
        <Reveal>
          <motion.div variants={revealItem}>
            <SectionTitle id="profile" className="mb-14">わたし</SectionTitle>
          </motion.div>

          <motion.div
            className="max-w-2xl text-[15px] sm:text-[17px] text-gray-700 leading-[2.1] tracking-[0.02em]"
            variants={revealItem}
          >
            <p className="text-black mb-8">{profile.lead}</p>
            <p className="mb-6">{profile.bio}</p>
            <p>{profile.themeLine}</p>
          </motion.div>
        </Reveal>

        <div className="mt-24 mb-14 max-w-2xl">
          <Reveal>
            <motion.p className="text-[13px] sm:text-sm text-gray-400 tracking-[0.15em]" variants={revealItem}>
              {profile.likesIntro}
            </motion.p>
          </Reveal>
        </div>

        <ul className="list-none m-0 p-0 max-w-2xl">
          {likes.map((like) => (
            <li key={like.lead} className="mb-16 sm:mb-20 last:mb-0">
              <Reveal>
                <motion.div variants={revealItem}>
                  <p className="text-[18px] sm:text-[21px] text-black leading-[1.7] tracking-[0.04em] mb-3">
                    {like.lead}
                  </p>
                  <p className="text-[14px] sm:text-[16px] text-gray-500 leading-[2] tracking-[0.02em]">
                    {like.detail}
                  </p>
                </motion.div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <motion.div className="mt-28 flex gap-8" variants={revealItem}>
            <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="wavy-underline text-lg">
              note <span className="text-[10px] align-super">↗</span>
            </a>
            <a href={READS_URL} target="_blank" rel="noopener noreferrer" className="wavy-underline text-lg">
              reads(@izuha) <span className="text-[10px] align-super">↗︎</span>
            </a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProfileOverture;
