import React from 'react';
import { Timeline } from 'antd';

const OutputStudy = () => {
  return (
    <div className="px-6 md:px-24 lg:px-24 font-zen">
      <p className="text-xl pb-5">Online Study Sessions</p>
      <Timeline>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/link/comments/73439db9d0ed62" target="_blank"
          rel="noopener noreferrer">
            <p>JavaScript Study Group 2022/04/02</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/link/comments/1e1ffd8806e011" target="_blank"
          rel="noopener noreferrer">
            <p>Be aware that learning should be done to output. 2022/04/10</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/link/comments/25186432555819" target="_blank"
          rel="noopener noreferrer">
            <p>From how the Internet works to how Rails works. 2022/04/17</p>
          </a>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default OutputStudy;
