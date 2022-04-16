import OutputTimeTree from './OutputTimeTree';
import { Layout } from 'antd';
import { Card } from 'antd';
import { SiZenn } from "react-icons/si";
import { AiOutlineFile } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { IconContext } from 'react-icons';
const { Header } = Layout;

const Output = () => {
  return (
    <div className="bg-natural">
      <Layout>
        <Header className="bg-natural text-5xl style-ale tracking-wide pl-48">
          Output
        </Header>
        <div className="md:flex md:justify-center bg-natural">
          <div className="flex flex-col md:flex-row py-24 bg-natural">
            <div className="">
              <a href="https://zenn.dev/kousei_089" target="_blank" rel="noopener noreferrer">
                <Card className="relative card-style">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute inset-14">
                    <SiZenn />
                  </div>
                </IconContext.Provider>
                </Card>
              </a>
              <a href="https://zenn.dev/kousei_089" target="_blank" rel="noopener noreferrer"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Zenn</p></a>
            </div>
            <div className="">
              <a href="https://github.com/KouSei089" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute inset-14">
                    <AiOutlineGithub />
                  </div>
                </IconContext.Provider>
                </Card>
                </a>
              <a href="https://github.com/KouSei089" target="_blank" rel="noopener noreferrer"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Github</p></a>
            </div>
            <div className="">
              <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute inset-14">
                    <AiOutlineFile />
                  </div>
                </IconContext.Provider>
                </Card>
                </a>
              <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">note</p></a>
            </div>
          </div>
        </div>
      </Layout>
      <OutputTimeTree />
    </div>
  )
}

export default Output;
