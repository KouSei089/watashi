import { Layout } from 'antd';
import Cards from './Card';

const { Header, Footer, Content } = Layout;

const Profile = () => {
  return (
    <>
      <Layout>
        <Header className="bg-white"></Header>
        <Content className="bg-white text-7xl text-center tracking-wider style-ale">Izumi Haruya</Content>
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
            <div className=""><Cards /></div>
            <div className=""><Cards /></div>
            <div className=""><Cards /></div>
          </div>
        </Layout>
      </div>
    </>
  );
}

export default Profile;

