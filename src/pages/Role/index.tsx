import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRef } from 'react';
import DeleteConfirm from '../../components/delete-confirm';
import SearchInput from '../../components/search-input';
import SortByDropdown from '../../components/sort-by';
import { EntityConfigs, EntityKey } from '../../config/entities';
import { useAntdTable } from '../../hooks/useAntdTable';
import { useCRUDServices } from '../../hooks/useCrudService';
import type { IRole } from '../../interfaces/role';
import { RoleServices } from '../../services/role';
import RoleController, { type I_RoleController } from './controller';

const RolePage = () => {
  const [form] = Form.useForm();
  const entityConfig = EntityConfigs[EntityKey.Roles];
  const roleController = useRef<I_RoleController>(null);
  const { tableProps, onChangeSearchInput, loading, isFetching, onChangeSort } = useAntdTable<IRole>({
    queryKey: [EntityKey.Roles],
    apiFn: RoleServices.roleQuery,
  });

  const { createMutation, updateMutation, deleteMutation } = useCRUDServices<IRole, Omit<IRole, 'id'>, IRole>({
    queryKey: EntityKey.Roles,
    createFn: RoleServices.createRole,
    updateFn: RoleServices.updateRole,
    deleteFn: RoleServices.deleteRole,
    messages: {
      createSuccess: 'Tạo vai trò thành công!',
      updateSuccess: 'Cập nhật vai trò thành công!',
      deleteSuccess: 'Xoá vai trò thành công!',
      createError: 'Tạo vai trò thất bại!',
      updateError: 'Cập nhật vai trò thất bại!',
      deleteError: 'Xoá vai trò thất bại!',
    },
  });

  const columns: ColumnsType<IRole> = [
    ...entityConfig.columns,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_: string, record: IRole) => (
        <div className='flex gap-x-[10px] text-[20px]'>
          <EditOutlined
            style={{ color: '#4E89FF' }}
            onClick={() => {
              roleController.current?.openDetail(record.id.toString(), true, record);
            }}
          />
          <InfoCircleOutlined
            style={{ color: '#4E89FF' }}
            onClick={() => {
              roleController.current?.openDetail(record.id.toString(), false, record);
            }}
          />
          <DeleteConfirm
            onCancel={() => console.log(`Cancel ${record.id}`)}
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </DeleteConfirm>
        </div>
      ),
    },
  ];

  const handleSubmitSuccess = () => {
    const values: IRole = form.getFieldsValue();

    if (!values.id) {
      createMutation.mutate({ name: values.name, description: values.description });
    } else {
      updateMutation.mutate(values);
    }

    form.resetFields();
    roleController.current?.close();
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        {/* Row 1: Button + SearchInput */}
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 md:flex-row md:gap-4'>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            className='w-full sm:w-auto'
            onClick={() => roleController.current?.openCreate()}
          >
            Add new role
          </Button>

          <SearchInput
            filterKey={entityConfig.filterKeys}
            onSearch={onChangeSearchInput}
            placeholder={`Search by ${entityConfig.filterKeys.join(', ')}`}
            className='!w-[320px] sm:w-[200px]'
          />
        </div>

        {/* Row 2: SortByDropdown */}
        <SortByDropdown
          sortFields={['name', 'createdAt', 'updatedAt']}
          onChange={onChangeSort}
          className='w-full md:w-auto'
        />
      </div>

      <Table
        rowKey='id'
        columns={columns}
        {...tableProps}
        bordered
        loading={loading || isFetching}
        scroll={{ x: 1000 }}
      />
      <RoleController form={form} modalSize={500} ref={roleController} onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
};

export default RolePage;
