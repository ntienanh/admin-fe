import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FooterMainLayout from '../components/page/common/Footer';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
  { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <AppstoreOutlined />,
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
      {
        key: 'sub5',
        label: 'Submenu',
        children: [
          { key: '15', label: 'Option 15' },
          { key: '16', label: 'Option 16' },
        ],
      },
    ],
  },
];

const MainLayout: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const sidebarWidth = collapsed ? 80 : 240;

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      {/* Sider */}
      <Sider
        width={240}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className='fixed left-0 top-0 z-50 h-full overflow-y-auto bg-white transition-all duration-300 ease-in-out'
      >
        {/* Logo */}
        <div
          className={clsx(
            'flex h-16 w-full items-center justify-center border-r bg-white shadow-md',
            collapsed && 'px-1',
          )}
        >
          <img src='https://pbs.twimg.com/media/CyGXXiZWEAEznfZ.png' alt='logo' className='h-12 object-contain' />
        </div>

        <Menu
          onOpenChange={handleOpenChange}
          theme='light'
          mode='inline'
          openKeys={openKeys}
          defaultSelectedKeys={['1']}
          items={items}
          className='mt-2'
        />
      </Sider>

      {/* Main Content Area */}
      <div
        className='flex h-full flex-col transition-[margin,width] duration-300 ease-in-out'
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        {/* Fixed Header */}
        <Header className='sticky top-0 z-40 flex h-16 items-center justify-between bg-red-100 px-4 shadow-md'>
          <div>Header Left</div>
          <div>Header Right</div>
        </Header>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto overflow-x-hidden bg-white'>
          <Outlet />
        </div>

        {/* Footer */}
        <div className='bg-gray-100'>
          <FooterMainLayout />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
