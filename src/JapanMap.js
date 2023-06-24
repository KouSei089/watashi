import React, { useEffect, useRef } from "react";
import { ReactComponent as Japan } from "./regional_data/japanMap.svg";
import data from "./regional_data/regional_detail.json";
import * as d3 from "d3";

const JapanMap = () => {
  const mapRef = useRef(null);
  const projection = d3
    .geoMercator()
    .center([138.433, 35.5])
    .scale(1830)
    .translate([500, 426.5]);

  const createPinPath = (pin) => {
    const [x, y] = projection([pin.lon, pin.lat]);
    return `
      M ${x}, ${y}
      L ${x}, ${y - 20}
      A 4 4 0 1 1 ${x - 0.1}, ${y - 20}
    `;
  };

  useEffect(() => {
    if (mapRef.current) {
      const svg = d3.select(mapRef.current);
      const pinGroup = svg.append("g");

      // Draw pins inside the 'a' tag
      const link = pinGroup
        .selectAll("a")
        .data(data)
        .join("a")
        .attr("xlink:href", (pin) => pin.url)
        .attr("xlink:title", (pin) => pin.area)
        .attr("target", "_blank")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);

      link
        .selectAll("path")
        .data((pin) => [pin])
        .join("path")
        .attr("d", createPinPath)
        .attr("fill", "#EA5455")
        .attr("stroke", "#EA5455")
        .attr("stroke-width", 1);

      // Add tooltips
      const tooltip = d3.select("body").append("div").attr("class", "tooltip");

      function onMouseOver(event, pin) {
        tooltip.style("opacity", 1);
        tooltip
          .html(`${pin.area}`)
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY + "px");
        d3.select(this).style("stroke", "#EA5455");
      }

      function onMouseOut() {
        tooltip.style("opacity", 0);
        d3.select(this).style("stroke", "#EA5455");
      }
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <Japan ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default JapanMap;
