import { Layout } from 'antd';
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";

const { Header, Content } = Layout;

const Contact = () => {
  return (
    <div>
      <Layout>
        <Header className="bg-white text-2xl style-ale tracking-wide pl-48 pt-5">
          Contact
        </Header>
        <Content className="bg-white font-zen leading-5">
          <div className="px-72 pb-12 flex justify-center">
            <p className="mr-5">e-mail</p>
            <p className="">qq00891829@icloud.com</p>
            <a href="https://github.com/KouSei089" target="_blank" rel="noopener noreferrer"><AiOutlineGithub className="mt-1.5 ml-2" /></a>
            <a href="https://twitter.com/izuha0" target="_blank" rel="noopener noreferrer"><AiOutlineTwitter className="mt-1.5 ml-2" /></a>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default Contact;
