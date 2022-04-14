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
          <Header className="bg-white text-5xl style-ale tracking-wide pl-48">
            Profile
          </Header>
          <Content className="bg-natural font-zen leading-5 pt-6">
            <p className="px-72">大手アパレルブランドで5年間の実務を経験。プログラミングの独学・読書を通じてテクノロジーでの問題解決を知り、エンジニアになりたいと考え、2021年4月よりプログラミングスクールRUNTEQへ入学。その後『Mikke（ミッケ）習慣ジャーナリング』を個人開発し、リリースする。月間1500PV以上 / UU200人以上を達成しました。
            現在は、React/TypeScriptを使用したアプリを作成中です。
            個人活動では、オンラインコミュニティ『DIALogue』を運営おります。</p>
          </Content>
          <div className="flex justify-center py-24 bg-natural">
            <div>
              <a href="https://twitter.com/izuha0">
              <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
              <div className="absolute top-0 left-0 animate-ping h-1 w-1 bg-matte rounded-full z-50"></div>
              <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                <div className="absolute inset-14">
                  <AiOutlineTwitter />
                </div>
              </IconContext.Provider>
              </Card>
              </a>
            <a href="https://twitter.com/izuha0"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Twitter</p></a>
            </div>
            <div className="">
              <a href="https://www.wantedly.com/id/haruya_izumi">
                <Card className="w-44 h-44 mx-24 border-natural relative hover:opacity-50 duration-700">
                <div className="absolute top-0 left-0 animate-ping h-1 w-1 delay-700 bg-matte rounded-full z-50"></div>
                <IconContext.Provider value={{ color: '#36312c', size: '60px'}}>
                  <div className="absolute inset-14">
                    <BiPlanet />
                  </div>
                </IconContext.Provider>
                </Card>
              </a>
              <a href="https://www.wantedly.com/id/haruya_izumi"><p className="style-ale ml-24 mt-2 pl-1 hover:opacity-50 duration-700 hover:text-black">Wantedly</p></a>
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
      </div>
    </>
  );
}

export default Profile;

