import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faTrain,
  faSubway,
  faShip,
  faPlane,
  faCar
} from "@fortawesome/free-solid-svg-icons";
// 1. 変数名を travelLog に統一
import travelLog from '../../data/regional/travel_log.json';

const iconMapping = {
  faMountain,
  faTrain,
  faSubway,
  faShip,
  faPlane,
  faCar
};

const Log = () => {
  return (
    <div className="px-6 md:px-24 lg:px-72 py-10">
      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-0">
        {/* 2. travelLogs ではなく travelLog を使用 */}
        {travelLog.map((item, index) => (
          <div key={index} className="mb-10 ml-8 relative">
            {/* タイムラインのドット（アイコン） */}
            <span className="absolute -left-12 top-1 flex items-center justify-center w-8 h-8 bg-white rounded-full border border-gray-100 shadow-sm">
              <FontAwesomeIcon
                icon={iconMapping[item.iconName]}
                style={{ color: item.color }}
                className="text-sm"
              />
            </span>

            {/* ラベル（日付など） */}
            {item.label && (
              <div className="text-xs font-medium text-gray-400 uppercase mb-1">
                {item.label}
              </div>
            )}

            {/* コンテンツ */}
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="block group"
            >
              <h3 className="text-lg font-normal text-gray-800 transition-all duration-300 group-hover:opacity-50 group-hover:translate-x-1">
                {item.title}
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↗︎</span>
              </h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Log;