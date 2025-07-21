import {
  AppstoreOutlined,
  AuditOutlined,
  ContainerOutlined,
  DashboardOutlined,
  DesktopOutlined,
  DollarOutlined,
  LeftOutlined,
  MailOutlined,
  RightOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import HeaderMainLayout from '../components/page/common/Header';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '/', icon: <DashboardOutlined />, label: <Link to='/'>Dashboard</Link> },

  {
    key: '/user',
    icon: <TeamOutlined />,
    label: 'Users',
    children: [
      { key: '/staff', label: <Link to='/staff'>Staff</Link>, icon: <UsergroupAddOutlined /> },
      { key: '/role', label: <Link to='/role'>Role</Link>, icon: <UserSwitchOutlined /> },
    ],
  },
  { key: '/product2', icon: <DesktopOutlined />, label: <Link to='/product'>Product</Link> },
  { key: '/calendar', icon: <ContainerOutlined />, label: <Link to='/calendar'>Calendar</Link> },
  { key: '/123', icon: <ContainerOutlined />, label: <Link to='/produ123ct'>Not found</Link> },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '/product', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Store',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'History', icon: <DesktopOutlined /> },
      { key: '10', label: 'Revenue', icon: <DollarOutlined /> },
    ],
  },
  {
    key: 'admin',
    label: 'Administration',
    icon: <AuditOutlined />,
    children: [
      { key: '11', label: 'Settings', icon: <DesktopOutlined /> },
      { key: '12', label: 'Revenue', icon: <DollarOutlined /> },
    ],
  },
];

const MainLayout: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Xác định menu nào nên mở dựa trên path
    const path = location.pathname;
    setSelectedKeys([path]);

    // Tìm menu cha chứa path hiện tại
    const findOpenKey = (items: any[], path: string): string[] => {
      for (let item of items) {
        if (item.children) {
          const match = item.children.find((child: any) => child.key === path);
          if (match) return [item.key];
        }
      }
      return [];
    };

    setOpenKeys(findOpenKey(items, path));
  }, [location.pathname]);

  const handleOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

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
        className='fixed left-0 top-0 z-50 h-full overflow-y-auto border-r bg-white transition-all !duration-200 ease-in-out'
        trigger={
          <div className='flex h-12 items-center justify-center !bg-[#E2273950] hover:bg-gray-200'>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </div>
        }
      >
        {/* Logo */}
        <div
          className={clsx(
            'flex h-16 w-full items-center justify-center border-r bg-gray-100 shadow-md',
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
          selectedKeys={selectedKeys}
          defaultSelectedKeys={['1']}
          items={items}
          className='mt-2'
        />
      </Sider>

      {/* Main Content Area */}
      <div
        className='flex h-full flex-col transition-[margin,width] duration-200 ease-in-out'
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
        }}
      >
        {/* Fixed Header */}
        <HeaderMainLayout />

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto overflow-x-hidden bg-white p-5'>
          <Outlet />
        </div>

        {/* Footer */}
        {/* <div className='bg-gray-100'>
          <FooterMainLayout />
        </div> */}
      </div>
    </div>
  );
};

export default MainLayout;
