import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { profile, likes } from '../../data/profile';
import { NOTE_URL, READS_URL, PROFILE_PHOTOS } from '../../data/site';

/**
 * 「わたし」の節。
 *
 * 写真は画面の端まで使う。max-w のコンテナに収めると
 * 「ページに貼られた画像」に見えてしまい、写真が主役にならない。
 * 切り取りもしない（3:2 のまま）。撮られた構図をそのまま出す。
 *
 * 写真は src/data/site.ts の PROFILE_PHOTOS に足すだけでよい。
 * 1 枚目が主題として全幅、2 枚目以降は 2 カラム。
 */
const Profile: React.FC = () => {
  const [lead, ...rest] = PROFILE_PHOTOS;

  return (
    <section className="w-full bg-paper font-jp">
      {lead && (
        <motion.figure
          className="m-0 w-full pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={lead.src}
            alt={lead.alt}
            className="w-full aspect-[3/2] object-cover select-none"
            draggable={false}
          />
        </motion.figure>
      )}

      <div className="px-6 md:px-12 pt-20 pb-16">
        <Reveal>
          <motion.div variants={revealItem}>
            <SectionHeader id="profile" index="01" label="About">
              わたし
            </SectionHeader>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-12" variants={revealItem}>
            <div className="lg:col-span-2" />
            <p className="lg:col-span-7 max-w-2xl text-[13px] sm:text-[14px] text-ink/70 leading-[2.05] tracking-[0.02em] m-0">
              <strong className="block mb-5 text-ink text-[14px] sm:text-[15px] font-medium">
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
            </p>

            <div className="lg:col-span-3 mt-10 lg:mt-0 flex flex-col gap-2 items-start">
              <span className="marginalia mb-1">Links</span>
              <a href={NOTE_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
                note <span className="text-[9px] align-super">↗</span>
              </a>
              <a href={READS_URL} target="_blank" rel="noopener noreferrer" className="rule-underline text-[13px] text-ink">
                reads(@izuha) <span className="text-[9px] align-super">↗</span>
              </a>
            </div>
          </motion.div>
        </Reveal>
      </div>

      {/* 残りの写真も端まで。無ければ何も出ない */}
      {rest.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/10">
          {rest.map((photo, i) => (
            <Reveal key={photo.src}>
              <motion.figure
                className={`m-0 bg-paper ${rest.length % 2 === 1 && i === rest.length - 1 ? 'sm:col-span-2' : ''}`}
                variants={revealItem}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full aspect-[3/2] object-cover select-none"
                  draggable={false}
                  loading="lazy"
                />
              </motion.figure>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
