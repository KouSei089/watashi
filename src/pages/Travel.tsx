import React from 'react';
import { motion } from 'framer-motion';
import JapanMap from '../components/features/JapanMap';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/common/SectionHeader';

const Travel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="pt-24 min-h-screen bg-paper font-jp"
  >
    <div className="px-6 mb-12">
      <SectionHeader
        id="travel"
        index="04"
        label="Travel"
        note="訪れた場所、そこで見た景色。日本地図の上に、記憶の断片を置いています。"
      >
        旅の記録
      </SectionHeader>
    </div>
    <JapanMap />
    <Footer />
  </motion.div>
);

export default Travel;
