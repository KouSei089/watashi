import React from 'react';
import { motion } from 'framer-motion';
import JapanMap from '../components/features/JapanMap';
import Footer from '../components/layout/Footer';
import SectionTitle from '../components/common/SectionTitle';

const Travel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="pt-24 min-h-screen bg-white font-jp"
  >
    <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-10">
      <SectionTitle className="mb-6">旅の記録</SectionTitle>
      <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
        訪れた場所、そこで見た景色。日本地図の上に、記憶の断片を置いています。
      </p>
    </div>
    <JapanMap />
    <Footer />
  </motion.div>
);

export default Travel;
