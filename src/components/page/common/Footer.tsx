import { Layout } from 'antd';

const { Footer } = Layout;

const FooterMainLayout = () => {
  return (
    <Footer style={{ textAlign: 'center', height: 48 }} className='flex items-center justify-center'>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};

export default FooterMainLayout;
