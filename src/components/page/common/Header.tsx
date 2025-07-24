import { BellOutlined, LogoutOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Layout, Popover } from 'antd';
import { useEffect, useState } from 'react';
import useMobileScreen from '../../../hooks/useMobileScreen';
const { Header } = Layout;

const HeaderMainLayout = ({ children, selectedKeys }: { children: React.ReactNode; selectedKeys: string[] }) => {
  const { isMobile } = useMobileScreen();
  const [openDrawer, setOpenDrawer] = useState(false);

  const content = (
    <div className='min-w-[200px] text-sm'>
      <div className='px-4 pb-1 pt-2 font-semibold'>{'name'}</div>
      <div className='my-2 border-t' />
      <div className='flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100'>
        <SettingOutlined />
        Account settings
      </div>
      <div className='flex cursor-pointer items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50'>
        <LogoutOutlined />
        Logout
      </div>
    </div>
  );

  useEffect(() => {
    setOpenDrawer(false);
  }, [selectedKeys]);

  return (
    <>
      <Header className='sticky top-0 z-40 flex h-16 items-center justify-between bg-gray-100 px-4 shadow-md'>
        {/* Left side */}
        <div className='flex items-center gap-2'>
          {isMobile && (
            <Button type='text' icon={<MenuOutlined />} onClick={() => setOpenDrawer(true)} className='text-xl' />
          )}
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4'>
          <Badge dot offset={[-2, 2]}>
            <Button shape='circle' icon={<BellOutlined />} style={{ border: 'none' }} className='shadow-md' />
          </Badge>

          <Popover placement='bottomRight' content={content} trigger='click'>
            <Avatar
              size='large'
              src='https://randomuser.me/api/portraits/men/32.jpg'
              className='cursor-pointer shadow-md'
            />
          </Popover>
        </div>
      </Header>

      {/* Drawer menu for mobile */}
      <Drawer
        title='Menu'
        placement='left'
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        styles={{ body: { padding: 0 } }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default HeaderMainLayout;
