import { Col, Row } from 'antd';
import { FormDiaChiWithQGProps } from '../types';
import InputChiTietDiaDiem from './InputChiTietDiaDiem';
import InputQuanHuyen from './InputQuanHuyen';
import InputQuocGia from './InputQuocGia';
import InputThanhPho from './InputThanhPho';
import InputXaPhuong from './InputXaPhuong';

const FormDiaChiWithQG: React.FC<FormDiaChiWithQGProps> = (props) => {
  const { formConfig, isShowChiTiet = false, isShowXaHuyenTinh = true, isVN } = props;
  const spanConfig =
    isVN && isShowXaHuyenTinh
      ? isShowChiTiet
        ? { quocGia: 5, xaPhuong: 4, quanHuyen: 4, tinhThanhPho: 4, chiTietDiaDiem: 7 }
        : { quocGia: 6, xaPhuong: 6, quanHuyen: 6, tinhThanhPho: 6, chiTietDiaDiem: 0 }
      : { quocGia: 6, xaPhuong: 0, quanHuyen: 0, tinhThanhPho: 0, chiTietDiaDiem: 18 };

  return (
    <Row gutter={8} className='flex-auto'>
      <Col span={spanConfig.quocGia}>
        <InputQuocGia formConfig={formConfig} />
      </Col>
      {isVN ? (
        isShowXaHuyenTinh ? (
          <>
            <Col span={spanConfig.tinhThanhPho}>
              <InputThanhPho formConfig={formConfig} />
            </Col>
            <Col span={spanConfig.quanHuyen}>
              <InputQuanHuyen formConfig={formConfig} />
            </Col>
            <Col span={spanConfig.xaPhuong}>
              <InputXaPhuong formConfig={formConfig} />
            </Col>

            {isShowChiTiet && (
              <Col span={spanConfig.chiTietDiaDiem}>
                <InputChiTietDiaDiem formConfig={formConfig} />
              </Col>
            )}
          </>
        ) : (
          isShowChiTiet && <Col span={spanConfig.chiTietDiaDiem}>{<InputChiTietDiaDiem formConfig={formConfig} />}</Col>
        )
      ) : (
        <Col span={spanConfig.chiTietDiaDiem}>
          <InputChiTietDiaDiem formConfig={formConfig} />
        </Col>
      )}
    </Row>
  );
};

export default FormDiaChiWithQG;
