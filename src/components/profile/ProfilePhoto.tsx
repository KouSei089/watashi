import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import { profile, likes } from '../../data/profile';
import { NOTE_URL, READS_URL, PROFILE_PHOTOS } from '../../data/site';

/**
 * 案C｜写真を主役にする。
 *
 * ぼかしをやめ、写真をはっきり大きく見せる。
 * 「シャッターを押すのがすきです」と書いている人のサイトとして筋が通る。
 * 写真は PROFILE_PHOTOS に足すだけで、1 枚でも複数枚でも成立する組み。
 */
const ProfilePhoto: React.FC = () => {
  const [lead, ...rest] = PROFILE_PHOTOS;

  return (
    <section className="w-full bg-white font-jp">
      {/* 主題の1枚 */}
      {lead && (
        <motion.figure
          className="m-0 w-full max-w-6xl mx-auto px-0 sm:px-8 pt-24"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={lead.src}
            alt={lead.alt}
            className="w-full h-[52vh] sm:h-[68vh] object-cover select-none"
            draggable={false}
          />
        </motion.figure>
      )}

      <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-20 pb-24">
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
      </div>

      {/* 残りの写真。無ければ何も出ない */}
      {rest.length > 0 && (
        <div className="max-w-6xl mx-auto px-0 sm:px-8 mb-24 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          {rest.map((photo, i) => (
            <Reveal key={photo.src}>
              <motion.figure
                className={`m-0 ${rest.length % 2 === 1 && i === rest.length - 1 ? 'sm:col-span-2' : ''}`}
                variants={revealItem}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-[38vh] sm:h-[46vh] object-cover select-none"
                  draggable={false}
                  loading="lazy"
                />
              </motion.figure>
            </Reveal>
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-24">
        <div className="mb-14 max-w-2xl">
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

export default ProfilePhoto;
