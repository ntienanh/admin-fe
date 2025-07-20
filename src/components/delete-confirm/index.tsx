import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm, type PopconfirmProps } from 'antd';

export default function DeleteConfirm(props: Partial<PopconfirmProps>) {
  return (
    <Popconfirm
      placement='right'
      title='Bạn chắc chắn xoá không？'
      okText='Ok'
      okButtonProps={{ danger: true }}
      icon={<QuestionCircleOutlined />}
      destroyOnHidden
      {...props}
    />
  );
}
