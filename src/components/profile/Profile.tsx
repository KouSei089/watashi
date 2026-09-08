import React from 'react';
import { motion } from 'framer-motion';
import Reveal, { revealItem } from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import TickRule from '../common/TickRule';
import { profile, likes, likeSubjects } from '../../data/profile';
import { NOTE_URL, READS_URL, PROFILE_PHOTOS } from '../../data/site';

/**
 * 「わたし」の節。
 *
 * 表紙と同じ組みにそろえている。大きな見出し、余白のラベル、
 * そして値を実際の位置に打った目盛り。表紙が年を並べるのに対し、
 * ここは「すきなもの」を並べる。同じ語彙で別のことを示す。
 */
const Profile: React.FC = () => {
  // 6 つを等間隔に打つ。端に寄りすぎないよう内側に収める。
  const fractions = likeSubjects.map((_, i) => 0.06 + (i / (likeSubjects.length - 1)) * 0.88);

  return (
    <section className="w-full font-jp px-6 pt-24 pb-20">
      <Reveal>
        <motion.div variants={revealItem}>
          <SectionHeader id="profile" index="01" label="About">
            わたし
          </SectionHeader>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-16" variants={revealItem}>
          <div className="lg:col-span-2" />
          <p className="lg:col-span-7 max-w-2xl text-[13px] sm:text-[14px] text-ink/70 leading-[1.75] tracking-[0.02em] m-0">
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

      {/* すきなものの目盛り。表紙の年の目盛りと同じ語彙 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-24">
        <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">
          {likeSubjects.length} Affections
        </div>
        <div className="lg:col-span-10">
          <Reveal>
            <motion.div variants={revealItem}>
              <TickRule
                fractions={fractions}
                labels={likeSubjects}
                title={`すきなもの ${likeSubjects.length} つ`}
              />
            </motion.div>
          </Reveal>
        </div>
      </div>

      {PROFILE_PHOTOS.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10 mt-24">
          <div className="lg:col-span-2 marginalia mb-4 lg:mb-0">
            {PROFILE_PHOTOS.length} Photographs
          </div>
          <div className="lg:col-span-10">
            <Reveal>
              <motion.div
                className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
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
};

export default Profile;
