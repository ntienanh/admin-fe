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
import type { CreateStaffDto, IStaff, UpdateStaffDto } from '../../interfaces/staff';
import { StaffServices } from '../../services/staff';
import StaffController, { type I_StaffController } from './controller';

const StaffPage = () => {
  const [form] = Form.useForm();
  const entityConfig = EntityConfigs[EntityKey.Staff];
  const staffController = useRef<I_StaffController>(null);
  const { tableProps, onChangeSearchInput, loading, isFetching, onChangeSort } = useAntdTable<IStaff>({
    queryKey: [EntityKey.Staff],
    apiFn: StaffServices.staffQuery,
  });

  const { createMutation, updateMutation, deleteMutation } = useCRUDServices<IStaff, CreateStaffDto, UpdateStaffDto>({
    queryKey: EntityKey.Staff,
    createFn: StaffServices.createStaff,
    updateFn: StaffServices.updateStaff,
    deleteFn: StaffServices.deleteStaff,
    messages: {
      createSuccess: 'Create staff successfully',
      updateSuccess: 'Update staff successfully',
      deleteSuccess: 'Delete staff successfully',
      createError: 'Create staff failed',
      updateError: 'Update staff failed',
      deleteError: 'Delete staff failed',
    },
  });

  const columns: ColumnsType<IStaff> = [
    ...entityConfig.columns,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_: string, record: IStaff) => (
        <div className='flex gap-x-[10px] text-[20px]'>
          <EditOutlined
            style={{ color: '#4E89FF' }}
            onClick={() => {
              staffController.current?.openDetail(record.id.toString(), true, record);
            }}
          />
          <InfoCircleOutlined
            style={{ color: '#4E89FF' }}
            onClick={() => {
              staffController.current?.openDetail(record.id.toString(), false, record);
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
    const values: IStaff = form.getFieldsValue();
    console.log('Submitting values:', values);

    if (!values.id) {
      createMutation.mutate({ email: values.email, name: values.name, password: values.password });
    } else {
      updateMutation.mutate({ id: values.id, email: values.email, name: values.name });
    }

    form.resetFields();
    staffController.current?.close();
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
            onClick={() => staffController.current?.openCreate()}
          >
            Add new staff
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

      <StaffController form={form} modalSize={500} ref={staffController} onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
};

export default StaffPage;
