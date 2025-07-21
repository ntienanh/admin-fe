import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BellOutlined,
  DollarOutlined,
  EyeOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Card, Col, List, Progress, Row, Space, Statistic, Typography } from 'antd';

const { Title, Text } = Typography;

export default function Component() {
  // Sample data for the dashboard
  const stats = [
    {
      title: 'Total Users',
      value: 11280,
      prefix: <UserOutlined />,
      suffix: '',
      precision: 0,
      valueStyle: { color: '#3f8600' },
      trend: { value: 11.28, isPositive: true },
    },
    {
      title: 'Total Orders',
      value: 8542,
      prefix: <ShoppingCartOutlined />,
      suffix: '',
      precision: 0,
      valueStyle: { color: '#1890ff' },
      trend: { value: 6.43, isPositive: true },
    },
    {
      title: 'Revenue',
      value: 125840,
      prefix: <DollarOutlined />,
      suffix: '',
      precision: 0,
      valueStyle: { color: '#722ed1' },
      trend: { value: 2.14, isPositive: false },
    },
    {
      title: 'Page Views',
      value: 45672,
      prefix: <EyeOutlined />,
      suffix: '',
      precision: 0,
      valueStyle: { color: '#fa8c16' },
      trend: { value: 8.92, isPositive: true },
    },
  ];

  const recentActivities = [
    {
      title: 'New user registration',
      description: 'John Doe joined the platform',
      avatar: <Avatar icon={<UserOutlined />} />,
      time: '2 minutes ago',
    },
    {
      title: 'Order completed',
      description: 'Order #12345 has been delivered',
      avatar: <Avatar icon={<ShoppingCartOutlined />} style={{ backgroundColor: '#52c41a' }} />,
      time: '5 minutes ago',
    },
    {
      title: 'New review posted',
      description: 'Product received 5-star rating',
      avatar: <Avatar icon={<TrophyOutlined />} style={{ backgroundColor: '#faad14' }} />,
      time: '10 minutes ago',
    },
    {
      title: 'System notification',
      description: 'Server maintenance scheduled',
      avatar: <Avatar icon={<BellOutlined />} style={{ backgroundColor: '#f5222d' }} />,
      time: '1 hour ago',
    },
  ];

  const departmentStats = [
    { name: 'Sales', count: 45, progress: 78 },
    { name: 'Marketing', count: 32, progress: 65 },
    { name: 'Development', count: 28, progress: 92 },
    { name: 'Support', count: 19, progress: 54 },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: 'transparent', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Dashboard Overview
      </Title>

      {/* Main Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={stat.precision}
                valueStyle={stat.valueStyle}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <div style={{ marginTop: '8px' }}>
                <Space>
                  {stat.trend.isPositive ? (
                    <ArrowUpOutlined style={{ color: '#3f8600' }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: '#cf1322' }} />
                  )}
                  <Text type={stat.trend.isPositive ? 'success' : 'danger'} style={{ fontSize: '12px' }}>
                    {stat.trend.value}%
                  </Text>
                  <Text type='secondary' style={{ fontSize: '12px' }}>
                    vs last month
                  </Text>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Department Statistics */}
        <Col xs={24} lg={12}>
          <Card title='Department Overview' extra={<Badge count={4} />}>
            <Space direction='vertical' style={{ width: '100%' }} size='large'>
              {departmentStats.map((dept, index) => (
                <div key={index}>
                  <Row justify='space-between' align='middle'>
                    <Col>
                      <Space>
                        <TeamOutlined />
                        <Text strong>{dept.name}</Text>
                      </Space>
                    </Col>
                    <Col>
                      <Text type='secondary'>{dept.count} members</Text>
                    </Col>
                  </Row>
                  <Progress
                    percent={dept.progress}
                    size='small'
                    style={{ marginTop: '8px' }}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                </div>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card title='Recent Activities' extra={<Badge dot />}>
            <List
              itemLayout='horizontal'
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.avatar}
                    title={item.title}
                    description={
                      <Space direction='vertical' size={0}>
                        <Text type='secondary'>{item.description}</Text>
                        <Text type='secondary' style={{ fontSize: '12px' }}>
                          {item.time}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Additional Metrics Row */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Active Projects'
              value={24}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress percent={75} size='small' style={{ marginTop: '12px' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title='Completion Rate'
              value={89.3}
              suffix='%'
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={89.3} size='small' style={{ marginTop: '12px' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title='Pending Tasks' value={156} prefix={<BellOutlined />} valueStyle={{ color: '#faad14' }} />
            <Progress percent={45} size='small' style={{ marginTop: '12px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
