import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, notification, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRef } from 'react';
import DeleteConfirm from '../../components/delete-confirm';
import SearchInput from '../../components/SearchInput';
import { useAntdTable } from '../../hooks/useAntdTable';
import type { IRole } from '../../interfaces/role';
import { RoleServices } from '../../services/role';
import RoleController, { type I_RoleController } from './controller';

const RolePage = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const roleController = useRef<I_RoleController>(null);

  const { tableProps } = useAntdTable<IRole>({
    queryKey: ['roles'],
    apiFn: RoleServices.roleQuery,
  });

  const columns: ColumnsType<IRole> = [
    // { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (_: string, record: IRole) => {
        return (
          <div className='flex gap-x-[10px] text-[20px]'>
            <EditOutlined
              style={{ color: '#4E89FF' }}
              onClick={() => {
                const { id, ...rest } = record;
                roleController.current?.openDetail(record.id.toString(), true, rest);
              }}
            />
            <InfoCircleOutlined
              style={{ color: '#4E89FF' }}
              onClick={() => {
                const { id, ...rest } = record;
                roleController.current?.openDetail(record.id.toString(), false, rest);
              }}
            />
            <DeleteConfirm
              onCancel={() => console.log(`Cancel ${record.id}`)}
              onConfirm={() => deleteMutation.mutate(record.id)}
            >
              <DeleteOutlined style={{ color: 'red' }} />
            </DeleteConfirm>
          </div>
        );
      },
    },
  ];

  const createMutation = useMutation({
    mutationFn: RoleServices.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      notification.success({ message: 'Role created successfully!' });
    },
    onError: () => {
      notification.error({ message: `Role created failed!` });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: RoleServices.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      notification.success({ message: 'Role deleted successfully!' });
    },
    onError: () => {
      notification.error({
        message: `Role deleted failed!`,
      });
    },
  });

  const handleSubmitSuccess = () => {
    const values: IRole = form.getFieldsValue();
    createMutation.mutate({ name: values.name, description: values.description });
    form.resetFields();
    roleController.current?.close();
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <Button icon={<PlusOutlined />} type='primary' onClick={() => roleController.current?.openCreate()}>
          Add new role
        </Button>

        <SearchInput onSearch={value => console.log(value)} placeholder='Search by name' />
      </div>

      <Table rowKey='id' columns={columns} {...tableProps} bordered />
      <RoleController form={form} modalSize={500} ref={roleController} onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
};

export default RolePage;
