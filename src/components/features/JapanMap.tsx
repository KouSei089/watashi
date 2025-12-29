import React, { useEffect, useRef, useCallback, useMemo } from "react";
import JapanSvg from '../../assets/svg/japanMap.svg';
import regionalDetail from '../../data/regional/regional_detail.json';
import * as d3 from "d3";
import { MapPin } from "../../types";

const JapanMap: React.FC = () => {
  // SVG要素への参照に型を付ける
  const mapRef = useRef<SVGSVGElement | null>(null);
  
  // Projectionは再計算不要なので useMemo で保持
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

    const pinGroup = svg.append("g");

    // 型定義を MapPin[] として明示
    const pins = regionalDetail as MapPin[];

    const link = pinGroup
      .selectAll("a")
      .data(pins)
      .join("a")
      .attr("xlink:href", (d: MapPin) => d.url)
      .attr("xlink:title", (d: MapPin) => d.area)
      .attr("target", "_blank")
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .on("click", onClick);

    link
      .selectAll("path")
      .data((d: MapPin) => [d])
      .join("path")
      .attr("d", createPinPath)
      .attr("fill", "#EA5455")
      .attr("stroke", "#EA5455")
      .attr("stroke-width", 1);

    // ツールチップの生成（D3管理）
    const tooltip = d3.select("body")
      .selectAll<HTMLDivElement, unknown>(".map-tooltip")
      .data([null])
      .join("div")
      .attr("class", "map-tooltip")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("background", "white")
      .style("padding", "8px")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("z-index", "100");

    function onMouseOver(event: MouseEvent, d: MapPin) {
      tooltip.style("opacity", 1);
      tooltip
        .html(`
          <div style="font-family: sans-serif; font-size: 12px;">
            <img src="${d.image}" alt="${d.area}" style="width:200px; height:auto; display:block; margin-bottom:4px;" />
            <strong>${d.area}</strong><br />
            <span style="color: #666;">${d.date}</span>
          </div>
        `)
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY + "px");
    }

    function onMouseOut() {
      tooltip.style("opacity", 0);
    }

    function onClick(event: MouseEvent, d: MapPin) {
      event.preventDefault(); // D3とReactの競合を避ける
      window.open(d.url, '_blank', 'noopener,noreferrer');
    }
    
    // クリーンアップ関数（アンマウント時にツールチップを消す）
    return () => {
      d3.selectAll(".map-tooltip").remove();
    };
  }, [createPinPath]);

  return (
    <div id="map-container" className="w-full h-[600px] mt-5 lg:mt-20 relative overflow-hidden">
      <svg 
        ref={mapRef} 
        viewBox="0 0 1000 853" 
        className="w-full h-full transition-transform duration-500"
        style={{ 
          backgroundImage: `url(${JapanSvg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
};

export default JapanMap;