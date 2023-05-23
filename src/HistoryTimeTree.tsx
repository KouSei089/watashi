import React from 'react'
import { Timeline } from 'antd';
import { DiJsBadge } from "react-icons/di";
import { DiRubyRough } from "react-icons/di";
import { DiRor } from "react-icons/di";
import { DiGithubBadge } from "react-icons/di";
import { SiAlpinedotjs } from "react-icons/si";
import { SiJquery } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { DiReact } from "react-icons/di";
import { SiAntdesign } from "react-icons/si";
import { RiGitRepositoryFill } from "react-icons/ri";

const HistoryTimeTree = () => {
  return (
    <Timeline mode="alternate">
      <Timeline.Item color="#F4F4F2">
        <p className="font-black border-matte border-b-2">TeamLab Backend Engineer. 2022-06-15 Now in ...</p>
      </Timeline.Item>
      <Timeline.Item color="#F4F4F2">
        <p>Create a <a href="https://kousei089.github.io/portfolio-izuha/" target="_blank" rel="noopener noreferrer">"portfolio website."</a> 2022-04-14</p>
        <p>- Technology stacks used -</p>
        <div className="flex justify-end">
          <DiReact className="mr-1" /><DiJsBadge className="mr-1" /><SiTailwindcss className="mr-1" /><SiAntdesign className="mr-1" /><DiGithubBadge className="mr-1" />
        </div>
        <a href="https://github.com/KouSei089/portfolio-izuha" target="_blank" rel="noopener noreferrer">
          <div className="flex justify-end">
            <p className="pt-1.5"><RiGitRepositoryFill /></p>
            <p>Repository</p>
          </div>
        </a>
      </Timeline.Item>
      <Timeline.Item color="#F4F4F2">I studied mainly Ruby on Rails at "RUNTEQ", a programming school run by Startup Technology Inc. As for personal development, I released "Mikke," a service that digitally realizes "writing," analyzes emotions, and supports users to easily make it a habit. We used AWS for deployment.
      Currently, we are working on an application using React and TypeScript.</Timeline.Item>
      <Timeline.Item color="#F4F4F2">
        <p>Released <a href="https://a-mikke.com" target="_blank" rel="noopener noreferrer">"Mikke", a personal development service.</a> 2022-02-14</p>
        <p>- Technology stacks used -</p>
        <div className="flex justify-end">
          <DiRubyRough className="mr-1" /><DiRor className="mr-1" /><SiTailwindcss className="mr-1" /><DiJsBadge className="mr-1" /><SiJquery className="mr-1" /><SiAlpinedotjs className="mr-1" /><DiGoogleAnalytics className="mr-1" /><SiPostgresql className="mr-1" /><FaAws className="mr-1" /><DiGithubBadge className="mr-1" />
        </div>
        <a href="https://github.com/KouSei089/Mikke" target="_blank" rel="noopener noreferrer">
          <div className="flex justify-end">
            <p className="pt-1.5"><RiGitRepositoryFill /></p>
            <p>Repository</p>
          </div>
        </a>
      </Timeline.Item>
      <Timeline.Item color="#F4F4F2">
        <p className="font-black border-matte border-b-2">RUNTEQ web development learning 2021-04-16</p>
      </Timeline.Item>
      <Timeline.Item color="#F4F4F2">
        Promoted to Assistant Manager.
        As assistant manager, management duties. Created sales floor, managed inventory, sales, hiring, and training plans for 22 employees, maximized store profit and cost efficiency, and managed the store. 2021-11-30
      </Timeline.Item>
      <Timeline.Item color="#F4F4F2">
        Appointed as a regular employee.
        As acting store manager, created sales floor, inventory control, sales planning, and trained 5 subordinates. 2019-02-23
      </Timeline.Item>
      <Timeline.Item color="#F4F4F2"><p className="font-black border-matte border-b-2">G.U. Corporation 2016-02-23</p></Timeline.Item>
      <Timeline.Item>Ohgiya East Japan Co. 2014-04-15</Timeline.Item>
      <Timeline.Item color="#F4F4F2" className="bg-white">
        Fukushima Prefectural Sukagawa High School 2014-3-12
      </Timeline.Item>
    </Timeline>
  );
}


export default HistoryTimeTree;
