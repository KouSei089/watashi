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
        <div className="flex justify-center py-24 bg-natural">
          <div className="">
            <a href="https://zenn.dev/kousei_089">
              <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
              <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
              <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                <div className="absolute inset-14">
                  <SiZenn />
                </div>
              </IconContext.Provider>
              </Card>
            </a>
            <a href="https://zenn.dev/kousei_089"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Zenn</p></a>
          </div>
          <div className="">
            <a href="https://github.com/KouSei089">
              <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
              <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
              <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                <div className="absolute inset-14">
                  <AiOutlineGithub />
                </div>
              </IconContext.Provider>
              </Card>
              </a>
            <a href="https://github.com/KouSei089"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Github</p></a>
          </div>
          <div className="">
            <a href="https://note.com/izuha0">
              <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
              <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
              <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                <div className="absolute inset-14">
                  <AiOutlineFile />
                </div>
              </IconContext.Provider>
              </Card>
              </a>
            <a href="https://note.com/izuha0"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">note</p></a>
          </div>
        </div>
      </Layout>
      <OutputTimeTree />
    </div>
  )
}

export default Output;
