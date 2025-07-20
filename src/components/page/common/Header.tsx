import { BellOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Popover } from 'antd';
const { Header } = Layout;
const HeaderMainLayout = () => {
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

  return (
    <Header className='sticky top-0 z-40 flex h-16 items-center justify-between bg-gray-100 px-4 shadow-md'>
      <div></div>

      <div className='flex items-center gap-4'>
        {/* Notification Icon with Red Dot */}
        <Badge dot offset={[-2, 2]}>
          <Button shape='circle' icon={<BellOutlined />} style={{ border: 'none' }} className='shadow-md' />
        </Badge>

        {/* Avatar with Popover */}
        <Popover placement='bottomRight' content={content} trigger='click'>
          <Avatar
            size='large'
            src='https://randomuser.me/api/portraits/men/32.jpg'
            className='cursor-pointer shadow-md'
          />
        </Popover>
      </div>
    </Header>
  );
};

export default HeaderMainLayout;
