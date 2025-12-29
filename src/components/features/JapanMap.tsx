import React, { useEffect, useRef, useCallback, useMemo } from "react";
import JapanSvg from '../../assets/svg/japanMap.svg';
import regionalDetail from '../../data/regional/regional_detail.json';
import * as d3 from "d3";
import { MapPin } from "../../types";

const JapanMap: React.FC = () => {
  const mapRef = useRef<SVGSVGElement | null>(null);
  
  const projection = useMemo(() => 
    d3.geoMercator()
      .center([138.433, 35.5])
      .scale(1830)
      .translate([500, 426.5]),
    []
  );

  const createPinPath = useCallback((pin: MapPin) => {
    const coords = projection([pin.lon, pin.lat]);
    if (!coords) return "";
    const [x, y] = coords;
    return `
      M ${x}, ${y}
      L ${x}, ${y - 20}
      A 4 4 0 1 1 ${x - 0.1}, ${y - 20}
    `;
  }, [projection]);

  useEffect(() => {
    if (!mapRef.current) return;

    const svg = d3.select(mapRef.current);
    svg.selectAll("*").remove();

    const pins = regionalDetail as MapPin[];
    const pinGroup = svg.append("g");

    const link = pinGroup
      .selectAll("a")
      .data(pins)
      .join("a")
      .attr("xlink:href", (d: MapPin) => d.url)
      .attr("target", "_blank")
      .on("mouseover", (event: MouseEvent, d: MapPin) => {
        const tooltip = d3.select("#map-tooltip");
        tooltip.style("opacity", 1)
               .html(`<div class="p-2 bg-white border border-gray-200 shadow-lg rounded text-[10px] font-jp">
                        <img src="${d.image}" class="w-32 h-auto mb-1 rounded" />
                        <strong>${d.area}</strong><br/>${d.date}
                      </div>`)
               .style("left", `${event.pageX + 15}px`)
               .style("top", `${event.pageY - 10}px`);
      })
      .on("mouseout", () => {
        d3.select("#map-tooltip").style("opacity", 0);
      });

    link.selectAll("path")
      .data((d: MapPin) => [d])
      .join("path")
      .attr("d", createPinPath)
      .attr("fill", "#EA5455")
      .attr("stroke", "#EA5455")
      .attr("stroke-width", 1.5)
      .attr("class", "cursor-pointer hover:opacity-80 transition-opacity");

  }, [createPinPath]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 mt-20">
      <h3 className="text-sm text-gray-400 mb-4 font-jp tracking-widest">旅の記録</h3>
      <div id="map-container" className="w-full h-[400px] md:h-[600px] relative bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100">
        <svg 
          ref={mapRef} 
          viewBox="0 0 1000 853" 
          className="w-full h-full relative z-10"
          style={{ 
            backgroundImage: `url(${JapanSvg})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div id="map-tooltip" className="fixed pointer-events-none opacity-0 z-[100] transition-opacity duration-200" />
      </div>
    </div>
  );
};

export default JapanMap;