import React, { useState } from 'react';
import ActionTableDemo from './components/ActionTableDemo';
import CollapseDemo from './components/CollapseDemo';
import FormDemo from './components/FormDemo';
import SearchFieldsDemo from './components/SearchFieldsDemo';
import { Button, Collapse, Drawer } from '@/components/Atoms';
import Container from '@/components/Atoms/Container';
import Tabs from '@/components/Atoms/Tabs';
import { useElementSize } from '@/hooks/common/useResizeObserver';

const Test: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { ref, height } = useElementSize();

  const items2 = [
    {
      key: '1',
      label: 'Ke hoach dieu tra co ban B20',
      children: 'Ke hoach dieu tra co ban B20'
    },
    {
      key: '2',
      label: 'Quyet dinh lam ho so B1',
      children: 'Quyet dinh lam ho so B1'
    }
  ];

  const items = [
    // {
    //   key: '1',
    //   label: '[BASE] Table',
    //   children: (
    //     <>
    //       <Table
    //         loading={state.table.loading}
    //         columns={columns}
    //         dataSource={state.table.dataSource}
    //         pagination={state.table.pagination}
    //         onChange={handleTableChange}
    //       />
    //     </>
    //   )
    // },
    {
      key: '2',
      label: '[BASE] Tabs',
      children: <Tabs defaultActiveKey='1' items={items2} />
    },
    {
      key: '3',
      label: '[BASE] Collapse',
      children: (
        <>
          <Collapse
            items={[
              {
                key: '1',
                label: 'This is panel header 1',
                children: <p>This is panel content 1</p>
              },
              {
                key: '2',
                label: 'This is panel header 2',
                children: <p>This is panel content 2</p>
              }
            ]}
          />
        </>
      )
    },
    {
      key: '4',
      label: '[BASE] Button and Drawer',
      children: (
        <>
          <Button
            type='primary'
            onClick={() => {
              setOpen(true);
            }}
          >
            Open Drawer
          </Button>
          <Drawer title='Tao lap ho so dieu tra co ban' onClose={() => setOpen(false)} open={open}></Drawer>
        </>
      )
    },
    {
      key: '5',
      label: '[BASE] Input',
      children: <FormDemo />
    },
    {
      key: '7',
      label: '[BASE] Danh sách tài liệu'
    },
    {
      key: '8',
      label: '[BASE] TableAction',
      children: <ActionTableDemo height={height} />
    },
    {
      key: '11',
      label: '[BASE] Table Collapse Local',
      children: <CollapseDemo />
    },
    {
      key: '12',
      label: '[BASE] Search Fields',
      children: <SearchFieldsDemo />
    }
  ];

  return (
    <>
      <Container>
        <div
          ref={ref}
          style={{
            height: '100%',
            padding: '8px'
          }}
        >
          <Tabs items={items} tabPosition='left' className='h-full' destroyInactiveTabPane />
        </div>
      </Container>
    </>
  );
};

export default Test;
