import React from 'react';
import PageBackground from '../components/common/PageBackground';
import { palettes } from '../data/palettes';
import Profile from '../components/profile/Profile';
import Footer from '../components/layout/Footer';

const About: React.FC = () => (
  <>
    <PageBackground palette={palettes.about} />
    <div className="relative z-10">
      <Profile />
      <Footer />
    </div>
  </>
);

export default About;
