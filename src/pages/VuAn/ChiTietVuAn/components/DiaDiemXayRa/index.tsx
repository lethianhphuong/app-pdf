import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { columns } from './columns';
import DiaDiemXayRaForm from './components/DiaDiemXayRaForm';
import { DiaDiemXayRaParams, DiaDiemXayRaStore, DiaDiemXayRaStore_Schema } from './types';
import { Button, Drawer, Table } from '@/components/Atoms';

export default function DiaDiemXayRa() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DiaDiemXayRaStore[]>([]);

  function onAdd(values: DiaDiemXayRaParams) {
    console.log('onAdd', values);

    const oList = [...dataSource];
    const params = DiaDiemXayRaStore_Schema.parse(values);
    if (!params?.diaChi) {
      return;
    }
    oList.push(params);

    setDataSource(oList);
    onCloseDrawer();
  }

  function onCloseDrawer() {
    setOpenDrawer(false);
  }

  function onOpenDrawer() {
    setOpenDrawer(true);
  }

  return (
    <>
      <Row gutter={8} justify='space-between'>
        <Col className='flex items-center gap-2'></Col>
        <Col className='flex items-center gap-2'>
          <Button type='primary' icon={<PlusOutlined />} onClick={onOpenDrawer}></Button>
        </Col>
      </Row>

      <div className='mt-1'>
        <Table rowKey='id' columns={columns} pagination={false} dataSource={dataSource} />
      </div>

      <Drawer
        title={'Địa điểm xảy ra'}
        onClose={onCloseDrawer}
        // afterClose={handleAfterClose}
        open={openDrawer}
        width={200}
      >
        <DiaDiemXayRaForm onAdd={onAdd} />
      </Drawer>
    </>
  );
}
