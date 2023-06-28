import { Layout } from 'antd';
import { Card } from 'antd';
import { Image } from 'antd';
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
                    fallback="https://github.com/KouSei089/portfolio-izuha/assets/77420123/b89f4854-0fb0-43b9-96c8-f47268c4c3f4"
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
                        fallback="https://github.com/KouSei089/portfolio-izuha/assets/77420123/b89f4854-0fb0-43b9-96c8-f47268c4c3f4"
                      />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://note.com/izuha0" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Note</p></a>
              </div>
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
                      fallback="https://github.com/KouSei089/portfolio-izuha/assets/77420123/b89f4854-0fb0-43b9-96c8-f47268c4c3f4"
                    />
                    </div>
                  </IconContext.Provider>
                  </Card>
                </a>
                <a href="https://github.com/KouSei089" target="_blank" rel="noopener noreferrer"><p className="style-ale card-title">Github</p></a>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

export default Profile;
