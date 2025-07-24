import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FIELD_LABELS, ORDER_LABELS, type SortField, type SortKey, type SortOrder } from './interface';

interface IProps {
  onChange?: (key: SortKey | null) => void;
  sortFields?: SortField[];
  className?: string;
}

export interface SortByDropdownRef {
  getSelected: () => SortKey | null;
  setSelected: (key: SortKey | null) => void;
}

const defaultSortFields: SortField[] = ['name', 'createdAt', 'updatedAt'];

const SortByDropdown = forwardRef<SortByDropdownRef, IProps>(
  ({ onChange, sortFields = defaultSortFields, className }, ref) => {
    const [field, setField] = useState<SortField | null>(null);
    const [order, setOrder] = useState<SortOrder | null>(null);

    const currentKey: SortKey | null = field && order ? `${field}_${order}` : null;

    useImperativeHandle(ref, () => ({
      getSelected: () => currentKey,
      setSelected: (key: SortKey | null) => {
        if (!key) {
          setField(null);
          setOrder(null);
          return;
        }
        const [f, o] = key.split('_') as [SortField, SortOrder];
        setField(f);
        setOrder(o);
      },
    }));

    const handleFieldChange = (key: string) => {
      const newField = key as SortField;
      setField(newField);
      if (order) {
        onChange?.(`${newField}_${order}`);
      }
    };

    const handleOrderChange = (key: string) => {
      const newOrder = key as SortOrder;
      setOrder(newOrder);
      if (field) {
        onChange?.(`${field}_${newOrder}`);
      }
    };

    return (
      <Space className={className}>
        <span>Sort by:</span>
        <Dropdown
          trigger={['click']}
          menu={{
            selectedKeys: field ? [field] : [],
            onClick: ({ key }) => handleFieldChange(key),
            items: sortFields.map(f => ({
              key: f,
              label: FIELD_LABELS[f],
            })),
          }}
        >
          <Button>
            {field ? FIELD_LABELS[field] : 'Select Field'} <DownOutlined />
          </Button>
        </Dropdown>

        <Dropdown
          trigger={['click']}
          menu={{
            selectedKeys: order ? [order] : [],
            onClick: ({ key }) => handleOrderChange(key),
            items: (['asc', 'desc'] as SortOrder[]).map(o => ({
              key: o,
              label: ORDER_LABELS[o],
            })),
          }}
        >
          <Button>
            {order ? ORDER_LABELS[order] : 'Select Order'} <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    );
  },
);

export default SortByDropdown;
