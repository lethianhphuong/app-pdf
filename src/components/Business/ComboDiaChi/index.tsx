import { useEffect } from 'react';
import { Col } from 'antd';
import { Select, Textarea } from '@/components/Atoms';
import { trangThaiVuAnOptions } from '@/constants';

interface Props {
  isDrawer?: boolean;
}

export default function ComboDiaChi({ isDrawer }: Props) {
  //#region STATE & REFS

  //#endregion

  //#region CONSTANTS & DERIVED VALUES

  //#endregion

  //#region HOOKS
  useEffect(() => {
    console.log('Mounted or data changed:', isDrawer);
  }, []);
  //#endregion

  //#region HANDLERS

  //#endregion

  //#region UTILITY FUNCTIONS

  //#endregion

  return (
    <>
      <Col span={24}>
        <Textarea label='Địa chỉ chi tiết' name='soNha' rows={3} />
      </Col>
      <Col span={24}>
        <Select label='Xã' name='maXa' options={Object.values(trangThaiVuAnOptions)} />
      </Col>
      {/* <Col span={24}>
        <Select label='Huyện' name='maHuyen' options={Object.values(trangThaiVuAnOptions)} />
      </Col> */}
      <Col span={24}>
        <Select label='Tỉnh' name='maTinh' options={Object.values(trangThaiVuAnOptions)} />
      </Col>
    </>
  );
}
