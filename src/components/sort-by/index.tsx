import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

type SortKey = 'name_asc' | 'name_desc' | 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc';

const SORT_MAP: Record<SortKey, string> = {
  name_asc: 'A - Z',
  name_desc: 'Z - A',
  date_asc: 'Oldest',
  date_desc: 'Newest',
  price_asc: 'Price Low to High',
  price_desc: 'Price High to Low',
};

interface IProps {
  listItems?: SortKey[];
  onChange?: (key: SortKey) => void;
}

export interface SortByDropdownRef {
  getSelected: () => SortKey | null;
  setSelected: (key: SortKey) => void;
}

const defaultListItems: SortKey[] = ['name_asc', 'name_desc', 'date_desc', 'date_asc', 'price_asc', 'price_desc'];

const SortByDropdown = forwardRef<SortByDropdownRef, IProps>(({ listItems = defaultListItems, onChange }, ref) => {
  const [selectedKey, setSelectedKey] = useState<SortKey | null>('date_desc');

  useImperativeHandle(ref, () => ({
    getSelected: () => selectedKey,
    setSelected: (key: SortKey) => setSelectedKey(key),
  }));

  const selectedLabel = selectedKey ? SORT_MAP[selectedKey] : 'Select';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span>Sort by:</span>
      <Dropdown
        menu={{
          selectedKeys: selectedKey ? [selectedKey] : [],
          onClick: ({ key }) => {
            const sortKey = key as SortKey;
            setSelectedKey(sortKey);
            onChange?.(sortKey);
          },
          items: listItems.map(key => ({
            key,
            label: SORT_MAP[key],
          })),
        }}
        trigger={['click']}
      >
        <Button>
          {selectedLabel} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
});

export default SortByDropdown;
