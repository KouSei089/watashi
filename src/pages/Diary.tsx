import React from 'react';
import PageBackground from '../components/common/PageBackground';
import { palettes } from '../data/palettes';
import DiaryIndex from '../components/features/DiaryIndex';
import Footer from '../components/layout/Footer';

const Diary: React.FC = () => (
  <>
    <PageBackground palette={palettes.diary} />
    <div className="relative z-10">
      <DiaryIndex />
      <Footer />
    </div>
  </>
);

export default Diary;
