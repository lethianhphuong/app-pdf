import { useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import { FormDiaChiWithQGProps } from '../types';
import InputChiTietDiaDiem from './InputChiTietDiaDiem';
import SelectQuanHuyen from './SelectQuanHuyen';
import SelectQuocGia from './SelectQuocGia';
import SelectTinhThanhPho from './SelectThanhPho';
import SelectXaPhuong from './SelectXaPhuong';
import { DEFAULT_QUOC_GIA } from '@/constants/business/const';
import { VN_CODE } from '@/constants/business/enums';

const FormDiaChiWithQG: React.FC<FormDiaChiWithQGProps> = (props) => {
  const {
    formConfig,
    isShowChiTiet = false,
    isShowXaHuyenTinh = true,
    disabled = false,
    fetchWhenDropdownOpen = false
  } = props;
  const form = Form.useFormInstance();
  const quocGia = Form.useWatch(formConfig.quocGia?.name, form);
  const isVietnam = quocGia?.value === VN_CODE;
  const spanConfig = useMemo(() => {
    if (!isVietnam || !isShowXaHuyenTinh)
      return {
        quocGia: { xl: 5, sm: 4 },
        xaPhuong: { span: 0 },
        quanHuyen: { span: 0 },
        tinhThanhPho: { span: 0 },
        chiTietDiaDiem: { xl: 19, sm: 20 }
      };

    if (isShowChiTiet)
      return {
        quocGia: { xl: 4, sm: 4 },
        xaPhuong: { xl: 4, sm: 5 },
        quanHuyen: { xl: 7, sm: 7 },
        tinhThanhPho: { xl: 5, sm: 5 },
        chiTietDiaDiem: { xl: 4, sm: 3 }
      };

    return {
      quocGia: { xl: 5, sm: 4 },
      xaPhuong: { xl: 7, sm: 7 },
      quanHuyen: { xl: 8, sm: 9 },
      tinhThanhPho: { xl: 4, sm: 4 },
      chiTietDiaDiem: { span: 0 }
    };
  }, [isVietnam, isShowXaHuyenTinh, isShowChiTiet]);

  return (
    <Row gutter={8} className='flex-auto'>
      <Col {...spanConfig.quocGia}>
        <SelectQuocGia
          disabled={disabled}
          form={form}
          formConfig={formConfig}
          restField={{ initialValue: DEFAULT_QUOC_GIA }}
        />
      </Col>
      {isVietnam ? (
        isShowXaHuyenTinh ? (
          <>
            <Col {...spanConfig.tinhThanhPho}>
              <SelectTinhThanhPho disabled={disabled} formConfig={formConfig} form={form} />
            </Col>
            <Col {...spanConfig.quanHuyen}>
              <SelectQuanHuyen
                disabled={disabled}
                formConfig={formConfig}
                form={form}
                fetchWhenDropdownOpen={fetchWhenDropdownOpen}
              />
            </Col>
            <Col {...spanConfig.xaPhuong}>
              <SelectXaPhuong
                disabled={disabled}
                formConfig={formConfig}
                form={form}
                fetchWhenDropdownOpen={fetchWhenDropdownOpen}
              />
            </Col>
            {isShowChiTiet && (
              <Col {...spanConfig.chiTietDiaDiem}>
                <InputChiTietDiaDiem disabled={disabled} formConfig={formConfig} />
              </Col>
            )}
          </>
        ) : (
          isShowChiTiet && (
            <Col {...spanConfig.chiTietDiaDiem}>
              {<InputChiTietDiaDiem formConfig={formConfig} disabled={disabled} />}
            </Col>
          )
        )
      ) : (
        <Col {...spanConfig.chiTietDiaDiem}>
          <InputChiTietDiaDiem formConfig={formConfig} disabled={disabled} />
        </Col>
      )}
    </Row>
  );
};

export default FormDiaChiWithQG;
