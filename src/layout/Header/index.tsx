import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import Breadcumbs from './components/Breadcumbs';
import HeaderMenu from './components/HeaderMenu';
import './styles.less';
import { HeaderProps, HeaderRef } from './types';
import { Button } from '@/components/Atoms';

const { Header } = Layout;

const Headers = forwardRef(function Headers({ onChange }: HeaderProps, ref: ForwardedRef<HeaderRef>) {
  const [collapsed, setCollapsed] = useState(false);

  useImperativeHandle(ref, () => ({
    updateCollapse(newState) {
      setCollapsed(newState);
    }
  }));

  function handleChange() {
    const newState = !collapsed;
    onChange(newState);
    setCollapsed(newState);
  }

  return (
    <Header className='gt-layout-header'>
      <div className='heading'>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleChange}
          style={{
            fontSize: '16px',
            width: 'var(--gt-header-height)',
            height: 'var(--gt-header-height)'
          }}
        />
        <Breadcumbs />
        {/* <Typography.Title level={5} style={{ margin: 0 }}>
          PHẦN MỀM 
        </Typography.Title> */}
      </div>

      <HeaderMenu />
    </Header>
  );
});

export default Headers;
