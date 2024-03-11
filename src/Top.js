import { Layout } from 'antd';
import "antd/dist/antd.css";

const { Content } = Layout;

const Top = () => (
  <div className="flex items-center">
    <Layout>
      <Content className="bg-white font-zen leading-5">
        <div className="px-6 md:px-72 pb-12 flex justify-center">
          <img
            className="w-screen lg:w-full h-xl lg:h-full object-cover"
            src="https://github.com/KouSei089/watashi/assets/77420123/d32f15ff-a725-40a4-b58f-8c79d67f8eb6"
            alt="main-img"
          />
        </div>
      </Content>
    </Layout>
  </div>
);
export default Top;
