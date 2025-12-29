import React, { useEffect, useRef, useCallback } from "react";
// 1. SVGはimgタグや背景として使うのが一般的ですが、D3で操作する場合はコンテナを用意します
import JapanSvg from '../../assets/svg/japanMap.svg';
// 2. 読み込んだデータの名前を「regionalDetail」として使います
import regionalDetail from '../../data/regional/regional_detail.json';
import * as d3 from "d3";

const JapanMap = () => {
  const mapRef = useRef(null);
  
  // projectionをuseMemoや外部定義にするとより良いですが、一旦そのままで
  const projection = d3
    .geoMercator()
    .center([138.433, 35.5])
    .scale(1830)
    .translate([500, 426.5]);

  // useCallbackでラップして依存関係を安定させます
  const createPinPath = useCallback((pin) => {
    const [x, y] = projection([pin.lon, pin.lat]);
    return `
      M ${x}, ${y}
      L ${x}, ${y - 20}
      A 4 4 0 1 1 ${x - 0.1}, ${y - 20}
    `;
  }, [projection]);

  useEffect(() => {
    if (mapRef.current) {
      const svg = d3.select(mapRef.current);
      
      // 前の描画をクリア（再描画時の重複防止）
      svg.selectAll("*").remove();

      // 背景として地図を敷く（あるいはD3で描画する設計ならここに追加）
      // 今回は既存のロジックを活かし、ピンのグループを作成
      const pinGroup = svg.append("g");

      // .data(data) を .data(regionalDetail) に修正
      const link = pinGroup
        .selectAll("a")
        .data(regionalDetail) // ここを修正！
        .join("a")
        .attr("xlink:href", (pin) => pin.url)
        .attr("xlink:title", (pin) => pin.area)
        .attr("target", "_blank")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .on("click", onClick);

      link
        .selectAll("path")
        .data((pin) => [pin])
        .join("path")
        .attr("d", createPinPath)
        .attr("fill", "#EA5455")
        .attr("stroke", "#EA5455")
        .attr("stroke-width", 1);

      const tooltip = d3.select("body")
        .selectAll(".tooltip")
        .data([null])
        .join("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("opacity", 0);

      function onMouseOver(event, pin) {
        tooltip.style("opacity", 1);
        tooltip
          .html(`<img src="${pin.image}" alt="${pin.area}" style="width:200px; height:auto;" /><br />${pin.area}<br />${pin.date}`)
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + "px");
      }

      function onMouseOut() {
        tooltip.style("opacity", 0);
      }

      function onClick(event, pin) {
        window.open(pin.url, '_blank');
      }
    }
  }, [createPinPath]); // 依存配列にcreatePinPathを入れる

  return (
    <div id="map-container" className="w-full h-[600px] mt-5 lg:mt-20 relative">
      {/* SVGコンテナを用意。背景に地図画像を敷く形式ならstyleで指定 */}
      <svg 
        ref={mapRef} 
        viewBox="0 0 1000 853" 
        className="w-full h-full"
        style={{ 
          backgroundImage: `url(${JapanSvg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
};

export default JapanMap;