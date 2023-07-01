import { Timeline } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faTrain,
  faSubway,
  faShip,
  faPlane,
  faCar
} from "@fortawesome/free-solid-svg-icons";
import travelLogs from "./regional_data/travel_log.json";

const iconMapping = {
  faMountain: faMountain,
  faTrain: faTrain,
  faSubway: faSubway,
  faShip: faShip,
  faPlane: faPlane,
  faCar: faCar
};

const Log = () => {
  return (
    <>
      <Timeline mode={"left"}>
        {travelLogs.map((item) => (
          <Timeline.Item
            label={
              item.label && <span className="timeline-item-label">{item.label}</span>
            }
            dot={
              <FontAwesomeIcon
                icon={iconMapping[item.iconName]}
                style={{ color: item.color }}
              />
            }
          >
            <a
              href={item.url}
              className="timeline-item-content transform transition-all duration-300 hover:opacity-50"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {item.title}
            </a>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};

export default Log;
