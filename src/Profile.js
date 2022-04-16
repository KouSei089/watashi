import FreeTimeProfile from './FreeTimeProfile';
import { Layout } from 'antd';
import { Card } from 'antd';
import { AiOutlineFile } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiPlanet } from "react-icons/bi";
import { IconContext } from 'react-icons';

const { Header, Footer, Content } = Layout;

const Profile = () => {
  return (
    <>
      <Layout>
        <Header className="bg-white"></Header>
        <Content className="bg-white text-7xl text-matte text-center tracking-wider style-ale">Izumi Haruya</Content>
        <Footer className="bg-white"></Footer>
      </Layout>
      <div className="bg-natural">
        <Layout>
          <Header className="bg-white text-5xl style-ale tracking-wide pl-6 lg:pl-48">
            Profile
          </Header>
          <Content className="bg-natural font-zen leading-5 pt-6">
            <p className="px-20 lg:px-72 bg-natural">Worked for a major apparel brand for 5 years. Through self-study and reading of programming, he learned about problem solving through technology and decided to become an engineer, and enrolled in the programming school RUNTEQ in April 2021. He then developed and released "Mikke Custom Journaling" on his own. It achieved more than 1500 PV / 200 UUs per month. Currently, he is creating an app using React/TypeScript. As for personal activities, I am managing an online community "DIALogue".</p>
          </Content>
          <div className="md:flex md:justify-center bg-natural">
            <div className="flex flex-col md:flex-row pt-24 bg-natural">
              <div>
                <a href="https://twitter.com/izuha0" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute inset-14">
                    <AiOutlineTwitter />
                  </div>
                </IconContext.Provider>
                </Card>
                </a>
                <a href="https://twitter.com/izuha0" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Twitter</p></a>
              </div>
              <div className="">
                <a href="https://www.wantedly.com/id/haruya_izumi" target="_blank" rel="noopener noreferrer">
                  <Card className="card-style relative">
                  <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 bg-matte rounded-full z-50"></div>
                  <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                    <div className="absolute inset-14">
                      <BiPlanet />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://www.wantedly.com/id/haruya_izumi" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Wantedly</p></a>
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
                <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">note</p></a>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <FreeTimeProfile />
    </>
  );
}

export default Profile;

