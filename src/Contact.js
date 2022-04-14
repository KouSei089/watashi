import { Layout } from 'antd';

const { Header, Content } = Layout;

const Contact = () => {
  return (
    <div>
      <Layout>
        <Header className="bg-white text-2xl style-ale tracking-wide pl-48">
          Contact
        </Header>
        <Content className="bg-white font-zen leading-5">
          <div className="px-72 pb-12 flex justify-center">
            <p className="mr-5">e-mail</p>
            <p className="">qq00891829@icloud.com</p>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default Contact;
