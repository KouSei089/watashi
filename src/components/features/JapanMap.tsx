import React, { useEffect, useRef, useCallback, useMemo } from "react";
import JapanSvg from '../../assets/svg/japanMap.svg';
import regionalDetail from '../../data/regional/regional_detail.json';
import * as d3 from "d3";
import { MapPin } from "../../types";

const JapanMap: React.FC = () => {
  const mapRef = useRef<SVGSVGElement | null>(null);
  
  // 座標の微調整: 日本全体がバランスよく収まる設定
  const projection = useMemo(() => 
    d3.geoMercator()
      .center([137.5, 38.5]) // 中心を少し北へ
      .scale(1800)           // 日本地図SVGに合わせたスケール
      .translate([500, 420]),
    []
  );

  useEffect(() => {
    if (!mapRef.current) return;

    const svg = d3.select(mapRef.current);
    svg.selectAll("*").remove();

    const pins = regionalDetail as MapPin[];
    const pinGroup = svg.append("g");

    const pinLinks = pinGroup
      .selectAll("a")
      .data(pins)
      .join("a")
      .attr("xlink:href", (d: MapPin) => d.url)
      .attr("target", "_blank")
      .on("mouseover", (event: MouseEvent, d: MapPin) => {
        const tooltip = d3.select("#map-tooltip");
        tooltip.style("opacity", 1)
               .html(`
                <div class="p-2 bg-white/95 backdrop-blur border border-gray-100 shadow-xl rounded text-[10px] font-jp">
                  <img src="${d.image}" class="w-24 h-16 object-cover mb-1.5 rounded-sm" />
                  <strong class="block text-gray-800">${d.area}</strong>
                  <span class="text-gray-400">${d.date}</span>
                </div>
               `)
               .style("left", `${event.pageX + 15}px`)
               .style("top", `${event.pageY - 10}px`);
      })
      .on("mouseout", () => {
        d3.select("#map-tooltip").style("opacity", 0);
      });

    // 1. タップ・クリック判定用の円（大きめにする）
    pinLinks.append("circle")
      .attr("cx", (d: MapPin) => projection([d.lon, d.lat])![0])
      .attr("cy", (d: MapPin) => projection([d.lon, d.lat])![1])
      .attr("r", 12)
      .attr("fill", "transparent")
      .attr("class", "cursor-pointer");

    // 2. 外側の波紋アニメーション（これで見つけやすくする）
    pinLinks.append("circle")
      .attr("cx", (d: MapPin) => projection([d.lon, d.lat])![0])
      .attr("cy", (d: MapPin) => projection([d.lon, d.lat])![1])
      .attr("r", 3)
      .attr("fill", "none")
      .attr("stroke", "#222")
      .attr("stroke-width", 0.5)
      .attr("class", "animate-ping-slow origin-center");

    // 3. メインのピン（二重円にして視認性を向上）
    const pinMarkers = pinLinks.append("g")
      .attr("class", "transition-transform duration-300 hover:scale-150 origin-center");

    // 外枠
    pinMarkers.append("circle")
      .attr("cx", (d: MapPin) => projection([d.lon, d.lat])![0])
      .attr("cy", (d: MapPin) => projection([d.lon, d.lat])![1])
      .attr("r", 4)
      .attr("fill", "white")
      .attr("stroke", "#222")
      .attr("stroke-width", 1);

    // 中心点
    pinMarkers.append("circle")
      .attr("cx", (d: MapPin) => projection([d.lon, d.lat])![0])
      .attr("cy", (d: MapPin) => projection([d.lon, d.lat])![1])
      .attr("r", 1.5)
      .attr("fill", "#222");

  }, [projection]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mt-16 md:mt-24">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">Travel Log</h3>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
      
      <div id="map-container" className="w-full h-[380px] sm:h-[500px] md:h-[650px] relative bg-gray-50/10 rounded-3xl overflow-hidden">
        <svg 
          ref={mapRef} 
          viewBox="0 0 1000 853" 
          className="w-full h-full relative z-10 p-2 md:p-10"
          style={{ 
            backgroundImage: `url(${JapanSvg})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(1.05) brightness(1.02)'
          }}
        />
        <div id="map-tooltip" className="fixed pointer-events-none opacity-0 z-[200] transition-opacity duration-300" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .origin-center {
          transform-box: fill-box;
          transform-origin: center;
        }
      `}} />
    </div>
  );
};

export default JapanMap;