import React from 'react';
import PageBackground from '../components/common/PageBackground';
import { palettes } from '../data/palettes';
import Timeline from '../components/sections/Timeline';
import Footer from '../components/layout/Footer';

const History: React.FC = () => (
  <>
    <PageBackground palette={palettes.history} />
    <div className="relative z-10">
      <Timeline />
      <Footer />
    </div>
  </>
);

export default History;
