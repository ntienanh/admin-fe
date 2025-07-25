import type { ModalProps } from 'antd';
import { Button, Form, Input, Modal } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { IStaff } from '../../../interfaces/staff';

interface I_Props extends ModalProps {
  onSubmitSuccess?: () => void;
  modalSize: number | string;
  form: any;
}

export interface I_StaffController {
  openDetail: (id: string, editable: boolean, data?: IStaff) => void;
  openCreate: () => void;
  close: () => void;
}

const StaffController = forwardRef<I_StaffController, I_Props>((props, ref) => {
  const { form, onSubmitSuccess, modalSize, ...restModalProps } = props;
  const [isOpen, setOpen] = useState(false);
  const [editable, setEditable] = useState<boolean>(false);
  const staffId = useRef<string>('');

  const openCreate = () => {
    setOpen(true);
    setEditable(true);
    form.resetFields();
  };

  const openDetail = (id: string, canEdit: boolean, data?: IStaff) => {
    console.log('data', data);

    setOpen(true);
    setEditable(canEdit);
    staffId.current = id;

    form.setFieldsValue({ ...data });
  };

  const close = () => {
    setOpen(false);
    form.resetFields();
    staffId.current = '';
  };

  useImperativeHandle(ref, () => ({ openDetail, openCreate, close }), []);

  return (
    <Modal
      centered
      {...restModalProps}
      open={isOpen}
      onCancel={close}
      width={modalSize}
      title={!staffId.current ? 'Create Staff' : editable ? 'Edit Staff' : 'View Staff'}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{ password: 'password@123' }}
        onFinish={() => {
          onSubmitSuccess?.();
          close();
        }}
      >
        <Form.Item name='id' noStyle>
          <Input type='hidden' />
        </Form.Item>

        <Form.Item label='Username' name='name' rules={[{ required: true, message: 'Please enter username' }]}>
          <Input placeholder='Enter username' />
        </Form.Item>

        <Form.Item
          hidden
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password placeholder='Enter password' />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            { type: 'email', message: 'Invalid email' },
            { required: true, message: 'Please enter email' },
          ]}
        >
          <Input placeholder='Enter email' />
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

export default StaffController;
