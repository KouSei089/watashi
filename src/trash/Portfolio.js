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
        <Header className="bg-natural title-text pt-12">
          Portfolio
        </Header>
        <div className="md:flex md:justify-center bg-natural">
          <div className="flex flex-col md:flex-row pt-24 bg-natural">
            <div className="">
              <a href="https://a-mikke.com" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute inset-14">
                    <AiOutlineMedium />
                  </div>
                </IconContext.Provider>
                </Card>
                </a>
              <a href="https://a-mikke.com" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Personal development Mikke</p></a>
            </div>
            <div className="">
            <a href="https://qiita.com/Izumi_Haruya/items/148bb9fbf5e8723fd8fa" target="_blank" rel="noopener noreferrer">
              <Card className="card-style relative">
              <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
              <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                <div className="absolute inset-14">
                  <SiQiita />
                </div>
              </IconContext.Provider>
              </Card>
            </a>
            <a href="https://qiita.com/Izumi_Haruya/items/148bb9fbf5e8723fd8fa" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Mikke Qiita</p></a>
            </div>
            <div className="">
              <a href="https://kousei089.github.io/watashi/" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute inset-14">
                    <GoRocket />
                  </div>
                </IconContext.Provider>
                </Card>
              </a>
              <a href="https://kousei089.github.io/watashi/" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">My Portfolio</p></a>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Portfolio;
