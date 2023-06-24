import React, { useEffect, useRef } from "react";
import { ReactComponent as Japan } from "./regional_data/japanMap.svg";
import data from "./regional_data/regional_detail.json";
import * as d3 from "d3";

const JapanMap = () => {
  const mapRef = useRef(null);
  const createPinPath = (pin) => {
    return `
      M ${pin.x}, ${pin.y}
      L ${pin.x}, ${pin.y - 20}
      A 4 4 0 1 1 ${pin.x - 0.1}, ${pin.y - 20}
      `;
  };

  useEffect(() => {
    if (mapRef.current) {
      const svg = d3.select(mapRef.current);
      const pinGroup = svg.append("g");

      // draw pins
      pinGroup
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("d", createPinPath)
        .attr("fill", "#EA5455") // Change the fill color here
        .attr("stroke", "#EA5455")
        .attr("stroke-width", 1)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);

      // add tooltips
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
    <div style={{ width: "100%", height: "600px" }}>
      <Japan ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default JapanMap;
