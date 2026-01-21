import { Col, Form, Row } from 'antd';
import { FormDiaChiWithoutQGProps } from '../types';
import InputChiTietDiaDiem from './InputChiTietDiaDiem';
import SelectQuanHuyen from './SelectQuanHuyen';
import SelectTinhThanhPho from './SelectThanhPho';
import SelectXaPhuong from './SelectXaPhuong';

const FormDiaChiWithoutQG: React.FC<FormDiaChiWithoutQGProps> = (props) => {
  const { formConfig, isShowChiTiet, fetchWhenDropdownOpen = false, disabled = false } = props;
  const form = Form.useFormInstance();
  const spanConfig = isShowChiTiet ? 6 : 8;

  return (
    <Row gutter={8} className='flex-auto'>
      <Col span={spanConfig}>
        <SelectTinhThanhPho form={form} formConfig={formConfig} disabled={disabled} />
      </Col>
      <Col span={spanConfig}>
        <SelectQuanHuyen
          form={form}
          formConfig={formConfig}
          disabled={disabled}
          fetchWhenDropdownOpen={fetchWhenDropdownOpen}
        />
      </Col>
      <Col span={spanConfig}>
        <SelectXaPhuong
          form={form}
          formConfig={formConfig}
          disabled={disabled}
          fetchWhenDropdownOpen={fetchWhenDropdownOpen}
        />
      </Col>
      {isShowChiTiet && (
        <Col span={spanConfig}>
          <InputChiTietDiaDiem formConfig={formConfig} disabled={disabled} />
        </Col>
      )}
    </Row>
  );
};

export default FormDiaChiWithoutQG;
