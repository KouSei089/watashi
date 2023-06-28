import React from 'react';
import { Timeline } from 'antd';

const OutputTimeTree = () => {
  return (
    <div className="px-6 md:px-24 lg:px-24 font-zen">
      <p className="text-xl pb-5">Books Outputs</p>
      <Timeline>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/kousei_089/scraps/406f499a57e98f" target="_blank"
          rel="noopener noreferrer">
            <p>Software Engineering at Google by O'REILLY</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/kousei_089/scraps/7aec9f6f7e1848" target="_blank"
          rel="noopener noreferrer">
            <p>Master Programmer, 2nd</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">Ruby Super-introduction from Zero</Timeline.Item>
        <Timeline.Item color="black">Ruby Cherry Book</Timeline.Item>
        <Timeline.Item color="black">RubyonRails for use in the field</Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/kousei_089/scraps/937d308cc7a871" target="_blank"
          rel="noopener noreferrer">
            <p>Perfect Ruby on Rails</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/kousei_089/scraps/101a5cb54cd41f" target="_blank"
          rel="noopener noreferrer">
            <p>Thorough DB design instruction book to learn from masters</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/kousei_089/scraps/872485e9e8a25b" target="_blank"
          rel="noopener noreferrer">
            <p>JavaScript 7th by O'REILLY</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/kousei_089/scraps/5db748012a1f7b" target="_blank"
          rel="noopener noreferrer">
            <p>Programming TypeScript by O'REILLY</p>
          </a>
        </Timeline.Item>
        <Timeline.Item color="black">
          <a href="https://zenn.dev/kousei_089/scraps/2fff1bd9e8be68" target="_blank" rel="noopener noreferrer">
            <p>React Hands-on Learning by O'REILLY</p>
          </a>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default OutputTimeTree;
