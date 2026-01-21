import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { AntTreeNode } from 'antd/lib/tree';

// import { getData } from '@/service';

const treeData = [
  {
    title: 'Node 1',
    value: '1',
    children: [
      { title: 'Node 1-1', value: '1-1' },
      { title: 'Node 1-2', value: '1-2' }
    ]
  },
  { title: 'Node 2', value: '2' }
];
interface Props {
  multiple: boolean;
  options: AntTreeNode[];
  placeholder: string;
  apiUrl?: string;
}
const Treeselect: React.FC<Props> = (props) => {
  const { multiple, options, placeholder } = props;
  const [value, setValue] = useState<string | undefined>();
  const [newOptions, setNewOptions] = useState<AntTreeNode[]>(options);

  const handleSearch = async (searchValue: string) => {
    // search trong data có sẵn
    const filteredOptions: any[] = [];
    treeData.forEach((node) => {
      if (node.title.toLowerCase().includes(searchValue.toLowerCase())) {
        filteredOptions.push(node);
      } else {
        const filteredChildren = node.children?.filter((child) =>
          child.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (filteredChildren && filteredChildren.length > 0) {
          filteredOptions.push({ ...node, children: filteredChildren });
        }
      }
    });

    // search theo API nếu thư mục cây data nhiều.
    // const response = await getData(`${apiUrl}?search=${searchValue}`);

    setNewOptions(filteredOptions);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <TreeSelect
      style={{ width: '100%' }}
      multiple={multiple}
      value={value}
      onChange={handleChange}
      treeData={newOptions}
      showSearch
      onSearch={handleSearch}
      treeNodeFilterProp='title'
      placeholder={placeholder}
    />
  );
};

export default Treeselect;
