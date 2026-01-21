import { Col, Row } from 'antd';
import { FormDiaChiWithoutQGProps } from '../types';
import InputChiTietDiaDiem from './InputChiTietDiaDiem';
import InputQuanHuyen from './InputQuanHuyen';
import InputThanhPho from './InputThanhPho';
import InputXaPhuong from './InputXaPhuong';

const FormDiaChiWithoutQG: React.FC<FormDiaChiWithoutQGProps> = (props) => {
  const { formConfig, isShowChiTiet } = props;
  const spanConfig = isShowChiTiet ? 6 : 8;

  return (
    <Row gutter={8} className='flex-auto'>
      <Col span={spanConfig}>
        <InputThanhPho formConfig={formConfig} />
      </Col>
      <Col span={spanConfig}>
        <InputQuanHuyen formConfig={formConfig} />
      </Col>
      <Col span={spanConfig}>
        <InputXaPhuong formConfig={formConfig} />
      </Col>

      {isShowChiTiet && (
        <Col span={spanConfig}>
          <InputChiTietDiaDiem formConfig={formConfig} />
        </Col>
      )}
    </Row>
  );
};

export default FormDiaChiWithoutQG;
