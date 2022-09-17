import FreeTimeProfile from './FreeTimeProfile';
import { Layout } from 'antd';
import { Card } from 'antd';
import { Image } from 'antd';
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
        <Content className="bg-white font-zen leading-5 py-6">
          <div className="px-20 lg:px-72 pt-20 bg-white">
            <p>Worked for a major apparel brand for 5 years .Through self-study of programming and reading, he learned about problem solving through technology and decided to become an engineer, enrolling in the programming school "RUNTEQ" in April 2021.Currently, he works as a backend engineer at TeamLab.As a personal activity, he is running an online community "DorisN".</p>
          </div>
        </Content>
        <Footer className="bg-white"></Footer>
      </Layout>
      <div>
        <Layout>
          <div className="md:flex md:justify-center bg-white">
            <div className="flex flex-col md:flex-row bg-white">
              {/* Twitter */}
              <div>
                <a href="https://twitter.com/izuha0" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative border-none">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute top-0.5 left-0">
                  <Image
                    width={173}
                    height={173}
                    src="error"
                    fallback="https://user-images.githubusercontent.com/77420123/190837029-0d80154e-c5ed-4e4a-861d-9529f1c59a41.PNG"
                  />
                  </div>
                </IconContext.Provider>
                </Card>
                </a>
                <a href="https://twitter.com/izuha0" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Twitter</p></a>
              </div>
              {/* note */}
              <div className="">
                <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer">
                  <Card className="card-style relative border-none">
                  <div className="absolute top-0 left-0 animate-ping h-1 w-1 rounded-full z-50"></div>
                  <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                    <div className="absolute top-0.5 left-0">
                      <Image
                        width={173}
                        height={173}
                        src="error"
                        fallback="https://user-images.githubusercontent.com/77420123/190838028-f1e685c6-4e55-4a38-b2ed-6102b58063ef.JPG"
                      />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Note</p></a>
              </div>
              {/* book */}
              <div>
                <a href="https://note.com/izuha0/n/n00872eaa0f51" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative border-none">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute top-0.5 left-0">
                      <Image
                        width={173}
                        height={173}
                        src="error"
                        fallback="https://user-images.githubusercontent.com/77420123/190838309-2ace8cfc-5b4c-4202-a5c7-1866493d043b.JPG"
                      />
                    </div>
                </IconContext.Provider>
                </Card>
                </a>
                <a href="https://note.com/izuha0/n/n00872eaa0f51" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Book</p></a>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <div className="pt-20 bg-white">
        <Layout>
          <div className="md:flex md:justify-center bg-white">
            <div className="flex flex-col md:flex-row bg-white">
              {/* Github */}
              <div>
                <a href="https://github.com/KouSei089" target="_blank" rel="noopener noreferrer">
                  <Card className="card-style relative border-none">
                  <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 rounded-full z-50"></div>
                  <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                    <div className="absolute top-0.5 left-0">
                    <Image
                      width={173}
                      height={173}
                      src="error"
                      fallback="https://user-images.githubusercontent.com/77420123/190838012-08f994ce-265c-47c9-bcd6-61688a3c64d6.JPG"
                    />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://github.com/KouSei089" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Github</p></a>
              </div>
              {/* Zenn */}
              <div>
                <a href="https://zenn.dev/kousei_089" target="_blank" rel="noopener noreferrer">
                  <Card className="card-style relative border-none">
                  <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 rounded-full z-50"></div>
                  <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                    <div className="absolute top-0.5 left-0">
                      <Image
                        width={173}
                        height={173}
                        src="error"
                        fallback="https://user-images.githubusercontent.com/77420123/190838455-0d7132a0-b71e-4f1f-b58a-491acce99c79.JPG"
                      />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://zenn.dev/kousei_089" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Zenn</p></a>
              </div>
              {/* Qiita */}
              <div>
                <a href="https://qiita.com/Izumi_Haruya" target="_blank" rel="noopener noreferrer">
                  <Card className="card-style relative border-none">
                  <div className="absolute top-0 left-0 animate-ping h-1 w-1 rounded-full z-50"></div>
                  <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                    <div className="absolute top-0.5 left-0">
                      <Image
                        width={173}
                        height={173}
                        src="error"
                        fallback="https://user-images.githubusercontent.com/77420123/190838457-f02ce9e6-8adc-4d78-988f-01c33a952d25.JPG"
                      />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://qiita.com/Izumi_Haruya" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Qiita</p></a>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      <div className="pt-20 bg-white">
        <Layout>
          <div className="md:flex md:justify-center bg-white">
            <div className="flex flex-col md:flex-row bg-white">
              {/* Wantedly */}
              <div>
                <a href="https://www.wantedly.com/id/haruya_izumi" target="_blank" rel="noopener noreferrer">
                <Card className="card-style relative border-none">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute top-0.5 left-0">
                      <Image
                        width={173}
                        height={173}
                        src="error"
                        fallback="https://user-images.githubusercontent.com/77420123/190838726-f7349a23-68bb-4f92-beb0-3475141f9545.JPG"
                      />
                    </div>
                </IconContext.Provider>
                </Card>
                </a>
                <a href="https://www.wantedly.com/id/haruya_izumi" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Wantedly</p></a>
              </div>
              {/* Vision */}
              <div>
                <a href="https://note.com/izuha0/n/n09c19960a270" target="_blank" rel="noopener noreferrer">
                  <Card className="card-style relative border-none">
                  <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 rounded-full z-50"></div>
                  <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                    <div className="absolute top-0.5 left-0">
                      <Image
                        width={173}
                        height={173}
                        src="error"
                        fallback="https://user-images.githubusercontent.com/77420123/190838781-d741bb45-0f29-4663-bb2a-07123a56da64.jpg"
                      />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://note.com/izuha0/n/n09c19960a270" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Vision</p></a>
              </div>
              {/* Music */}
              <div>
                <a href="https://open.spotify.com/playlist/3Z1bBX80z2vdT6JpP3CmFF?si=8367bcf454f34da2" target="_blank" rel="noopener noreferrer">
                  <Card className="card-style relative border-none">
                  <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 rounded-full z-50"></div>
                  <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                    <div className="absolute top-0.5 left-0">
                      <Image
                        width={173}
                        height={173}
                        src="error"
                        fallback="https://user-images.githubusercontent.com/77420123/190837774-56db0679-0ef5-476c-b41b-e38636b90d16.jpeg"
                      />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://open.spotify.com/playlist/3Z1bBX80z2vdT6JpP3CmFF?si=8367bcf454f34da2" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Music</p></a>
              </div>
            </div>
          </div>
        </Layout>
      </div>
      {/* <FreeTimeProfile /> */}
    </>
  );
}

export default Profile;
