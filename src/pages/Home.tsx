import React from 'react';
import Hero from '../components/sections/Hero';
import Profile from '../components/features/Profile';
import Timeline from '../components/sections/Timeline';
import EyecatchGrid from '../components/features/EyecatchGrid';
import Footer from '../components/layout/Footer';

/**
 * サイト本体。
 *
 * 以前は Top（fixed で固定・スクロール不可）と About がページ遷移で
 * 分かれており、そのたびに Lenis の慣性が切れていた。
 * 導入からフッターまでを 1 本のスクロールにまとめたことで、
 * ページ遷移アニメーションもハッシュ用の 404 回避も不要になった。
 */
const Home: React.FC = () => (
  // overflow-x-hidden はここに置かない。overflow-x を指定すると overflow-y が
  // auto になってこの div 自体がスクロールコンテナになり、useScroll の進捗が
  // 常に 0 のまま（＝スクロール連動の演出が一切効かない）になる。
  // 横のはみ出しは body 側で止めている。
  <div className="bg-white w-full font-jp">
    <Hero />
    <Profile />
    <Timeline />
    <EyecatchGrid />
    <Footer />
  </div>
);

export default Home;
