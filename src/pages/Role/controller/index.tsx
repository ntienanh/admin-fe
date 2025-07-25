import type { ModalProps } from 'antd';
import { Button, Form, Input, Modal } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { IRole } from '../../../interfaces/role';

interface I_Props extends ModalProps {
  onSubmitSuccess?: () => void;
  modalSize: number | string;
  form: any;
}

export interface I_RoleController {
  openDetail: (id: string, editable: boolean, data?: IRole) => void;
  openCreate: () => void;
  close: () => void;
}

const RoleController = forwardRef<I_RoleController, I_Props>((props, ref) => {
  const { form, onSubmitSuccess, modalSize, ...restModalProps } = props;
  const [isOpen, setOpen] = useState(false);
  const [editable, setEditable] = useState<boolean>(false);
  const roleId = useRef<string>('');

  const openCreate = () => {
    setOpen(true);
    setEditable(true);
    form.resetFields();
  };

  const openDetail = (id: string, canEdit: boolean, data?: IRole) => {
    console.log('data', data);

    setOpen(true);
    setEditable(canEdit);
    roleId.current = id;

    form.setFieldsValue({ ...data });
  };

  const close = () => {
    setOpen(false);
    form.resetFields();
    roleId.current = '';
  };

  useImperativeHandle(ref, () => ({ openDetail, openCreate, close }), []);

  return (
    <Modal
      centered
      {...restModalProps}
      open={isOpen}
      onCancel={close}
      width={modalSize}
      title={!roleId.current ? 'Create Role' : editable ? 'Edit Role' : 'View Role'}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={() => {
          onSubmitSuccess?.();
          close();
        }}
      >
        <Form.Item name='id' noStyle>
          <Input type='hidden' />
        </Form.Item>

        <Form.Item label='Role Name' name='name' rules={[{ required: true, message: 'Please input the role name!' }]}>
          <Input disabled={!editable} placeholder='Enter role name' />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input.TextArea disabled={!editable} placeholder='Enter description' />
        </Form.Item>

        {editable && (
          <Form.Item>
            <div className='flex justify-end gap-2'>
              <Button onClick={close}>Cancel</Button>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </div>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
});

export default RoleController;
