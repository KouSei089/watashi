import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import { profile, likes } from '../../data/profile';
import { NOTE_URL, READS_URL, PROFILE_PHOTOS } from '../../data/site';

/**
 * 「わたし」の節。
 *
 * 写真は主役から降ろし、本文のあとに横一列で小さく添える。
 * 冒頭を占めていた大きな 1 枚と、全幅の 2 カラムはやめた。
 * 枚数は PROFILE_PHOTOS の長さに追随する。
 */
const Profile: React.FC = () => (
  <section className="w-full bg-paper font-jp px-6 md:px-12 pt-24 pb-20">
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

    {PROFILE_PHOTOS.length > 0 && (
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-24">
        <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">
          {PROFILE_PHOTOS.length} Photographs
        </div>
        <div className="lg:col-span-10">
          <Reveal>
            <motion.div
              className="grid gap-3 sm:gap-4"
              style={{ gridTemplateColumns: `repeat(${Math.min(PROFILE_PHOTOS.length, 3)}, minmax(0, 1fr))` }}
              variants={revealItem}
            >
              {PROFILE_PHOTOS.map((photo) => (
                <figure key={photo.src} className="m-0">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full aspect-[3/2] object-cover select-none"
                    draggable={false}
                    loading="lazy"
                  />
                </figure>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </div>
    )}
  </section>
);

export default Profile;
