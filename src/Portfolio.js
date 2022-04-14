import { Layout } from 'antd';
import { Card } from 'antd';
import { AiOutlineMedium } from "react-icons/ai";
import { SiQiita } from "react-icons/si";
import { GoRocket } from "react-icons/go";
import { IconContext } from 'react-icons';

const { Header } = Layout;

const Portfolio = () => {
  return (
    <div className="bg-natural">
      <Layout>
        <Header className="bg-natural text-5xl style-ale tracking-wide pl-48">
          Portfolio
        </Header>
        <div className="flex justify-center py-24 bg-natural">
          <div className="">
            <a href="https://a-mikke.com">
              <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
              <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
              <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                <div className="absolute inset-14">
                  <AiOutlineMedium />
                </div>
              </IconContext.Provider>
              </Card>
              </a>
            <a href="https://a-mikke.com"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Personal development Mikke</p></a>
          </div>
          <div className="">
           <a href="https://qiita.com/Izumi_Haruya/items/148bb9fbf5e8723fd8fa">
            <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
            <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
            <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
              <div className="absolute inset-14">
                <SiQiita />
              </div>
            </IconContext.Provider>
            </Card>
          </a>
          <a href="https://qiita.com/Izumi_Haruya/items/148bb9fbf5e8723fd8fa"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Mikke Qiita</p></a>
          </div>
          <div className="">
            <a href="https://kousei089.github.io/portfolio-izuha/">
              <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
              <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
              <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                <div className="absolute inset-14">
                  <GoRocket />
                </div>
              </IconContext.Provider>
              </Card>
            </a>
            <a href="https://kousei089.github.io/portfolio-izuha/"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">My Portfolio</p></a>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Portfolio;
