import React, { useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
// Import renderToString
import 'antd/dist/antd.css';

const { Search } = Input;

interface DataNode {
  title: string; // Change type of title to string
  key: string;
  children?: DataNode[];
}

// Sample data for the tree
const treeData: DataNode[] = [
  {
    title: 'Node 1',
    key: '0-0',
    children: [
      { title: 'Child Node 1', key: '0-0-0' },
      { title: 'Child Node 2', key: '0-0-1' }
    ]
  },
  {
    title: 'Node 2',
    key: '0-1',
    children: [
      { title: 'Child Node 3', key: '0-1-0' },
      { title: 'Child Node 4', key: '0-1-1' }
    ]
  }
];
const getParentKey = (key: string, tree: DataNode[]): string | undefined => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else {
        const foundKey = getParentKey(key, node.children);
        if (foundKey) {
          parentKey = foundKey;
        }
      }
    }
  }
  return parentKey;
};
const SearchableTree: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onSelect = (selectedKeys: React.Key[]) => {
    setSelectedKeys(selectedKeys as string[]);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const expandedKeysValue = treeData
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i) as React.Key[];
    setSearchValue(value);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(true);
  };

  const data = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map((item) => {
        const title = item.title;
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }
        return {
          title,
          key: item.key
        };
      });

    return loop(treeData);
  }, [searchValue]);

  return (
    <div>
      <Search style={{ marginBottom: 8 }} placeholder='Search' onChange={onChange} />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={data}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
      />
    </div>
  );
};

export default SearchableTree;
