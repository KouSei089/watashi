import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import { profile, likes } from '../../data/profile';
import { NOTE_URL, READS_URL, PROFILE_PHOTOS } from '../../data/site';

/**
 * 「わたし」の節。
 *
 * 写真を主役にする。以前はぼかした 1 枚を小さく置いていたが、
 * 白い画面に何も無いようにしか見えなかった。ぼかしをやめ、大きく見せる。
 *
 * 写真は src/data/site.ts の PROFILE_PHOTOS に足すだけでよく、
 * 1 枚でも複数枚でも成立する。奇数枚のときは最後の 1 枚が横幅いっぱいになる。
 *
 * 文章は地の文のまま。「すきなもの」を一行ずつ大きく見せる案も試したが、
 * 強調せず続けて読ませる元のかたちに戻した。
 */
const Profile: React.FC = () => {
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

      <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-20 pb-16">
        <Reveal>
          <motion.div variants={revealItem}>
            <SectionTitle id="profile" className="mb-14">わたし</SectionTitle>
          </motion.div>

          <motion.p
            className="max-w-2xl text-[14px] sm:text-[16px] text-gray-600 leading-[2.1] tracking-[0.02em]"
            variants={revealItem}
          >
            <strong className="block mb-5 text-black text-[15px] sm:text-[17px] font-medium">
              {profile.lead}
            </strong>
            {profile.bio}
            <br className="hidden sm:block" />
            {profile.themeLine}
            <br />
            <br />
            {profile.likesIntro}
            <br />
            {likes.map((like) => (
              <React.Fragment key={like}>
                {like}
                <br />
              </React.Fragment>
            ))}
          </motion.p>
        </Reveal>
      </div>

      {/* 残りの写真。無ければ何も出ない */}
      {rest.length > 0 && (
        <div className="max-w-6xl mx-auto px-0 sm:px-8 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
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
        <Reveal>
          <motion.div className="flex gap-8" variants={revealItem}>
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

export default Profile;
