import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import { profile, likes } from '../../data/profile';
import { NOTE_URL, READS_URL } from '../../data/site';

/**
 * 案A｜読み物として組み直す。
 *
 * 写真を主役から外し、文章を主役にする。
 * 本文は 11px から 15/17px へ。「すきなもの」は <br> 区切りの
 * 一段落に潰れていたので、1 行ずつ独立した塊にして、
 * スクロールに合わせて一つずつ現れるようにした。
 */
const ProfileReading: React.FC = () => (
  <section className="w-full bg-white font-jp">
    <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 pb-24">
      <Reveal>
        <motion.div variants={revealItem}>
          <SectionTitle id="profile" className="mb-16">わたし</SectionTitle>
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

      <div className="mt-28 mb-16 max-w-2xl">
        <Reveal>
          <motion.p
            className="text-[13px] sm:text-sm text-gray-400 tracking-[0.15em]"
            variants={revealItem}
          >
            {profile.likesIntro}
          </motion.p>
        </Reveal>
      </div>

      {/* 一行ずつ、読み進めるのに合わせて現れる */}
      <ul className="list-none m-0 p-0 max-w-2xl">
        {likes.map((like) => (
          <li key={like.lead} className="mb-20 sm:mb-24 last:mb-0">
            <Reveal>
              <motion.div variants={revealItem}>
                <p className="text-[19px] sm:text-[23px] text-black leading-[1.7] tracking-[0.04em] mb-3">
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
        <motion.div className="mt-32 flex gap-8" variants={revealItem}>
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

export default ProfileReading;
